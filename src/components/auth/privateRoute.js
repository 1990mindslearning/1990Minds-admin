import React, { useEffect }  from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector} from 'react-redux'
import {authenticateSelector} from '../../api/authSlice'
const PrivateRoute = ({ component: Component, ...rest }) => {

const {loading, isAuthenticate} = useSelector(authenticateSelector)


 return (
    <Route
      {...rest}
      render={props =>
        
        !loading && !isAuthenticate? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;


