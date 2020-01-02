import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({context}) => {
  // user context signout function
  context.actions.signOut();

  return (
    <Redirect to="/signin" />
  );
}
