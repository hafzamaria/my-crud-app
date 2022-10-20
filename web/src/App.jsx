

import './App.css';
import Home from './home/home';
import React from "react";
// import Login from './components/login';
import User from './user/user';
import Product from './product/product';
import NavBar from './navbar/navbar'

 import {
  BrowserRouter as Router,
  Routes ,
  Route,
  // Link,/////it is 'a' anchor tag
 
} from "react-router-dom";







function App() {
  return (
    <Router>

      <NavBar/>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>

          {/* <Route path="/about" element={ <About /> } /> */}
          <Route path="/product" element={ <Product /> } />
          <Route path="/user" element={ <User /> } />
          <Route path="/" element={ <Home /> } />
          {/* <Route path="/signup" element={ <Signup /> } /> */}
        </Routes>
      
    </Router>
  );
}

export default App;
