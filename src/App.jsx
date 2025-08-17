import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Leaderboards from './pages/Leaderboards';
import Login from './pages/Login';
import Register from './pages/Register';
import ThreadDetail from './pages/ThreadDetail';
import AddThread from './pages/AddThread';
import NotFound from './pages/NotFound';
import LoadingBar from './components/LoadingBar';

import './global.css';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';

function App() {
  const { isPreload, authUser } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  return (
    <>
      <Router>
        <LoadingBar />
        <Navbar authUser={authUser} signOut={onSignOut} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/threads/:id" element={<ThreadDetail />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          {authUser && <Route path="/new" element={<AddThread />} />}
        </Routes>
      </Router>
    </>
  );
}

export default App;
