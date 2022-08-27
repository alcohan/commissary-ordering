import styled from 'styled-components';
import { THEME } from '../../theme';

export const SignInPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    padding: 70px;
`

export const SignInContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-around;
    padding: 60px 30px;
    min-width: 50%;
    min-height: 10em;
    // background: lightgray;
    border: 2px solid ${THEME.DarkGreen};
    border-radius: 1em;
`

export const SignInHeader = styled.h2`
    margin: 10px 0;
    align-self: center;
`

export const SignInForm = styled.form`
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
`;