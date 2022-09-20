import { Outlet, Link } from "react-router-dom";
import {Navbar, Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import EvergreensLogo from '../../assets/Logo - Circle - White.png';
import VeggieIcon from '../../assets/veggie.png';
import CartIcon from '../../components/cart-icon/cart-icon.component';

import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.action";

import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink, FooterContainer} from "./navigation.styles";

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    const signOutHandler = () => {
        dispatch(signOutStart());
    };

    return (
        <>
            {/* <NavigationContainer>
                <LogoContainer to='/'>
                    <img src={EvergreensLogo} className='logo' />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to='/order'>
                        New Order
                    </NavLink>
                    <NavLink to='/history'>Order History</NavLink>
                    <NavLink to='/account'>Edit Account</NavLink>
                    {currentUser ?
                        (<>
                            <NavLink to='/auth'>Hello, {currentUser.displayName}</NavLink>
                            <NavLink as='span' className='nav-link' onClick={signOutHandler}>Sign Out</NavLink>
                        </>):
                        (<NavLink to='/auth'>Login</NavLink>)
                    }
                    <CartIcon />
                </NavLinksContainer>
            </NavigationContainer> */}

<nav class="navbar navbar-expand-md navbar-dark bg-primary" aria-label="Fourth navbar example">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">
        <img src={EvergreensLogo} alt="Bootstrap" width="50" height="50" />
        </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample04">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <LinkContainer to='/'>
                <Nav.Link>Home</Nav.Link>
            </LinkContainer>
          </li>
          <li class="nav-item">
            <LinkContainer to='/order'>
                <Nav.Link>Order</Nav.Link>
            </LinkContainer>
          </li>
          <li class="nav-item">
            <LinkContainer to='/auth'>
                <Nav.Link>Auth</Nav.Link>
            </LinkContainer>
          </li>
          <li class="nav-item">
            <LinkContainer to='/checkout'>
                <Nav.Link>Cart</Nav.Link>
            </LinkContainer>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        {/* <form role="search">
          <input class="form-control" type="search" placeholder="Search" aria-label="Search"/>
        </form> */}
        <CartIcon />
      </div>
    </div>
  </nav>

  {/* <Navbar bg="dark" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <LinkContainer to="/auth">
                    <Nav.Link>Auth</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/order">
                    <Nav.Link>Order</Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar.Collapse>
  </Navbar> */}

            <Outlet />
        </>
    )
};

export default Navigation;