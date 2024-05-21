import { React, useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DataRow from './DataRow'
import { useUser } from '../../utils/UserProvider'
import { defaultUser } from '../../utils/defaultUser'

Axios.defaults.withCredentials = true

// TODO : Handle update for skills and interests
export default function ProfileUpdate() {
    const { userData, setUserData } = useUser()
    const [preSaveUserData, setPreSaveUserData] = useState({ ...userData })

    const navigate = useNavigate()
    const fieldsNotToDisplay = ['notifications', 'matches']

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const response = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}user/profile`)

                if (response.status === 200) {
                    console.log('Profile fetched successfully:', response.data)
                    setUserData({
                        ...userData,
                        ...response.data
                    })
                } else {
                    console.log('Fetch not working')
                }
            } catch (error) {
                if (error.response.status === 400) {
                    console.log('Token is invalid or expired.')
                } else {
                    console.error('Fetching profile failed:', error.response.data)
                }
                setUserData({})
                console.log('Redirecting to login page.')
                setUserData({ ...defaultUser })
                navigate('/user/login')
            }
        }

        handleFetch()
    }, [])


    useEffect(() => {
        console.log('Updated userData:', userData)
        setPreSaveUserData({ ...userData })
    }, [userData])


    const handleClick = async () => {
        setUserData({
            ...userData,
            ...preSaveUserData
        })
        const response = await Axios.put(`${import.meta.env.VITE_BACKEND_URL}user/profile-update`, preSaveUserData)
        console.log(response)
        navigate('/user/profile')
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-10">
                <div className="flex flex-col items-center p-10">

                    <h1 className=" w-full text-right mb-1 text-xl font-medium text-gray-900 dark:text-white">{`@${userData.username.toLowerCase()}`}</h1>

                    <div className="flex flex-col items-center p-5">
                        {Object.keys(userData).map((myKey, itr) => {
                            if (!fieldsNotToDisplay.includes(myKey))
                                return <DataRow
                                    key={itr}
                                    dataType={myKey}
                                    dataVal={userData[myKey]}
                                    preSaveUserData={preSaveUserData}
                                    setPreSaveUserData={setPreSaveUserData}
                                />
                        })}
                    </div>

                    <button onClick={handleClick} className='rounded-lg border-2 border-black min-w-24'>SAVE</button>

                </div>
            </div>
        </div>
    )
}
