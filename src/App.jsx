import { Route, Routes } from 'react-router-dom'


import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'
import FullDish from './pages/FullDish'


import './scss/app.scss'
import MainLayout from './layouts/MainLayout'



function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/dish/:id' element={<FullDish />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
