import React, { createContext, useMemo, useContext, useState } from "react";
import createTranslator from "./createTranslator";
import { ME } from "../../queries";
import { useQuery } from '@apollo/react-hooks'

function translator(namespace) {
  return key => namespace + "." + key;
}

const Context = createContext({ translator, locale: null });
const languages = ['en', 'de', 'es', 'fr', 'pt', 'ru']

export function useTranslate(namespace) {
  let { translator, locale, changeLanguage } = useContext(Context);
  let t = useMemo(() => translator(namespace), [namespace, locale]);
  return {t, locale, changeLanguage, languages};
}

export function TranslatorProvider({ children, client }) {
  const isBrowser = typeof window !== 'undefined';

  const localLanguage = window.localStorage.getItem("language");
  let defaultLanguage = localLanguage ? localLanguage : 'de';

  const { data, error, loading } = useQuery(ME);
  if( isBrowser ) {
    if( data && data.me ) {
      defaultLanguage = data.me.language.toLowerCase();

    }
  }

  React.useEffect(() => {
    if(error) {
      const storedLanguage = window.localStorage.getItem("language");
      if( storedLanguage ) {
        defaultLanguage = storedLanguage;
        setLanguage(defaultLanguage);
      }
    }
  },[error]);


  let [language, setLanguage] = useState(defaultLanguage);
  let translations = require('../../../static/locales/' + language + '/translations.json');

  React.useEffect(() => {
    translations = require('../../../static/locales/' + language + '/translations.json');
  }, [language]);


  return (
    <Context.Provider
      value={{
        translator: createTranslator(translations),
        locale: translations.locale,
        changeLanguage: (lang) => {
          if(lang != language) {
            window.localStorage.clear();
          }
          window.localStorage.setItem('language', lang.toLowerCase());
          setLanguage(lang.toLowerCase())
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function translate(displayName) {
  return function(Component) {
    return function ReactTranslateLegacy(props) {
      let t = useTranslate(displayName);
      return <Component {...props} t={t} />;
    };
  };
}
