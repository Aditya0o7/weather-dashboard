import React from 'react'
import {Link,Outlet} from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <nav>
        <u1>
          <li>
            <Link to="./login">Login</Link>
          </li>
          <li>
            <Link to="./register">Register</Link>
          </li>
        </u1>
      </nav>
      <Outlet/>
    </div>
  )
}

export default MainLayout