import { AboutPage } from "./pages/AboutPage"
import Admin from "./pages/Admin"
import { MainPage } from "./pages/MainPage"
import { MyQuizzesPage } from "./pages/MyQuizzesPage"
import { QuestionsPage } from "./pages/QuestionsPage"
import { QuizzesPage } from "./pages/QuizzesPage"
import {AuthPage} from "./pages/AuthPage"
import {RegPage} from './pages/RegPage'
import { ADMIN_ROUTE, MYQUIZZES_ROUTE, QUIZZES_ROUTE, QUESTIONS_ROUTE, MAIN_ROUTE,ABOUT_ROUTE,LOGIN_ROUTE,REGISTRATION_ROUTE } from "./utils/consts"
import QuizEditPage from "./pages/QuizEditPage"

export const authRoutes=[
    {
        path:ADMIN_ROUTE,  
        Component: <Admin/>
    },
    {
        path:MYQUIZZES_ROUTE,  
        Component: <MyQuizzesPage/>
    },
    {
        path:MYQUIZZES_ROUTE+'/:id',
        Component: <QuizEditPage/>
    }
]

export const publicRoutes=[
    {
        path: QUIZZES_ROUTE,  
        Component: <QuizzesPage/>
    },
    {
        path: QUESTIONS_ROUTE+'/:id',  
        Component: <QuestionsPage/>
    },
    {
        path: MAIN_ROUTE,  
        Component: <MainPage/>
    },
    {
        path: ABOUT_ROUTE,  
        Component: <AboutPage/>
    },
    {
        path: LOGIN_ROUTE,  
        Component: <AuthPage/>
    },
    {
        path: REGISTRATION_ROUTE,  
        Component: <RegPage/> 
    }
]