import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin/ViewAdmin'
import CreateAdmin from './pages/Admin/createAdmin'
import UpdateAdmin from './pages/Admin/UpdateAdmin'
import GeneralUserDashboard from './pages/GeneralUsers/UserDashboard'

function App() {

  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Dashboard' element={<Dashboard />} />

          <Route path='/viewAdmin' element={<Admin/>} />
          <Route path='/createAdmin' element={<CreateAdmin/>} />
          <Route path='/viewAdmin/updateAdmin/:id' element={<UpdateAdmin/>} />

          <Route path='/userDashboard' element={<GeneralUserDashboard />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
