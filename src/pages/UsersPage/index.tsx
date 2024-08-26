import { useQuery } from '@apollo/client';
import * as ReactRouter from 'react-router-dom';
import { USERS } from '../../apollo/queries/queries.ts';
import { isAuthenticatedVar } from '../../apollo/reactiveVars.ts';

const { useNavigate } = ReactRouter;

function UsersPage() {
  const { data, error } = useQuery(USERS);
  const navigate = useNavigate();

  return (
    <>
      <div>Users page</div>
      <button
        onClick={() => {
          localStorage.removeItem('cvp_access_token');
          localStorage.removeItem('cvp_refresh_token');
          localStorage.removeItem('cvp_user_id');
          isAuthenticatedVar(false);
          navigate('/', { replace: true });
        }}
      >
        Logout
      </button>
    </>
  );
}

export default UsersPage;
