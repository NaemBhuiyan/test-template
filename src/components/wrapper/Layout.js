import React from 'react';
import PropTypes from 'prop-types';

import { Section } from 'styles';
import Footer from '../Footer';

function Layout({ children }) {
  return (
    <>
      <Section className="flex-shrink-0 overflow-hidden">{children}</Section>
      <Footer />
    </>
  );
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
