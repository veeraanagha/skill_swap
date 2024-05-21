import UserProfileCard from "./UserProfileCard";
import Axios from 'axios'
import { defaultUser } from "../utils/defaultUser";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

Axios.defaults.withCredentials = true

export default function Swipe() {
    const [currProfile, setCurrProfile] = useState({ ...defaultUser })
    const [potentials, setPotentials] = useState([])
    const [index, setIndex] = useState(-1)
    const navigate = useNavigate()

    function showNext() {
        console.log(`index = ${index}, list length = ${potentials.length}`)
        console.log("Show next :")
        if (potentials.length === 0) {
            console.log("Potential matches list is empty.")
            setCurrProfile(defaultUser)
        }
        else if(index+1 === potentials.length){
            console.log("Reached end of list.")
            setIndex(-1)
            setCurrProfile(defaultUser)
        }
        else {
            console.log(`Setting card to next profile : ${potentials[index+1].username}`)
            setCurrProfile(potentials[index + 1])
            setIndex(index + 1)
        }
    }

    useEffect(() => {
        async function handleFetch() {
            try {
                const response = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}swipe`)

                if (response.status === 200) {
                    console.log("response data : ", response.data)
                    setPotentials(response.data.potentialMatchesBySkills)
                }
                else if (response.status === 300) {
                    console.log('Redirecting to login page.')
                    navigate('/user/login')
                }
                else {
                    console.log(response.status, ' Error fetching potential matches.')
                }
            } catch (err) {
                console.error('Fetching profile failed :', err.message)
            }
        }

        handleFetch()
    }, [])


    useEffect(() => {
        console.log("Potentials updated : ", potentials)
        showNext()
    }, [potentials])


    return (
        <div className="flex items-center justify-center">
            <UserProfileCard currProfile={currProfile} showNext={showNext} />
        </div>
    )
}