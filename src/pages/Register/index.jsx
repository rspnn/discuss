import React from 'react';
import './register.css';
import useInput from '../../hooks/useInput';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../../states/users/action';

const Register = () => {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));

    navigate('/');
  };

  return (
    <div className="register-container">
      <form className="register-form">
        <h2 className="register-title">Register</h2>
        <input
          type="text"
          placeholder="Full Name"
          className="register-input"
          value={name}
          onChange={onNameChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="register-input"
          value={email}
          onChange={onEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="register-input"
          value={password}
          onChange={onPasswordChange}
        />
        <button
          type="button"
          className="register-button"
          onClick={() => onRegister({ name, email, password })}
        >
          Register
        </button>
      </form>

      <div className="register-footer">
        <p>
          Sudah punya akun?{' '}
          <Link to="/login" className="register-link">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
