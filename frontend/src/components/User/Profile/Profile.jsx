import { React, useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DataRow from './DataRow'
import { useUser } from '../../utils/UserProvider'

Axios.defaults.withCredentials = true


export default function Profile() {
    const { userData, setUserData } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        const handleFetch = async () => {
            try {
                console.log(userData)
                
                const response = await Axios.post('http://localhost:3000/user/profile')

                if (response.status === 200) {
                    console.log('Profile fetched successfully:', response.data)
                    setUserData({
                        ...userData,
                        ...response.data
                    })
                    console.log(userData)
                } else {
                    console.log('Fetch not working')
                }
            } catch (error) {
                if (error.response.status === 401) {
                    console.log('Token is invalid or expired')
                    navigate('/user/login');
                } else {
                    console.error('Fetching profile failed:', error.response.data)
                }
            }
        }

        handleFetch()
    }, [])

    function handleEdit() {
        navigate('/user/profile-update')
    }

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col bg-white dark:bg-sky-600 w-96 min-h-72 relative shadow-lg mt-10">
                <h1 className="text-right font-bold text-3xl p-3">skillswap</h1>
                <button onClick={handleEdit}>Edit</button>

                <div className="flex flex-col py-3 px-10 text-lg">
                    {Object.keys(userData).map((myKey, itr) => <DataRow key={itr} dataType={myKey} dataVal={userData[myKey]} />)}
                </div>
            </div>
        </div>
    )
}
