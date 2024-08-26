import * as ReactRouter from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import type { AuthInput } from 'cv-graphql';
import { Button } from '@mui/material';
import { useTabContext } from '@mui/lab';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from '../../UI/FormInput/';
import PasswordFormInput from '../../UI/PasswordFormInput';
import './AuthForm.styles.scss';

const { Link } = ReactRouter;

interface FormProps {
  heading: string;
  description: string;
  additionalLinkPath: string;
  additionalLinkText: string;
  onSubmit: (formData: AuthInput) => void;
  buttonText: string;
}

function AuthForm({
  heading,
  description,
  additionalLinkText,
  additionalLinkPath,
  buttonText,
  onSubmit,
}: FormProps) {
  const methods = useForm();
  const { setValue } = useTabContext();
  return (
    <>
      <h2 className="auth__heading">{heading}</h2>
      <span className="auth__description">{description}</span>
      <FormProvider {...methods}>
        <form className="auth-form" onSubmit={methods.handleSubmit(onSubmit)}>
          <FormInput name="email" label="E-Mail" type="email" />
          <PasswordFormInput name="password" label="Password" type="password" />
          <Button
            variant="contained"
            type="submit"
            className="auth-form__button"
          >
            {buttonText}
          </Button>
        </form>
      </FormProvider>
      <Link
        to={additionalLinkPath}
        className="auth__link"
        onClick={() => setValue(additionalLinkPath)}
      >
        {additionalLinkText}
      </Link>
      <ToastContainer />
    </>
  );
}

export default AuthForm;
