import multer from 'multer' // пакет для организации загрузки файлов на сервер
import moment from 'moment' // для работы с форматироваием даты и времени (в данном случае используется для именования загружаемых файлов)

const resourceStorage = multer.diskStorage({
  destination(req, file, cb){
    cb(null,'uploads/quizImages')
  },

  filename(req,file,cb){
    const date=moment().format('DDMMYYYY-HHmmss_SSS')
    cb(null,`${date}-${file.originalname}`)
  }
}) 

const fileResourcefilter = function(req, file, cb) {
  if (file.mimetype==='image/png'|| file.mimetype==='image/jpeg'||file.mimetype==='image/gif'){
      cb(null,true)
  }else{
      cb(null,false)
  }
}
const limits={
  filesize:1024*1024*5
}

export const uploadRes=multer({
  storage: resourceStorage,
  fileFilter:fileResourcefilter,
  limits:limits
})