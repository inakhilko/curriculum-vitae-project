import { useEffect, useState } from 'react';

const useSystemMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    matchMedia.addEventListener('change', handleChange);

    return () => matchMedia.removeEventListener('change', handleChange);
  }, []);

  return isDarkMode ? 'dark' : 'light';
};

export default useSystemMode;
