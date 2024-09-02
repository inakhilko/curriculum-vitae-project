import Header from '../../components/Header';
import PrivateBreadcrumbs from '../../components/Breadcrumbs';
import './PrivatePageTemplate.styles.scss';
import { ReactNode } from 'react';

interface PrivatePageTemplateProps {
  children: ReactNode;
}
function PrivatePageTemplate({ children }: PrivatePageTemplateProps) {
  return (
    <>
      <Header />
      <div className="page-container">
        <PrivateBreadcrumbs />
        {children}
      </div>
    </>
  );
}

export default PrivatePageTemplate;
