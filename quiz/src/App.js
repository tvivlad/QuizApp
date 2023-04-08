import react,{useState,useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import {BrowserRouter} from 'react-router-dom'
import {QuizzesPage} from './pages/QuizzesPage.jsx'
import {AboutPage} from './pages/AboutPage.jsx'
import {QuestionsPage} from './pages/QuestionsPage.jsx'
import {MainPage} from './pages/MainPage.jsx'
import {MyQuizzesPage} from './pages/MyQuizzesPage.jsx'
import {Navigation} from './components/Navigation'
import AppRouter from './components/AppRouter.js'
import Context from './context.js'
import {check} from './http/userAPI.js'
function App() {
  const [user, setUser] = useState({email:'', isAuth:false, id:'', name:'',surname:''})
  const [loading, setLoading]= useState('true')
  
  useEffect(()=>{
      console.log(' Пользователь в App :', user)
      // функция check проверяет авторизован ли пользователь. Если token не валидный, то пользователь разлогинивается
      check().then(data=>{
          console.log('Данные пришедшие при проверке (функция check): ',data.id)
          setUser({email:data.email, isAuth:true, id:data.id, name:'Петр', surname:'Петров'})
          console.log ("Объект user при загрузке страницы", user)
      }).finally(()=>{setLoading(false)}) 
  },[])

  if (loading) {
    return <h1> Loading...</h1>
  }

  return(
    <>
    <Context.Provider  value={{user, setUser}}  >
      <BrowserRouter>
        <Navigation/>
        <AppRouter/>
  {/*     <Routes>
          <Route path="/main" element={<MainPage/>}/>
          <Route path="/quizzes" element={<QuizzesPage/>}/>
          <Route path="quizzes/:id" element={<QuestionsPage/>}/>
          <Route path="myquizzes/" element={<MyQuizzesPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
        </Routes> */}
      </BrowserRouter>
    </Context.Provider>


    </>
  )
}

export default App;
