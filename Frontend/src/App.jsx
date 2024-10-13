import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './pages/LoginAndRegister/Home'
import Register from './pages/LoginAndRegister/Register'
import Login from './pages/LoginAndRegister/Login'
import Dashboard from './pages/LoginAndRegister/Dashboard'
import Admin from './pages/Admin/ViewAdmin'
import CreateAdmin from './pages/Admin/createAdmin'
import UpdateAdmin from './pages/Admin/UpdateAdmin'
import ViewCollectors from './pages/Collector/ViewCollectors'
import CreateCollectors from './pages/Collector/createCollector'
import UpdateCollectors from './pages/Collector/UpdateCollectors'
import MapView from './pages/Collector/mapview'

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

          <Route path='/ViewCollectors' element={<ViewCollectors/>} />
          <Route path='/CreateCollectors' element={<CreateCollectors/>} />
          <Route path='/UpdateCollector/:id' element={<UpdateCollectors/>} />

          <Route path='/mapview' element={<MapView/>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
