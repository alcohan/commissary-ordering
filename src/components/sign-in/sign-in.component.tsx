import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES} from '../button/button.component';
import { SignInPage, SignInContainer, SignInHeader, ButtonsContainer } from './sign-in.styles';

import { emailSignInStart } from '../../store/user/user.action';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignIn = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password } = formFields;

    const dispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
    
        setFormFields({ ...formFields, [name]: value });
      };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            dispatch(emailSignInStart(email,password));
            resetFormFields();
        } catch (error) {
            console.log('user sign in failed', error);
        }

    }

    return (
        <SignInPage>
            <SignInContainer>
                <SignInHeader>Hello</SignInHeader>
                <form onSubmit={handleSubmit}>
                    <FormInput 
                        label="Email"
                        type="text"
                        required
                        onChange={handleChange}
                        name="email"
                        value={email}
                    />
                    <FormInput 
                        label="Password"
                        type="password"
                        required
                        onChange={handleChange}
                        name="password"
                        value={password}
                    />
                    <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    {/* <Button
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        type='button'
                        // onClick={signInWithGoogle}
                    >
                        Sign In With Google
                    </Button> */}
                    </ButtonsContainer>
                </form>
            </SignInContainer>
        </SignInPage>
    )
};

export default SignIn;