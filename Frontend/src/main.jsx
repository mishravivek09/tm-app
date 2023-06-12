import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { LoginContextProvider } from './contexts/LoginContext.jsx'
import { FormContextProvider } from "./contexts/FormContext.jsx"
import { TaskContextProvider } from "./contexts/TaskContext.jsx"
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <FormContextProvider>
        <LoginContextProvider>
          <TaskContextProvider>
            <App />
          </TaskContextProvider>
        </LoginContextProvider>
      </FormContextProvider>
    </React.StrictMode>,
  </BrowserRouter>
)
