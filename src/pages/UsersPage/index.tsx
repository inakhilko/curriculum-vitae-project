import { useQuery } from '@apollo/client';
import * as ReactRouter from 'react-router-dom';
import { USER, USERS } from '../../apollo/queries/queries.ts';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';
import PrivatePageTemplate from '../../modules/PrivatePageTemplate';
import { useLocation, useParams } from 'react-router-dom';

const { useNavigate } = ReactRouter;

function UsersPage() {
  const { data, error, refetch } = useQuery(USERS);

  const navigate = useNavigate();

  return (
    <>
      <PrivatePageTemplate>
        <div>Users page</div>
      </PrivatePageTemplate>
    </>
  );
}

export default UsersPage;
