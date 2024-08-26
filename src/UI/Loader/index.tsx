import { CircularProgress } from '@mui/material';
import './Loader.styles.scss';

function Loader() {
  return (
    <div className="loader-container">
      <CircularProgress />
    </div>
  );
}

export default Loader;
