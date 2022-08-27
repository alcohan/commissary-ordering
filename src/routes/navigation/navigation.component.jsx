import { Outlet } from "react-router-dom";
import EvergreensLogo from '../../assets/Logo - Circle - White.png';
import VeggieIcon from '../../assets/veggie.png';

import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.action";

import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink} from "./navigation.styles";

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    const signOutHandler = () => {
        dispatch(signOutStart());
    };

    return (
        <>
            <NavigationContainer>
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
                </NavLinksContainer>
            </NavigationContainer>
            <Outlet />
        </>
    )
};

export default Navigation;