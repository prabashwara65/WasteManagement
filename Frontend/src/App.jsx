import { BrowserRouter , Routes , Route } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "../src/ReduxTool/Store";
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin/ViewAdmin'
import CreateAdmin from './pages/Admin/createAdmin'
import UpdateAdmin from './pages/Admin/UpdateAdmin'

import GeneralUserDashboard from './pages/GeneralUsers/UserDashboard'

import CollectorDashboard from './pages/collector/CollectorDashboard'
import ViewCollectors from './pages/CollectorCrud/ViewCollectors'
import CreateCollectors from './pages/CollectorCrud/CreateCollector'
import UpdateCollectors from './pages/CollectorCrud/UpdateCollectors'
import ViewCityAssign from './pages/CityAssign/CityAssignCrud/View'
import CreateCityAssign from './pages/CityAssign/CityAssignCrud/Create'
import UpdateCityAssign from './pages/CityAssign/CityAssignCrud/Update'


function App() {

  return (
    <>

      <Provider store={store}>
        <BrowserRouter >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Dashboard' element={<Dashboard />} />

            <Route path='/viewAdmin' element={<Admin/>} />
            <Route path='/createAdmin' element={<CreateAdmin/>} />
            <Route path='/viewAdmin/updateAdmin/:id' element={<UpdateAdmin/>} />

            <Route path='/collectorDashboard' element={<CollectorDashboard/>} />

            <Route path='/ViewCollectors' element={<ViewCollectors/>} />
            <Route path='/CreateCollectors' element={<CreateCollectors/>} />
            <Route path='/UpdateCollector/:id' element={<UpdateCollectors/>} />

            <Route path='/ViewCityAssign' element={<ViewCityAssign/>} />
            <Route path='/CreateCityAssign' element={<CreateCityAssign/>} />
            <Route path='/UpdateCityAssign/:id' element={<UpdateCityAssign/>} />
            <Route path='/userDashboard' element={<GeneralUserDashboard />} />

            <Route path='/collectorDashboard' element={<CollectorDashboard/>} />

          </Routes>
        </BrowserRouter>
      </Provider>

    </>
  )
}

export default App
