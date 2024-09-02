import * as Router from 'react-router-dom';
import AuthorizationPage from '../pages/AuthorizationPage';
import SignInForm from '../modules/SignInForm';
import SignUpForm from '../modules/SignUpForm';

const { Routes, Route, Navigate } = Router;

function PublicRouter() {
  return (
    <Routes>
      <Route path="auth" element={<Navigate to="/auth/login" />} />
      <Route path="auth" element={<AuthorizationPage />}>
        <Route path="login" element={<SignInForm />} />
        <Route path="signup" element={<SignUpForm />} />
      </Route>
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
}

export default PublicRouter;
