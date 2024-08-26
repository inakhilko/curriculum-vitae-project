import * as ReactRouter from 'react-router-dom';
import { useMutation } from '@apollo/client';
import type { AuthInput, AuthResult } from 'cv-graphql';
import { TabPanel } from '@mui/lab';
import { isAuthenticatedVar } from '../../apollo/reactiveVars.ts';
import { SIGNUP } from '../../apollo/mutations/auth.ts';
import AuthForm from '../../components/AuthForm/';

const { useNavigate } = ReactRouter;

function SignUpForm() {
  const [signup] = useMutation<{ signup: AuthResult }, { auth: AuthInput }>(
    SIGNUP
  );

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const { data } = await signup({
      variables: {
        auth: {
          email: formData.email,
          password: formData.password,
        },
      },
    });
    if (data) {
      localStorage.setItem('cvp_access_token', data.signup.access_token);
      localStorage.setItem('cvp_refresh_token', data.signup.refresh_token);
      localStorage.setItem('cvp_user_id', data.signup.user.id);
      isAuthenticatedVar(true);
      navigate('/users', { replace: true });
    }
  };
  return (
    <>
      <TabPanel value="signup">
        <AuthForm
          heading="Register now"
          description="Hello again. Sign up to continue"
          additionalLinkText="I have an account"
          additionalLinkPath="/auth/login"
          buttonText="Sign Up"
          onSubmit={onSubmit}
        />
      </TabPanel>
    </>
  );
}

export default SignUpForm;
