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
        else if(response.status === 201) {
          setMatches([])
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
      <div className='max-w-xl flex flex-col my-5'>
        <PageHeading>Matches</PageHeading>
        <div className="w-full min-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5 p-5 overflow-hidden">
          <ul className="min-w-96 divide-y divide-gray-200 dark:divide-gray-700">
            {matches.length > 0 ? (
              matches.map((user, index) => (
                <UserListItem key={index} user={user} />
              ))
            ) : (
              <li className="text-center text-gray-500 dark:text-gray-400 py-4">No matches yet  : (</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}