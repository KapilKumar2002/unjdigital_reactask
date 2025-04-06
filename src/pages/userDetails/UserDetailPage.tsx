// pages/UserDetails.tsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { clearUser, fetchUserById } from "../../app/userById/userByIdThunk";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import "./user-detail-style.css";
import { FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
const UserDetailPage = () => {
  const { id } = useParams();
  const userId = Number(id);
  const dispatch = useAppDispatch();

  // Get user from userByIdSlice state (this will be from cached users in localStorage)
  const { user, loading, error } = useAppSelector((state) => state.userById);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId)); // Dispatch to simulate API call and get data from localStorage
    }

    return () => {
      dispatch(clearUser()); // Clear user data when component unmounts
    };
  }, [userId, dispatch]);



  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>User not found in cached data.</p>;

  return (
    <div className="user-info">
      <div className="user-info-card">
        <div className="identity">
          <FaUser className="user-icon" />
          <Link to={`/edit-user/${userId}`} className="edit-button" >Edit Me</Link>
        </div>
        <div className="personal-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.phone}</p>
         {user.address && <p>{user.address}</p>}
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
