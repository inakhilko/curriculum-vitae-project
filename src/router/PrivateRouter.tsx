import * as Router from 'react-router-dom';
import UsersPage from '../pages/UsersPage';

const { Routes, Route, Navigate } = Router;

function PrivateRouter() {
  return (
    <Routes>
      <Route path="users" element={<UsersPage />} />
      <Route path="*" element={<Navigate to="/users" />} />
    </Routes>
  );
}

export default PrivateRouter;
