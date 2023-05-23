import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const SignUp = () => {
    const { createUser, emailVerification, googleSignIn } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        // console.log(firstName, lastName, email, password, confirmPassword);

        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Password did not match, try again.');
            return;
        }
        else if (!/(?=.*[A-Z])/.test(password)) {
            setError('Password should include at least one capital letter.');
            return;
        }
        else if (!/(?=.*[0-9])/.test(password)) {
            setError('Password should include at least one digit.');
            return;
        }
        else if (!/(?=.*[!@#$%^&*])/.test(password)) {
            setError('Password should include at least one special character.');
            return;
        }
        else if (password.length < 8) {
            setError('Password should be at least 8 character long.');
            return;
        }

        createUser(email, password)
            .then(result => {
                const createdUser = result.user;
                // console.log(createdUser);
                emailVerification(createdUser);
                alert('Verification email sent.');
                setSuccess('User has been created successfully.');
                form.reset();
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
            <h3 className='text-xl text-center font-semibold mt-4 mb-3'>Create an account</h3>
            <form onSubmit={handleSignUp} className='m-0 mx-auto flex flex-col justify-center items-center'>
                <input
                    type="text"
                    placeholder="First Name"
                    name='firstName'
                    className="input input-bordered input-md w-full max-w-xs block"
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    name='lastName'
                    className="input input-bordered input-md w-full max-w-xs block my-3"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    name='email'
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
                    type="password"
                    name='confirmPassword'
                    placeholder="Confirm Password"
                    className="input input-bordered input-md w-full max-w-xs block"
                    required
                />
                <input
                    className="btn btn-warning mt-3 input input-bordered input-md w-full max-w-xs"
                    type="submit"
                    value="Sign Up"
                />
            </form>
            <p className='text-center my-3'><small>
                Already have an account? <Link className='text-yellow-500 underline' to="/login">Login</Link>
            </small></p>
            <button
                onClick={handleGoogleSignIn}
                className='flex items-center justify-around mx-auto border px-16 py-3 rounded-md'
            >
                <FcGoogle className='mr-2 text-xl' />
                <span>Continue with Google</span>
            </button>
            <p className='text-rose-500 text-center mt-2'>{error}</p>
            <p className='text-green-500 text-center mt-2'>{success}</p>
        </div>
    );
};

export default SignUp;