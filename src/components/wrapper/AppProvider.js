import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import { theme, AppLocale } from 'config';
import Layout from './Layout';
import VacciContext from '../../Context/index';

export default function AppProvider({ children }) {
  const { language } = useContext(VacciContext);
  const currentAppLocale = AppLocale[language];

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ThemeProvider theme={theme}>
        <Layout>{children}</Layout>
      </ThemeProvider>
    </IntlProvider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
