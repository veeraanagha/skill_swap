import {useState, useEffect} from 'react'
import Axios from 'axios'
import UserListItem from './UserListItem'

export default function Matches() {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    async function getMatches() {
      try{
        const response = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}user/matches`)
        if(response.status === 200){
          console.log(response.data)
          setMatches(response.data)
        }
      } catch(err) {
        console.log(`${err.message}`)
      }
    }

    getMatches()
  }, [])

  return (
    <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
      {matches.map((user, index) => (
        <UserListItem key={index} user={user} />
      ))}
    </ul>
  )
}