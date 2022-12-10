import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { App } from './components/App'
import { Home } from './pages/Home'
import { TaskView } from './pages/TaskView'
import { AddTasks } from './pages/AddTasks'
import { Calendar } from './pages/Calendar'
import { Profile } from './pages/Profile'
import { Settings } from './pages/Settings'
import './index.css'
import 'tw-elements'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route path='/' element={<App />}>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/:category' element={<Home />}></Route>
                        <Route path='task/:id' element={<TaskView />} />
                        <Route path='add-task' element={<AddTasks />}></Route>
                        <Route path='calendar' element={<Calendar />} ></Route>
                        <Route path='profile' element={<Profile />}></Route>
                        <Route path='settings' element={<Settings />}></Route>
                    </Route>
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>
)
