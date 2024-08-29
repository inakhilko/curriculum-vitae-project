import { useEffect, useState } from 'react';

const useSystemMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

    // Обновляем тему в зависимости от начальных настроек
    setIsDarkMode(matchMedia.matches);

    // Устанавливаем слушатель изменений
    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    matchMedia.addEventListener('change', handleChange);

    // Очищаем слушатель при размонтировании компонента
    return () => matchMedia.removeEventListener('change', handleChange);
  }, []);

  return isDarkMode ? 'dark' : 'light';
};

export default useSystemMode;
