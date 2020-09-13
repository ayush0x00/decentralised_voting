import React from 'react'
import {Navbar,NavbarBrand,Nav, NavItem} from 'reactstrap'
import {NavLink} from 'react-router-dom'

const Header=()=>{
  return(
    <>
    <Navbar color="primary" expand="md">
      <div className="container">
        <NavbarBrand className="mr-auto" to="/">Decentralised Voting</NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink style={{color:"black"}} className="nav-link" to="/home">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" style={{color:"black"}} to="/addContestants">AddContestant</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" style={{color:"black"}} to="/results">Results</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" style={{color:"black"}} to="/contestantDetails"> AboutContestants </NavLink>
          </NavItem>
        </Nav>
      </div>
      </Navbar>

      </>
  )
}

export default Header;
