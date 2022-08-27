import styled from 'styled-components';
import { THEME } from '../../theme';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
    height: 70px;
    // width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    background: ${THEME.DarkGreen};

`
export const LogoContainer = styled(Link)`
    // height: 100%;
    // width: 70px;
    padding: 10px;
    // background: lightgray;

    img {
        // height: 40px;
        // width: 40px;
        height: 100%;
    }
`

export const NavLinksContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  color: white;
  text-decoration: none;
`