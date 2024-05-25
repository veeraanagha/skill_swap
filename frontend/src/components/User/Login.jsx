import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageHeading from '../utils/PageHeading';
import { useUser } from '../utils/UserProvider'
import { useAlert } from '../utils/AlertProvider';
import { defaultUser } from '../utils/defaultUser';

Axios.defaults.withCredentials = true;


const Login = () => {
    const { userData, setUserData } = useUser({...defaultUser})
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { alert, setAlert } = useAlert()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}user/login`, {
                email: email,
                password: password,
            })

            if (response.status === 200) {
                console.log('Logged in successfully.', response.data)
                setAlert({
                    message: 'Logged in successfully.',
                    type: 'success'
                })
                setUserData({...defaultUser, ...response.data})
                navigate("/user/profile")
            } else if (response.status === 401) {
                setAlert({
                    message: "Wrong email or password."
                })
            } else {
                console.log("Redirect not working!")
                setAlert({
                    message: "Couldn't redirect to login page."
                })
            }


        } catch (error) {
            console.error('Login failed', error.response.data)
            setAlert({
                message: 'Login failed, please retry !'
            })
        }
    };

    return (
        <form className="min-w-96 max-w-sm mx-auto py-10">

            <PageHeading>Login</PageHeading>

            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                </label>
                <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-5">
                <label htmlFor="password" aria-autocomplete='' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your password
                </label>
                <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div className="flex items-start mb-5">
                <Link to="/user/register" className="underline ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Sign up!
                </Link>
            </div>

            <button
                onClick={handleSubmit}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Submit
            </button>
        </form>
    );
};

export default Login
