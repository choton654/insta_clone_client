import React from 'react';
import { useHistory } from 'react-router-dom';
const ProtectRoute = (Component) => {
  const MustLogin = () => {
    const history = useHistory();
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('jwt');
    if (user === null) {
      history.push('/login');
    }

    return <Component />;
  };
  return MustLogin;
};

export default ProtectRoute;
