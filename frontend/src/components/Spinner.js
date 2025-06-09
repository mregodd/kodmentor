import React, { useContext } from 'react';
import { LoadingContext } from '../contexts/LoadingContext';

const Spinner = () => {
  const { loading } = useContext(LoadingContext);
  return loading ? (
    <div className="spinner-container">
      <div className="lds-dual-ring"></div>
    </div>
  ) : null;
};

export default Spinner;
