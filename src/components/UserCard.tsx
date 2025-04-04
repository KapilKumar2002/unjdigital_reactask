import React from 'react'
import { User } from '../types/user' // Update the path as needed
import { FiDelete } from 'react-icons/fi'
import { AiFillDelete } from 'react-icons/ai'
import { useAppDispatch } from '../hooks/reduxHooks'
import { deleteUser } from '../app/users/usersSlice'

interface UserCardProps {
  user: User
  onClick: (id: number) => void
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  const dispatch = useAppDispatch()

  const handleDelete = (userId: number) => {
    // Dispatch delete action to remove user from cachedUsers
    dispatch(deleteUser(userId))
  }
  return (
    <div onClick={() => onClick(user.id)} className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <div className='delete-icon' onClick={() => handleDelete}>
      <AiFillDelete />
      </div>
    </div>
  )
}

export default UserCard
