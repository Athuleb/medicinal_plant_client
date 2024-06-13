import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { mainRouter } from './router/Router'
import './App.css'

function App() {

  return <RouterProvider router={mainRouter}/>
}

export default App
