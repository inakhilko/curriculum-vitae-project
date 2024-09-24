import * as Router from 'react-router-dom';
import EmployeePage from '../pages/EmployeePage';
import PrivatePageTemplate from '../pages/PrivatePage';
import TablePageContent from '../modules/TablePageContent';
import ProfileContent from '../modules/ProfilePageContent';
import Languages from '../modules/LanguagesPageContent';
import CVs from '../modules/CVsPageContent';
import Skills from '../modules/SkillsPageContent';

const { Routes, Route, Navigate } = Router;

function PrivateRouter() {
  return (
    <Routes>
      <Route path="/" element={<PrivatePageTemplate />}>
        <Route path="users" element={<TablePageContent />} />
        <Route path="users/:userId" element={<EmployeePage />}>
          <Route index path="profile" element={<ProfileContent />} />
          <Route path="skills" element={<Skills />} />
          <Route path="languages" element={<Languages />} />
          <Route path="cvs" element={<CVs />} />
          <Route path="*" element={<Navigate to="profile" />} />
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
