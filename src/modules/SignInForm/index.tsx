import * as ReactRouter from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import type { AuthInput, AuthResult } from 'cv-graphql';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { TabPanel } from '@mui/lab';
import AuthForm from '../../components/AuthForm';
import { LOGIN } from '../../apollo/queries/queries.ts';
import { isAuthenticatedVar } from '../../apollo/reactiveVars.ts';

const { useNavigate } = ReactRouter;

function SignInForm() {
  const [signin] = useLazyQuery<{ login: AuthResult }, { auth: AuthInput }>(
    LOGIN
  );

  const navigate = useNavigate();

  const { t } = useTranslation();

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
        heading={t('heading', { ns: 'logInForm' })}
        description={t('description', { ns: 'logInForm' })}
        additionalLinkText={t('additionalLink', { ns: 'logInForm' })}
        additionalLinkPath="/auth/signup"
        onSubmit={onSubmit}
        buttonText={t('login')}
      />
    </TabPanel>
  );
}

export default SignInForm;
