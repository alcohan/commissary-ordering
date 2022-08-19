import styled from 'styled-components';
import { THEME } from '../../theme';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    background: lightgray;
`
export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 15px;

    img {
        height: 40px;
        width: 40px;
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
`