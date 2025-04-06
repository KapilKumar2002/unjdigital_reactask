import { Link, useLocation } from "react-router-dom"
import "./header-style.css"
import routes from "../../routes/routePaths"

const Header = () => {
    const location = useLocation();
    const isEditUserPage = location.pathname.includes("edit-user") || location.pathname.includes("add-user");

  return  (
    <header className='header'>
        <h1 className="logo">ReacTask</h1>
        {!isEditUserPage && <Link to={routes.createUser} className='create-button'>
            Create User
        </Link>}
    </header>
  )
}

export default Header