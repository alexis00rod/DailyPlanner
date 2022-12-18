import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { Login,Signup,Home,TaskView,AddTasks,Calendar,Profile,Settings } from './pages/index'
import { App } from './components/index'
import './index.css'
import 'tw-elements'
import { ThemeProvider } from './context/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
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
                        <Route path='login' element={<Login />} />
                        <Route path='signup' element={<Signup />} />
                    </Routes>
                </UserProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
)
