import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

import PageContent from '../components/PageContent';

function ErrorPage() {
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  // Helper function to extract message from error data
  const getErrorMessage = (data) => {
    if (!data) return null;
    
    // If data is already an object with a message property (React Router v7 auto-parses JSON)
    if (typeof data === 'object' && data.message) {
      return data.message;
    }
    
    // If data is a string, try to parse it as JSON
    if (typeof data === 'string') {
      try {
        const parsed = JSON.parse(data);
        return parsed.message || data;
      } catch {
        return data;
      }
    }
    
    return null;
  };

  // Check if this is a route error response (from React Router)
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = 'Not found!';
      // React Router v7 should automatically parse JSON Response bodies
      if (error.data && typeof error.data === 'object' && error.data.message) {
        message = error.data.message;
      } else if (error.data && typeof error.data === 'string') {
        try {
          const parsed = JSON.parse(error.data);
          message = parsed.message || 'Could not find resource or page.';
        } catch {
          message = 'Could not find resource or page.';
        }
      } else {
        message = 'Could not find resource or page.';
      }
    } else if (error.status === 500) {
      if (error.data && typeof error.data === 'object' && error.data.message) {
        message = error.data.message;
      } else if (error.data && typeof error.data === 'string') {
        try {
          const parsed = JSON.parse(error.data);
          message = parsed.message || 'Something went wrong!';
        } catch {
          message = 'Something went wrong!';
        }
      } else {
        message = 'Something went wrong!';
      }
    } else {
      if (error.data && typeof error.data === 'object' && error.data.message) {
        message = error.data.message;
      } else if (error.data && typeof error.data === 'string') {
        try {
          const parsed = JSON.parse(error.data);
          message = parsed.message || error.message || 'Something went wrong!';
        } catch {
          message = error.message || 'Something went wrong!';
        }
      } else {
        message = error.message || 'Something went wrong!';
      }
    }
  } else if (error.status) {
    // Handle Response errors that aren't recognized as route errors
    if (error.status === 404) {
      title = 'Not found!';
      message = 'Could not find resource or page.';
    } else {
      message = error.message || 'Something went wrong!';
    }
  } else {
    // Handle other types of errors (e.g., navigation errors, network errors)
    message = error.message || 'Something went wrong!';
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
