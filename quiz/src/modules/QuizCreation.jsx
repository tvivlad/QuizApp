import React,{useState} from 'react'
import classes from '../styles/quizCreation.module.css'
import CustomInput from '../components/UI/CustomInput/CustomInput'
import CustomTextArea from '../components/UI/CustomTextArea/CustomTextArea'
import Modal from '../components/UI/Modal/Modal'
import CustomButton from '../components/UI/CustomButton/CustomButton'
import axios from 'axios'

export default function QuizCreation() {
  const [quizName, setQuizName] = useState('')
  const [quizDescription, setQuizDescription] = useState('')
  const [visibleQuiz, setVisibleQuiz]= useState(false)
  const [quizType, setQuizType] = useState(1)
  const [modal, setModal] = useState(false)
  
  let imageFile
  function getUploadingFile(event){
    imageFile= event.target.files[0]
  }
  
  async function createNewQuiz(){   
    const body={               
        quizName:quizName,
        quizDescription:quizDescription,
        visibleQuiz:visibleQuiz,       
        quizType:quizType,
        userId:'1'        
    }

    const formData= new FormData()
    formData.append('imgFile', imageFile)
    formData.append('quizName', quizName)
    formData.append('quizDescription', quizDescription)
    formData.append('visibleQuiz', visibleQuiz)
    formData.append('quizType', quizType)
    formData.append('userId', 1)


/*     axios({
        method:'post', 
        url: 'http://localhost:5000/addNewQuiz',
        data: body,
        headers: { 'Content-Type': 'application/json' }    
    })  */
    // сокращенная запись POST Запроса
      axios.post('http://localhost:5000/api/quiz',formData)

/*     const res = await fetch('http://localhost:5000/addNewQuiz', 
                {   
                    method:'POST', 
                   // headers: {'Content-Type': 'application/json'},   
                    body:formData//JSON.stringify(body)
                }) */
   // const data= await res.json()

    
setQuizName('')
    setQuizDescription('')
    setVisibleQuiz(false) 
    setQuizType(1)
    setModal(false)
  }

  return (
    <>
        <CustomButton value={'Создать новый тест'} onClick={()=>setModal(true)}/>
        <Modal visible={modal} setVisible={setModal} >
            <div class={classes.quizCreationPanel}>
                <h1 style={{textAlign:'center'}}>создания нового теста / опроса </h1>
                <CustomInput 
                    placeholder='Название теста...'
                    style={{width:'90%', height:'24px'}}
                    value={quizName}
                    onChange={event=>setQuizName(event.target.value)}
                />
                <CustomTextArea 
                    cols="30" 
                    rows="5" 
                    placeholder='Описание...'
                    value={quizDescription}
                    onChange={event=>setQuizDescription(event.target.value)}
                />
                {/*  <label for="quizVisibility"> Скрыть/Показать в общем перечне</label> */}
                <div><input type="checkbox" checked={visibleQuiz} onChange={()=>setVisibleQuiz(!visibleQuiz)} style={{margin:'20px'}}/> Показать в общем перечне  </div>
                <strong>Выберите файл с изображением </strong><input type="file" value={imageFile} onChange={getUploadingFile} style={{margin:'20px'}} />
                <div><input type="radio" name="radio" value={quizType} onChange={()=>setQuizType(1)}/> Тест</div>
                <div><input type="radio" name="radio" value={quizType} onChange={()=>setQuizType(0)}/> Опрос</div>
                <button style={{margin:'20px auto', fontSize:'20px'}}  onClick={()=>createNewQuiz()}> Создать </button>
            </div>
        </Modal>
    </>

  )     
}
