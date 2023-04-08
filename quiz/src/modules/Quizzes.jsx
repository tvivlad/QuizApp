import React from 'react'
import axios from 'axios'
import {useState, useEffect, useMemo} from 'react'
import {QuizList} from '../components/QuizList';
import Toolbar from '../components/Toolbar';
import { getAllQuizzes } from '../http/quizAPI';


export default function Quizzes(props) {
  const[quizzes, setQuizzes]=useState([])
  const[toolBar, setToolBar] = useState({sort:'', query:'', filter:''})
  const[quizLoading, setQuizLoading]=useState(false)
  const[developMode, setDevelopMode] = useState(false) 
  
  async function getQuizzes(){
    setQuizLoading(true)
    let userIdParam=''
    if (props.forDeveloper) userIdParam= '/?userId='+props.forDeveloper
    //console.log(' Запрос тестов с параметром : ', `http://localhost:5000/getQuizzes${userIdParam}`)
    //console.log(`http://localhost:5000/api/quiz${userIdParam}`)
    //const res= await axios.get(`http://localhost:5000/api/quiz${userIdParam}`)
    const res=await getAllQuizzes(userIdParam)     
    console.log('Результат запроса : ', res.data)
    setQuizzes(res.data)
    setQuizLoading(false)
  }

  useEffect(()=>{    
    getQuizzes()
    if (props.forDeveloper) setDevelopMode(true)
    console.log(' id пользователя :', props.forDeveloper)
  }, [])
  // сортировка массива
  const sortedQuizzes = useMemo(()=>{
    console.log('Функция getSort отработала ...')
    if (toolBar.sort) {
      if (toolBar.sort=='name') {
          return [...quizzes].sort((a,b)=>{
          return a[toolBar.sort].localeCompare(b[toolBar.sort])
          })
      }else {
          return [...quizzes].sort((a,b)=>{     
            let DateA=new Date(a[toolBar.sort]).valueOf()
            let DateB=new Date(b[toolBar.sort]).valueOf()
            console.log(' Даты : ',DateA , '  ', DateB)
            if (DateA>DateB) return 1
            if (DateA==DateB) return 0
            if (DateA<DateB) return -1
          })
      }
    }
    return quizzes
  }, [quizzes, toolBar.sort, toolBar.filter])// getSortQuizzes()
  // поиск в отсортированном массиве
  const sortedAndSearchedQuizzes= useMemo(()=>{
      console.log('Запрос в алгоритме поиска : ', toolBar.query )
      return sortedQuizzes.filter(quiz=>quiz.name.toLowerCase().includes(toolBar.query))
  }, [toolBar.query, sortedQuizzes])
   // фильтрация в отсортированном и ограниченным поиском массиве
  const sortedAndSearchedAndFilteredQuizzes=useMemo(()=>{
    console.log(' Фильтрация по : ', toolBar.filter)
    if (toolBar.filter){
      return sortedAndSearchedQuizzes.filter(quiz=> quiz.isTest==toolBar.filter)
    }
    return sortedAndSearchedQuizzes 
  },[sortedAndSearchedQuizzes, toolBar.filter])

  return (    
   <>      
      {!developMode&&<Toolbar toolBar={toolBar} setToolBar={setToolBar} />}
      {quizLoading
        ? <h1 style={{paddingTop:140, textAlign: 'center'}}>Quizzes loading...</h1>
        :<QuizList quizzes={sortedAndSearchedAndFilteredQuizzes} mode={developMode}/>    
      }
   </>
  );   
}
