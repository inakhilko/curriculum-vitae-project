import * as Router from 'react-router-dom';
import EmployeePage from '../pages/EmployeePage';
import PrivatePageTemplate from '../pages/PrivatePage';
import TablePageContent from '../modules/TablePageContent';

const { Routes, Route, Navigate } = Router;

function PrivateRouter() {
  return (
    <Routes>
      <Route path="/" element={<PrivatePageTemplate />}>
        <Route path="users" element={<TablePageContent />} />
        <Route path="users/:userId" element={<EmployeePage />}>
          {/*  <Route path="profile" element={} />*/}
          {/*  <Route path="skills" element={} />*/}
          {/*  <Route path="languages" element={} />*/}
          {/*  <Route path="cvs" element={} />*/}
        </Route>
        <Route path="projects" element={<TablePageContent />} />
        <Route path="cvs" element={<TablePageContent />}>
          {/*  <Route path=":cvId" element={}>*/}
          {/*    <Route path="skills" element={} />*/}
          {/*    <Route path="details" element={} />*/}
          {/*    <Route path="projects" element={} />*/}
          {/*    <Route path="preview" element={} />*/}
          {/*  </Route>*/}
        </Route>
        <Route path="departments" element={<TablePageContent />} />
        <Route path="positions" element={<TablePageContent />} />
        <Route path="skills" element={<TablePageContent />} />
        <Route path="languages" element={<TablePageContent />} />
      </Route>

      <Route path="*" element={<Navigate to="/users" />} />
    </Routes>
  );
}

export default PrivateRouter;
