import React from 'react';
import { useSelector } from 'react-redux';

const LoadingBar = () => {
  const isLoading = useSelector((state) => state.loadingBar);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '4px',
        background: 'linear-gradient(to right, #4facfe, #00f2fe)',
        animation: 'loading 2s linear forwards',
      }}
    />
  );
};

export default LoadingBar;
