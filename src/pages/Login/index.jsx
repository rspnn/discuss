import React from 'react';
import './login.css';
import { useDispatch } from 'react-redux';
import useInput from '../../hooks/useInput';
import { asyncSetAuthUser } from '../../states/authUser/action';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h2 className="login-title">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={onEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={onPasswordChange}
        />
        <button
          type="button"
          className="login-button"
          onClick={() => onLogin({ email, password })}
        >
          Login
        </button>
      </form>
      <div className="login-footer">
        <p>
          Belum punya akun?{' '}
          <Link to="/register" className="register-link">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
