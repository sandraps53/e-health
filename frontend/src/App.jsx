import React from 'react'
import Home from './pages/Home'
import {Routes,Route, Navigate} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import PrivateRoute from './components/PrivateRoute'
import PrescriptionPreview from './pages/PrescriptionPreview'

const App = () => {
  return (
   <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register/>}/>
       <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
               <Route path='/prescription/preview' element={<PrivateRoute><PrescriptionPreview/></PrivateRoute>}/>
       <Route path='/*' element={ <Navigate to={'/'}/> }/>
    </Routes>
   </>
  )
}

export default App