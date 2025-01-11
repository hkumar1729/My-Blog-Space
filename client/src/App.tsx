import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Blog from './Pages/Blog'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import Blogs from './Pages/Blogs'
import {Redirect} from './Pages/Redirect'
import './App.css'
import { Suspense } from 'react'

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Suspense fallback={'loading...'}><Signup/></Suspense>}/>
      <Route path='/signin' element={<Suspense fallback={'loading...'}><Signin/></Suspense>}/>
      <Route path='/blog' element={<Suspense fallback={'loading...'}><Blog/></Suspense>}/>
      <Route path='/blogs' element={<Suspense fallback={'loading...'}><Blogs/></Suspense>}/>
      <Route path='/' element={<Redirect/>}/>
    </Routes>
  </BrowserRouter>
}

export default App
