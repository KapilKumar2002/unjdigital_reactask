import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { User } from '../../types/user'
import { clearUser, fetchUserById } from '../../app/userById/userByIdThunk'
import { createUser, updateUser } from '../../app/users/usersSlice'
import "./form-style.css"
import { ToastContainer, toast } from 'react-toastify';
import notify from '../../components/customToast'

const EditUserPage = () => {
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
    address: '',
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
    if (id && user) {
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



  const handleUpdateUser = () => {
    // Create updatedUser object, ensuring it's of type User
    const updatedUser: User = { ...formData }
    dispatch(updateUser(updatedUser)) // Dispatch with typed payload (User)
    notify("User has been updated!")
    navigate(`/user/${userId}`) // Redirect to user detail page after saving
  }
  const handleCreateUser = () => {
    const now = new Date();
    const id: number = now.getMilliseconds();
    const newUser: User = { ...formData, id }
    dispatch(createUser(newUser)) // Dispatch with typed payload (User)
    notify("User has been created!")
    navigate(`/`) // Redirect to user detail page after saving
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  // if (!user) return <p>User not found in cached data.</p>

  return (
    <div className='container'>
      <form className='react-form'>
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
        {id == null && <>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          /></>}
        <button type="button" onClick={user ? handleUpdateUser : handleCreateUser}>{id ? "Update" : "Create"} User</button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default EditUserPage
