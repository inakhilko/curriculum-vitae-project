import { AppBar, Fab, Toolbar } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ScrollTop from '../../UI/ScrollToTopButton/index.tsx';
import HeaderDrawer from '../HeaderDrawer';
import './Header.styles.scss';
import AvatarBlock from '../AvatarBlock';
import ContrastIcon from '@mui/icons-material/Contrast';
import LanguageIcon from '@mui/icons-material/Language';
import HeaderSelect from '../../UI/HeaderSelect';
import { language, theme } from '../../apollo/reactiveVars.ts';

const themes = ['light', 'dark', 'system'];
const languages = ['en', 'de', 'fr', 'ru'];

function Header() {
  return (
    <>
      <AppBar position="sticky" id="header">
        <Toolbar className="header-container">
          <HeaderDrawer />
          <div className="header-container__block">
            <HeaderSelect
              menuItemsList={themes}
              reactVar={theme}
              startAdornment={<ContrastIcon />}
            />
            <HeaderSelect
              menuItemsList={languages}
              reactVar={language}
              startAdornment={<LanguageIcon />}
            />
            <AvatarBlock />
          </div>
        </Toolbar>
      </AppBar>
      {/*<Toolbar id="back-to-top-anchor" />*/}
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}

export default Header;
