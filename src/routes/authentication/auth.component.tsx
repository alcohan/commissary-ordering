import { Button, Container } from "react-bootstrap";
import SignIn from "../../components/sign-in/sign-in.component";

const Auth = () => {
    return(
        <>
        <Container>
            <Button>Sign In With Microsoft</Button>
        </Container>

        {/* old sign in container */}
        <SignIn />
        </>
    )
}
export default Auth;