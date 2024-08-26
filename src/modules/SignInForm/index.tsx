import * as ReactRouter from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import type { AuthInput, AuthResult } from 'cv-graphql';
import { TabPanel } from '@mui/lab';
import AuthForm from '../../components/AuthForm';
import { LOGIN } from '../../apollo/queries/queries.ts';
import { isAuthenticatedVar } from '../../apollo/reactiveVars.ts';
import { toast } from 'react-toastify';

const { useNavigate } = ReactRouter;

function SignInForm() {
  const [signin] = useLazyQuery<{ login: AuthResult }, { auth: AuthInput }>(
    LOGIN
  );

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const { data, error } = await signin({
      variables: {
        auth: {
          email: formData.email,
          password: formData.password,
        },
      },
    });
    if (error) {
      toast.error(error.message);
    }
    if (data) {
      localStorage.setItem('cvp_access_token', data.login.access_token);
      localStorage.setItem('cvp_refresh_token', data.login.refresh_token);
      localStorage.setItem('cvp_user_id', data.login.user.id);
      isAuthenticatedVar(true);
      navigate('/users', { replace: true });
    }
  };
  return (
    <TabPanel value="login">
      <AuthForm
        heading="Welcome back!"
        description="Hello again! Sign in to continue"
        additionalLinkText="I don't have an account"
        additionalLinkPath="/auth/signup"
        onSubmit={onSubmit}
        buttonText="Log In"
      />
    </TabPanel>
  );
}

export default SignInForm;
