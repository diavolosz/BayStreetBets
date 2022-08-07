import '../../uikit/dist/css/uikit.css'
import '../../stylesheet/Navbar.scss'
import StockPosition from './StockPosition'



export default function Navbar() {


  return (

    <nav className='navbar'>
      <article className='profile-pic'>

      </article>
      <h3>Name</h3>

      <ul>
        <li>cash on hand</li>
        <li>days left</li>
        <li>cash and assets total</li>
      </ul>

      <section>
        <StockPosition />
      </section>

      <ul>
        <li>profile</li>
        <li>logout</li>
      </ul>
    </nav>
  )
}