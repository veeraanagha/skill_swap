import { useEffect } from 'react'
import GetStartedBtn from './GetStartedBtn'
import { defaultUser } from '../utils/defaultUser'
import Axios from 'axios'
import { useAlert } from '../utils/AlertProvider'
import { checkToken } from '../utils/checkToken'
import { useUser } from '../utils/UserProvider'
import { useLoading } from '../utils/LoadingProvider'
import MainHeading from './MainHeading'
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
                const response = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}user/logout`)
                if(response === 200) {
                    setUserData({ ...defaultUser })
                    setAlert({
                        message: "Previous user logged out.",
                        type: 'success'
                    })
                    console.log("Previous user logged out.")
                }
                setIsLoading(false)
            }
        }

        logoutPrevUser()
    }, [])

return (
    <>
        <div className='w-full justify-center flex items-center flex-col sm:flex-row'>
            <div>
                <MainHeading />
            </div>
            <div>
                <GetStartedBtn />
            </div>
        </div>
    </>
)
}