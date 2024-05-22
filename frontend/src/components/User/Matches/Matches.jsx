import { useState, useEffect } from 'react'
import Axios from 'axios'
import UserListItem from './UserListItem'
import { useAlert } from '../../utils/AlertProvider'
import PageHeading from '../../utils/PageHeading'

export default function Matches() {
  const [matches, setMatches] = useState([])
  const { alert, setAlert } = useAlert()

  useEffect(() => {
    async function getMatches() {
      try {
        const response = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}user/matches`)
        if (response.status === 200) {
          console.log(response.data)
          setAlert({
            message: "Fetch successful.",
            type: "success"
          })
          setMatches(response.data)
        }
      } catch (err) {
        console.log(`${err.message}`)
        setAlert({
          message: "Error fetching matches."
        })
      }
    }

    getMatches()
  }, [])

  return (
    <div className='flex item-center justify-center w-full'>
      <div className='max-w-96 flex flex-col'>
        <PageHeading>Matches</PageHeading>
        <ul className="min-w-96 divide-y divide-gray-200 dark:divide-gray-700">
          {matches.map((user, index) => (
            <UserListItem key={index} user={user} />
          ))}
        </ul>
      </div>
    </div>
  )
}