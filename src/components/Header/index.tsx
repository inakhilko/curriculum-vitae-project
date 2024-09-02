import { useReactiveVar } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar } from '@mui/material';
import ContrastIcon from '@mui/icons-material/Contrast';
import LanguageIcon from '@mui/icons-material/Language';
import { theme } from '../../apollo/reactiveVars.ts';
import { languages, themes } from './variables.ts';
import HeaderDrawer from '../HeaderDrawer';
import AvatarBlock from '../AvatarBlock';
import ScrollTop from '../../UI/ScrollToTopButton/index.tsx';
import HeaderSelect from '../../UI/HeaderSelect';
import './Header.styles.scss';

function Header() {
  const currentTheme = useReactiveVar(theme);

  const { i18n } = useTranslation();

  const onThemeChange = (event) => {
    theme(event.target.value);
    localStorage.setItem('cvp_theme', event.target.value);
  };

  const onLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar className="header-container">
          <HeaderDrawer />
          <div className="header-container__block">
            <HeaderSelect
              menuItemsList={themes}
              value={currentTheme}
              onChange={onThemeChange}
              startAdornment={<ContrastIcon />}
              nameSpace={'themes'}
            />
            <HeaderSelect
              menuItemsList={languages}
              value={i18n.language}
              onChange={onLanguageChange}
              startAdornment={<LanguageIcon />}
              nameSpace={'langs'}
            />
            <AvatarBlock />
          </div>
        </Toolbar>
      </AppBar>
      <ScrollTop />
    </>
  );
}

export default Header;
