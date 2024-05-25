import React from 'react'
import { Link } from 'react-router-dom';

function LogoComponent() {
  return (
    <Link className="a-logo" to="/">
      <img className="logo" src={require("./Assets/TempLogo.jpg")} alt="Temporary Logo" /> {/* CHANGE SRC AND ALT */}
    </Link>
  )
}

export default LogoComponent