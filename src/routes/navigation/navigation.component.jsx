import { Outlet } from "react-router-dom";
import EvergreensLogo from '../../assets/logo.png';
import VeggieIcon from '../../assets/veggie.png';

import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink} from "./navigation.styles";

const Navigation = () => {
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
                </NavLinksContainer>
            </NavigationContainer>
            <Outlet />
        </>
    )
};

export default Navigation;