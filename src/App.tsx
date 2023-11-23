import PageNotFound from './components/404/PageNotFound'
import Appbar from './components/Appbar/Appbar'
import Home from './components/Home/Home'
import NobelList from './components/NobelList/NobelList'
import {Route, Routes, Navigate} from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route element={<Appbar />}>
          <Route path="/" element={<Home />}/>
          <Route path="/nagrody">
            <Route index element={<Navigate to="/"/>}/>
            <Route path=":language/:year" element={<NobelList />}/>
            <Route path=":language" element={<Navigate to="/"/>}/>
          </Route>
          <Route path='*' element={<PageNotFound />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
