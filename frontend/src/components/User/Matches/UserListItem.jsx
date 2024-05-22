import maleAvatar from '../../../assets/avatar/male-default-avatar.png'

export default function UserListItem({user}) {
    return (
        <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full" src={maleAvatar} alt={`avatar`} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">{`@ ${user.username}`}</p>
                </div>
                {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {user.amount}
                </div> */}
            </div>
        </li>
    )
}