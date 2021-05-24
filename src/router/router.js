import React, { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ErrorBoundary } from '@sentry/react';

import { ErrorFallback } from 'components';
import BookingWidgetPage from 'pages/BookingWidget/BookingWidget';
import { useIntl } from 'react-intl';
import Loading from '../features/Vaccination/Loading';
import { PUBLIC_ROUTE } from './appRoutes';

const HomePage = lazy(() => import('pages/HomePage'));
const AgePage = lazy(() => import('pages/Age'));
const DestinationPage = lazy(() => import('pages/Destination'));
const NearestLocation = lazy(() => import('pages/NearesLocation'));

const ConfirmationPage = lazy(() =>
  import('pages/ConfirmationPage/ConfirmationPage'),
);
const NotFound = lazy(() => import('pages/NotFoundPage'));

function Routes() {
  const { messages } = useIntl();
  const publicRoutes = [
    {
      path: PUBLIC_ROUTE.LANDING,
      exact: true,
      component: HomePage,
    },
    {
      path: PUBLIC_ROUTE.DESTINATION,
      exact: true,
      component: DestinationPage,
    },
    {
      path: PUBLIC_ROUTE.AGE,
      exact: true,
      component: AgePage,
    },
    {
      path: PUBLIC_ROUTE.NEAREST_LOCATION,
      exact: true,
      component: NearestLocation,
    },
    {
      path: PUBLIC_ROUTE.BOOKING_WIDGET,
      exact: true,
      component: BookingWidgetPage,
    },
    {
      path: PUBLIC_ROUTE.CONFIRM,
      exact: true,
      component: ConfirmationPage,
    },
  ];

  return (
    <ErrorBoundary
      fallback={({ error, componentStack, resetError }) => (
        <ErrorFallback error={{ error, componentStack, resetError }} />
      )}
      showDialog
    >
      <Suspense fallback={<Loading message={messages['Loading...']} loading />}>
        <Router>
          <Switch>
            {publicRoutes.map(route => (
              <Route key={route.path} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ))}
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}

export default Routes;
