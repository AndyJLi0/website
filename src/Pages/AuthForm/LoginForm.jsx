import { React, useState, } from 'react';
import './AuthForm.css'
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { login } from '../../Services/auth.js';
import useAuth from '../../hooks/useAuth.js';
import useRecovery from '../../hooks/useRecovery.js';
import { Password } from '@mui/icons-material';


const LoginForm = () => {
  const { setAuth } = useAuth();
  const { recoveryState, setRecoveryState } = useRecovery();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState(recoveryState?.email);
  const [pwd, setPwd] = useState('');

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPwd, setInvalidPwd] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await login(email, pwd);
      let accessToken = response.access_token;
      let accessTokenDecoded = jwtDecode(accessToken); // decode access token
      
      setInvalidEmail(false);
      setInvalidPwd(false);

      setAuth({ access_token: accessToken, user_info: accessTokenDecoded?.UserInfo });
      navigate(from, { replace: true });
      
      // delete all info related to access token
      response = null;
      accessToken = null;
      accessTokenDecoded = null;
    } catch (e) {
      console.error("An error occurred:", e);
      if (e.message === "Email not found") { // if given credentials don't match any in the database
        setInvalidEmail(true);
        setPwd('');
      } 
      if (e.message === "Incorrect Password") { // if given credentials don't match the one in the system
        setInvalidEmail(false);
        setInvalidPwd(true);
        setPwd('');
      }
    }
  }

  return (
    <div>
      <div className="wrapper">
        <form className='auth-form' onSubmit={handleSubmit}>
          <h1>Login</h1>
          {invalidEmail ? (
            <p className="auth-error-msg top">No associated account with that email, sign up <Link className={"link login"} to="/signup">here</Link>.</p>
          ) : (invalidPwd ? (
            <p className="auth-error-msg top">That email and password combination is incorrect.</p>
          ) : (null))}
          <div className="input-box">
            <input
              className={(invalidEmail || invalidPwd) ? "auth-input error" : "auth-input"}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <IoMdMail className="icon" />
          </div>
          <div className="input-box">
            <input
              className={invalidPwd ? "auth-input error" : "auth-input"}
              type="password"
              placeholder="Password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            <FaLock className="icon" />
          </div>

          <div className='forgot-password'>
            <button type="button" onClick={() => { setRecoveryState({ page: "recover", email: email }) }}>Forgot Password?</button>
          </div>

          <button className="auth-button" type="submit">Login</button>
        </form>
        <div className="register-link">
          <p>Don't have an account?&nbsp;
            <Link to="/signup">
              <button>Register</button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;