


import {Link} from 'react-router-dom';
import './index.css'
import { useContext } from "react";
import { GlobalContext } from '../context';

const NavBar= () => {
    let { state, dispatch } = useContext(GlobalContext);
    return(
      <div className='nav1'>
     
          <nav className='nav'>
         
               <h1 className='navhead'>TheEShop</h1>
          <div className='userName'>
          {state?.user?.firstName} {state?.user?.lastName}</div>
            <ul>
  
              <li><Link to="/">Home</Link></li>

              <li><Link to="/user">User</Link></li>

              {/* <li><Link to="/signup">Signup</Link></li> */}

              <li><Link to="/product">Product</Link></li>
  
            </ul>
        
          </nav>
           </div>
    )
  
  }
  export default NavBar;