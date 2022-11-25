import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { App } from './App'
import './index.css'
import { AddTasks } from './pages/AddTasks'
import { Profile } from './pages/Profile'
import { Settings } from './pages/Settings'
import { Tasks } from './pages/Tasks'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Tasks />}></Route>
                    <Route path='profile' element={<Profile />}></Route>
                    <Route path='add-task' element={<AddTasks />}></Route>
                    <Route path='settings' element={<Settings />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
