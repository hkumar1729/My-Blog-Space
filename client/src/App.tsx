import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Blog from './Pages/Blog'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import Blogs from './Pages/Blogs'
import {Redirect} from './Pages/Redirect'
import './App.css'

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/blog' element={<Blog/>}/>
      <Route path='/blogs' element={<Blogs/>}/>
      <Route path='/' element={<Redirect/>}/>
    </Routes>
  </BrowserRouter>
}

export default App
