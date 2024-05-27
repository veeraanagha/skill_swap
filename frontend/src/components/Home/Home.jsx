import { useEffect } from 'react'
import GetStartedBtn from './GetStartedBtn'
import { defaultUser } from '../utils/defaultUser'
import Axios from 'axios'
import { useAlert } from '../utils/AlertProvider'
import { checkToken } from '../utils/checkToken'
import { useUser } from '../utils/UserProvider'
import { useLoading } from '../utils/LoadingProvider'
// import SkillSwap from '../../assets/SkillSwap.gif'
import SkillSwap from '../../assets/SkillSwap.jpg'

export default function Home() {
    const { alert, setAlert } = useAlert()
    const { userData, setUserData } = useUser()
    const {setIsLoading} = useLoading()

    useEffect(() => {
        const logoutPrevUser = async () => {
            if (checkToken()) {
                setIsLoading(true)
                await Axios.post(`${import.meta.env.VITE_BACKEND_URL}user/logout`)
                setUserData({ ...defaultUser })
                setAlert({
                    message: "Previous user logged out.",
                    type: 'success'
                })
                console.log("Previous user logged out.")
                setIsLoading(true)
            }
        }

        logoutPrevUser()
    }, [])

return (
    <>
        <div className='space-around flex items-center'>
            {/* <div className='min-w-80 relative'>
                <img src={SkillSwap} className="mix-blend-multiply opacity-95 z-10"/>
            </div> */}
            <div className="container">
                <GetStartedBtn />
            </div>
        </div>
    </>
)
}