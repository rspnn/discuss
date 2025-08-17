import React from 'react';
import PropTypes from 'prop-types';
import { LuChartColumn, LuHouse, LuLogOut } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ authUser, signOut }) => {
  return (
    <div>
      <nav>
        <h1 className="logo">Discuss</h1>
        <ul className="nav-links">
          <li>
            <Link to="/">
              <LuHouse color="white" size={25} />
              Threads
            </Link>
          </li>
          <li>
            <Link to="/leaderboards">
              <LuChartColumn color="white" size={25} />
              Leaderboards
            </Link>
          </li>
          <li>
            {authUser ? (
              <button className="sign-out" onClick={signOut}>
                <LuLogOut color="white" size={25} />
                Sign Out
              </button>
            ) : (
              <Link to="/login">
                <LuLogOut color="white" size={25} />
                Sign In
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

const authUserShape = {
  avatar: PropTypes.string,
  email: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Navbar.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navbar;
