import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = ()=>{



    return(
        <header className='headerNav'>
            <ul className='navbar'>
                <li><Link to="/">cadastrar</Link></li>
                <li><Link to="/lista">listar</Link></li>
            </ul>
        </header>
    )
}

export default Navbar
