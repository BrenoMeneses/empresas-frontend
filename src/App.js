import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './app.css'
import Home from './pages/home'
import Lista from './pages/lista'
import Edit from './pages/edit'
import Navbar from './components/navBar'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/lista' element={<Lista />} />
        <Route path='/edicao/:id' element={<Edit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


// echo "# empresas" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/BrenoMeneses/empresas.git
// git push -u origin main