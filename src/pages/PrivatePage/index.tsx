import * as Router from 'react-router-dom';
import Header from '../../components/Header';
import PrivateBreadcrumbs from '../../components/Breadcrumbs';
import './PrivatePage.styles.scss';

const { Outlet } = Router;

function PrivatePageTemplate() {
  return (
    <>
      <Header />
      <div className="page-container">
        <PrivateBreadcrumbs />
        <Outlet />
      </div>
    </>
  );
}

export default PrivatePageTemplate;
