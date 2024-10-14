import React from 'react'
import AddQuestion from './AddQuestion'
import AddContest from './AddContest'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AddAptitude from './AddAptitude'
import AddInterview from './AddInterview'
import AddQuery from './AddQuery'
import AddProblem from './AddProblem'
const Urls = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<AdminSidebar/>}/>
        <Route path="/add-problem" element={<AddProblem/>}/>
            <Route path="/add-question" element={<AddQuestion/>}/>
            <Route path="/add-query" element={<AddQuery/>}/>
            <Route path="/add-contest" element={<AddContest/>}/>
            <Route path="/add-aptitude" element={<AddAptitude/>}/>
            <Route path="/add-interview" element={<AddInterview/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Urls
