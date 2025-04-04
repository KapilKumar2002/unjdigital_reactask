import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { User } from '../../types/user'
import { clearUser, fetchUserById } from '../../app/userById/userByIdThunk'
import { updateUser } from '../../app/users/usersSlice'


const EditUser = () => {
  const { id } = useParams()
  const userId = Number(id)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { user, loading, error } = useAppSelector((state) => state.userById)

  // Local state to handle user edits, now including `id` in the form data
  const [formData, setFormData] = useState<User>({
    id: 0, // Default value
    name: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId)) // Fetch user details when the component mounts
    }

    return () => {
      dispatch(clearUser()) // Clean up when component unmounts
    }
  }, [userId, dispatch])

  useEffect(() => {
    if (user) {
      // Pre-fill the form with the current user's data, including `id`
      setFormData({
        id: user.id, // Set the id here
        name: user.name,
        email: user.email,
        phone: user.phone,
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSave = () => {
    // Create updatedUser object, ensuring it's of type User
    const updatedUser: User = { ...formData }
    dispatch(updateUser(updatedUser)) // Dispatch with typed payload (User)
    navigate(`/users/${userId}`) // Redirect to user detail page after saving
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!user) return <p>User not found in cached data.</p>

  return (
    <div>
      <h2>Edit User</h2>
      <form>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <label>Address:</label>
        
        <button type="button" onClick={handleSave}>Save</button>
      </form>
    </div>
  )
}

export default EditUser
