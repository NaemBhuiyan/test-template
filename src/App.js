import React from 'react';
import { loadProgressBar } from 'axios-progress-bar';
import { GLobalStyles } from 'styles';
import { AppProvider } from 'components';
import { http } from 'services';
import Routes from 'router';
import 'nprogress/nprogress.css';
import { ToastContainer } from 'react-toastify';
import ContextProvider from './components/wrapper/ContextProvider';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // load progress bar on every http request by custom axios instance
  loadProgressBar({}, http);

  return (
    <ContextProvider>
      <AppProvider>
        <GLobalStyles />
        <Routes />
        <ToastContainer />
      </AppProvider>
    </ContextProvider>
  );
}

export default App;
