import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import SignIn from "../../components/sign-in/sign-in.component";
import { signOutStart } from "../../store/user/user.action";

const Auth = () => {
    const dispatch = useDispatch();
    const signOutHandler = () => {
        dispatch(signOutStart())
    }
    return(
        <>
        <Container>
            <Button>Sign In With Microsoft</Button>
            <Button onClick={signOutHandler}> Sign Out</Button>
        </Container>

        {/* old sign in container */}
        <SignIn />
        </>
    )
}
export default Auth;