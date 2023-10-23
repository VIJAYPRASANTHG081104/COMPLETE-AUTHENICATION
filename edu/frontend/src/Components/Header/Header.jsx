import React from 'react'
import { Link,NavLink  } from 'react-router-dom'
import { Container, Row, Button } from 'reactstrap'
import '../Header/Header.css'
import LOGO from '../../Images/LOGO.png'
function Header() {
  const nav_links = [
    {
        path:'/home',
        display: 'Home'
    },
    {
        path:'/about',
        display: 'About'
    },
    {
        path:'/contact',
        display: 'Contact'
    }

]
  return (
    <header className='header' >
            <Container >
                <Row className='content__1'>
                    <div className='nav__wrapper d-flex align-item-center justify-content-between'>
                        {/* logo sec  */}
                        <div className="Logo">
                            <img src={LOGO} alt='' className='logo1'/>
                        </div>
                        {/* logo end */}
                        {/* menu sec */}
                        <div className='navigation'>
                            <ul className='menu d-flex align-items-center gap-5'>
                                {
                                    nav_links.map((item, index) => (
                                        <li className='nav__item' key={index}>
                                            <NavLink to={item.path} className={navClass => navClass.isActive ? "active__link" : ""}>{item.display}</NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        {/* menu sec ends */}

                        <div className='nav__right d-flex align-items-center'>
                            <div className='nav__btns d-flex align-items-center'>
                                <Button className='btn secondary__btn'>
                                    <Link to="/login">Login</Link>
                                </Button>
                                <Button className='btn primary__btn'>
                                    <Link to="/register">Register</Link>
                                </Button>
                            </div>
                            <span className='mobile__menu'>
                            <i class="ri-menu-line"></i>
                            </span>
                        </div>

                    </div>
                </Row>
            </Container>
        </header>
  )
}

export default Header