import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import SummaryApi from '../common';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    const [menuDisplay, setMenuDisplay] = useState(false)
    const context = useContext(Context)
    const navigate = useNavigate()
    const searchInput = useLocation()
    const URLSearch = new URLSearchParams(searchInput?.search)
    const searchQuery = URLSearch.getAll("q")
    const [search, setSearch] = useState(searchQuery)

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: 'include'
        })

        const data = await fetchData.json()

        if (data.success) {
            toast.success(data.message)
            dispatch(setUserDetails(null))
            navigate('/')
        }

        if (data.error) {
            toast.error(data.message)
        }
    }

    const handleSearch = (e) => {
        const { value } = e.target
        setSearch(value)

        if (value) {
            navigate(`/search?q=${value}`)
        } else {
            navigate("/search")
        }
    }

    return (
        <header className='h-14 shadow-md bg-white fixed w-full z-40'>
            <div className='h-full container mx-auto flex items-center px-8 justify-between'>
                <div>
                    <Link to={"/"}>
                        <Logo w={120} h={50} />
                    </Link>
                </div>

                <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within-shadow-md pl-2'>
                    <input type="text" placeholder='Tìm kiếm sản phẩm ở đây....' className='w-full outline-none' onChange={handleSearch} value={search} />
                    <div className='text-lg min-w-[50px] h-8 bg-blue-500 flex items-center justify-center rounded-md text-white cursor-pointer rounded-r-full hover:bg-red-800'>
                        <FaSearch />
                    </div>
                </div>

                <div className='flex items-center gap-7'>

                    <div className='relative flex items-center gap-2 cursor-pointer' onClick={() => setMenuDisplay(preve => !preve)}>
                        {
                            user?._id && (
                                <>
                                    {
                                        user?.profilePic ? (
                                            <img
                                                src={user.profilePic}
                                                alt={user?.name}
                                                className="w-10 h-10 rounded-full"
                                            />
                                        ) : (
                                            <FaUser className='text-3xl' />
                                        )
                                    }
                                    <span className="text-base text-black">{user?.name}</span>
                                </>
                            )
                        }

                        {
                            menuDisplay && (
                                <div className='absolute p-2 top-12 bottom-0 h-fit bg-white shadow-md rounded'>
                                    <nav>
                                        {
                                            user?.role === ROLE.ADMIN && (
                                                <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hover:bg-slate-300 p-2 block' onClick={() => setMenuDisplay(preve => !preve)}>Bảng điều khiển Admin</Link>
                                            )
                                        }
                                    </nav>
                                </div>
                            )
                        }
                    </div>

                    {
                        user?._id && (
                            <Link to={"/cart"} className='text-2xl relative'>
                                <span><FaShoppingCart /></span>
                                <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-2'>
                                    <p className='text-sm'>{context?.cartProductCount}</p>
                                </div>
                            </Link>
                        )
                    }

                    <div>
                        {
                            user?._id ? (
                                <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Đăng xuất</button>
                            ) : (
                                <Link to={"/login"} className='bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-800'>Đăng nhập</Link>
                            )
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
