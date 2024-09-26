import { ChangeEventHandler } from 'react';
import { Tab } from '@mui/material';
import { TabList } from '@mui/lab';
import { TabData } from '../../types/tabsTypes.ts';
import { useTranslation } from 'react-i18next';

interface PrivatePageTabListProps {
  handleChange: ChangeEventHandler;
  tabData: TabData[];
}
function PrivatePageTabList({
  handleChange,
  tabData,
}: PrivatePageTabListProps) {
  const { t } = useTranslation();
  return (
    <TabList
      onChange={handleChange}
      aria-label="user tabs"
      variant="scrollable"
      allowScrollButtonsMobile
      sx={{
        backgroundColor: 'background.default',
        boxShadow: 'unset',
        position: 'sticky',
        top: '96px',
        zIndex: 2,
        marginBottom: '10px',
      }}
    >
      {tabData.map(({ getLabel, value }) => (
        <Tab label={getLabel(t)} value={value} />
      ))}
    </TabList>
  );
}

export default PrivatePageTabList;
