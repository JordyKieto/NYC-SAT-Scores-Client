import {
    Navbar,
    Nav,
} from 'react-bootstrap';
import React from 'react';
import { NavLink } from 'react-router-dom'

class MainNav extends React.Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                            <Navbar.Brand href="#">NYC SAT Scores By Racial Makeup</Navbar.Brand>
                            <NavLink className="nav-item nav-link" to="/">Scores</NavLink>
                            <NavLink className="nav-item nav-link" to="/matrix">Correlation Matrix</NavLink>
                            <NavLink className="nav-item nav-link" to="/predict">Predict Score</NavLink>
            </Navbar>
        )
    }

}
export default MainNav;