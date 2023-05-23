import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const { signIn, passwordReset, googleSignIn } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        setError('');
        setSuccess('');

        signIn(email, password)
            .then(result => {
                setSuccess('Logged in successfully.');
                form.reset();
                navigate(from, { replace: true })
            })
            .catch(error => {
                setError(error.message);
            })
    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        passwordReset(email)
            .then(result => {
                alert('Password reset email sent.');
            })
            .catch(error => {
                setError(error.message);
            })
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                setSuccess('Google sign in successful.');
            })
            .catch(error => {
                setError(error.message);
            })
    }
    return (
        <div>
            <h3 className='text-xl text-center font-semibold mt-8 mb-3'>Login</h3>
            <form onSubmit={handleLogin} className='m-0 mx-auto flex flex-col justify-center items-center'>
                <input
                    type="email"
                    placeholder="Email"
                    name='email'
                    ref={emailRef}
                    className="input input-bordered input-md w-full max-w-xs block"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    name='password'
                    className="input input-bordered input-md w-full max-w-xs block my-3"
                    required
                />
                <input
                    className="btn btn-warning mt-3 input input-bordered input-md w-full max-w-xs"
                    type="submit"
                    value="Login"
                />
            </form>
            <p onClick={handleForgetPassword} className='my-1 text-center cursor-pointer'><small>Forgotten Password?</small></p>
            <p className='text-center'><small>
                Don't have an account? <Link className='text-yellow-500 underline' to="/signup">Create an account</Link>
            </small></p>
            <p className='my-4 text-center'>Or</p>
            <button
                onClick={handleGoogleSignIn}
                className='flex items-center justify-around mx-auto border px-16 py-3 rounded-md'>
                <FcGoogle className='mr-2 text-xl' />
                <span>Continue with Google</span>
            </button>
            <p className='text-rose-500 text-center mt-2'>{error}</p>
            <p className='text-green-500 text-center mt-2'>{success}</p>
        </div>
    );
};

export default Login;