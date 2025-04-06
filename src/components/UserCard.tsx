import React from 'react'
import { User } from '../types/user'
import { useAppDispatch } from '../hooks/reduxHooks'
import { deleteUser } from '../app/users/usersSlice'

interface UserCardProps {
  user: User
  onClick: (id: number) => void
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  const dispatch = useAppDispatch()

  const handleDelete = (e: React.MouseEvent, userId: number) => {
    e.stopPropagation()
    dispatch(deleteUser(userId))
  }

  return (
    <div 
      onClick={() => onClick(user.id)} 
      className="user-card"
    >
      <div className="">
        <div>
          <h3 className="">{user.name}</h3>
          <p className="">{user.email}</p>
        </div>
        
      </div>
    </div>
  )
}

export default UserCard
