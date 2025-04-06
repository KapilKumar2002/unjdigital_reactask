import React, { useEffect, useRef, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchUsers } from '../../app/users/usersThunk'
import { searchUsers } from '../../app/users/usersSlice'
import './users_style.css'
import UserCard from '../../components/UserCard'
import LoadMore from '../../components/loader/LoadMore'
import { FaSearch } from 'react-icons/fa'

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { filteredUsers, cachedUsers, status, page, hasMore } = useAppSelector((state) => state.users)

  const loaderRef = useRef<HTMLDivElement | null>(null)

  const handleUserClick = (id: number) => {
    navigate(`/user/${id}`)
  }

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && status !== 'loading' && hasMore) {
        dispatch(fetchUsers(page))
      }
    },
    [dispatch, page, hasMore, status]
  )

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    }

    const observer = new IntersectionObserver(handleObserver, option)
    if (loaderRef.current) observer.observe(loaderRef.current)

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current)
    }
  }, [handleObserver])

  useEffect(() => {
    if (cachedUsers.length === 0) {
      dispatch(fetchUsers(1))
    }
  }, [dispatch, cachedUsers.length])

  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    dispatch(searchUsers(query))
  }

  return (
    <div className="container">
      <div className='search-input'>
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchQuery}
        onChange={handleSearchChange}
        className=""
      />
      <FaSearch />
      </div>

      <div className="users-list">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} onClick={handleUserClick} />
        ))}
      </div>

      {hasMore && (
        <div ref={loaderRef} className="load-more">
          {status === 'loading' && <LoadMore />}
        </div>
      )}
    </div>
  )
}

export default HomePage
