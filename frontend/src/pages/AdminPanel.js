import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaUser } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';



const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()


    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
            navigate("/")
        }
    },[user])
    

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>

        <aside className='bg-white min-h-full  w-full  max-w-60 customShadow'>
                <div className='h-32 flex justify-center items-center flex-col'>
                    <div className=' text-5xl corsor-pointer relative flex justify-center' style={{ marginTop: '1cm' }}>
                        {
                            user?.profilePic ? (
                                <img
                                    src={user.profilePic} // Dữ liệu Base64 đã bao gồm tiền tố "data:image/jpeg;base64,"
                                    alt={user?.name}
                                    className="w-20 h-20 rounded-full"
                                />
                            ) : (
                                <FaUser />
                            )
                        }
                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm font-semibold'>({user?.role})</p>
                </div>

                {/***navigation */} 
                <div>
                    <nav className='grid p-4'>
                        <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-200 font-semibold'>Tất cả người dùng</Link>
                        <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-200 font-semibold'>Tất cả sản phẩm</Link>
                    </nav>
                </div>
        </aside>

        <main className='w-full h-full p-2'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel