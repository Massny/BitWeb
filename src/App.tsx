import PageNotFound from './assets/components/404/PageNotFound'
import Home from './assets/components/Home/Home'
import Table from './assets/components/Table/Table'
import {Route, Routes, Navigate} from 'react-router-dom'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}/>

      <Route path="/nagrody"  >
        <Route index element={<Navigate to="/"/>}/>
        <Route path=":language/:year" element={<Table />}/>
        <Route path=":language" element={<Navigate to="/"/>}/>
      </Route>
      <Route path='*' element={<PageNotFound />}/>
    </Routes>

    </>
  )
}

export default App
