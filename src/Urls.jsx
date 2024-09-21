import React from 'react'
import AddQuestion from './AddQuestion'
import AddContest from './AddContest'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AddAptitude from './AddAptitude'
const Urls = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<AdminSidebar/>}/>
            <Route path="/add-question" element={<AddQuestion/>}/>
            <Route path="/add-contest" element={<AddContest/>}/>
            <Route path="/add-aptitude" element={<AddAptitude/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Urls