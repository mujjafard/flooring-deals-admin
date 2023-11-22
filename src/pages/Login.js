import React, { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from "antd";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(34, email, password)
    axios.post("http://174.138.112.6/api/admin/signin", {
      email: email,
      password: password,
    })
      .then((res) => {
        const response = res.data
        navigate("admin")
        toast.success('Login successful!');
      })
      .catch((err) =>
        toast.error('Login failed. Please check your email and password.')
      )

  };

  return (
    <div className="">
      <br />
      <br />
      <br />
      <br />
      <br />
      <div class="container mt-5 ">
        <div class="row justify-content-center ">
          <div class="col-md-6 form-card">
            <div class="card cardform p-3">
              <div class="card-header bg-white">
                <h2 class="text-center">Login</h2>
                <p className="text-center">Login to your account to continue.</p>
              </div>

              <div class="card-body">
                <form>
                  <div class="form-floating mb-3">
                    <input type="email" class="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
                    <label for="floatingInput">Email address</label>
                  </div>

                  <div class="form-floating">
                    <input type="password" class="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <label for="floatingPassword">Password</label>
                  </div>

                  <div className="mb-3 text-end">
                    <Link to="forgot-password" className="">
                      Forgot Password?
                    </Link>
                  </div>

                  <button
                    className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                    style={{ background: "#e67929" }}
                    onClick={(e) => handleLogin(e)}
                  >
                    Login
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
