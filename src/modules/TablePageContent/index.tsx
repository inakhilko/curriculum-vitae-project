import TableTemplate from '../../components/TableTemplate';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { tablePagesConfigs } from './variables/tablePagesConfigs.tsx';

function TablePageContent() {
  const { pathname } = useLocation();

  const currentPageConfig = useMemo(() => {
    const page = pathname.split('/')[1];
    return tablePagesConfigs[page];
  }, [pathname]);

  return (
    <TableTemplate
      columns={currentPageConfig.columns}
      query={currentPageConfig.query}
      searchFunction={currentPageConfig.search}
      createRows={currentPageConfig.createRows}
      chooseResponsiveColumns={currentPageConfig.chooseResponsiveColumns}
      getCellContent={currentPageConfig.getCellContent}
    />
  );
}

export default TablePageContent;
