import { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi,mr', // Include the languages you want
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    };

    const addScript = (src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    addScript('//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');

    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
