import React from 'react'
import { User } from '../types/user' // Update the path as needed

interface UserCardProps {
  user: User
  onClick: (id: number) => void
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <div onClick={() => onClick(user.id)} className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  )
}

export default UserCard
