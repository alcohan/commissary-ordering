import { Outlet, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import EvergreensLogo from '../../assets/eg-logo-white.svg';
import VeggieIcon from '../../assets/veggie.png';
import CartIcon from '../../components/cart-icon/cart-icon.component';

import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/user/user.selector'
import { signOutStart } from '../../store/user/user.action'

import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink,
  FooterContainer,
} from './navigation.styles'

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  const signOutHandler = () => {
    dispatch(signOutStart())
  }

  return (
    <>
      <Navbar variant="dark" bg="primary" expand="md" className="mb-3 sticky-top">
        <Container fluid>
          <Navbar.Brand href="#">
            <img src={EvergreensLogo} alt="Bootstrap" width="50" height="50" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto mb-2 mb-md-0">
              <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
              <LinkContainer to="/order"><Nav.Link>Order</Nav.Link></LinkContainer>
              <LinkContainer to="/auth"><Nav.Link>Auth</Nav.Link></LinkContainer>
              <LinkContainer to="/checkout"><Nav.Link>Cart</Nav.Link></LinkContainer>
              <LinkContainer to="/nothing" disabled><Nav.Link>Disabled</Nav.Link></LinkContainer>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" as={Nav.Link}>
                  Dropdown
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Item1</Dropdown.Item>
                  <Dropdown.Item>Item2</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
            <CartIcon />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  )
}

export default Navigation
