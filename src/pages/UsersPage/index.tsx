import { useQuery } from '@apollo/client';
import * as ReactRouter from 'react-router-dom';
import { USERS } from '../../apollo/queries/queries.ts';
import Header from '../../components/Header';

const { useNavigate } = ReactRouter;

function UsersPage() {
  const { data, error, refetch } = useQuery(USERS);

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div>Users page</div>
    </>
  );
}

export default UsersPage;
