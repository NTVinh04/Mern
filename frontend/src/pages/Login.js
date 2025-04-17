import React, { useContext, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { FaEye } from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa"
import loginIcons from '../assest/user.jpg'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import Context from '../context'


const Login = () => {
  const [showPassword,setShowPassword] = useState(false)
  const [data,setData] = useState({
      email : "",
      password : ""
  })

  const navigate = useNavigate()
  const { fetchUserDetails, fetchUserAddToCart} = useContext(Context)

  const handleOnChange = (e) =>{
      const { name , value } = e.target

      setData((preve)=>{
          return{
              ...preve,
              [name] : value
          }
      })
  }


  const handleSubmit = async(e) =>{
      e.preventDefault()

      const dataResponse = await fetch(SummaryApi.signIn.url,{
          method : SummaryApi.signIn.method,
          credentials : 'include',
          headers : {
              "content-type" : "application/json"
          },
          body : JSON.stringify(data)
      })

      const dataApi = await dataResponse.json()

      if(dataApi.success){
          toast.success(dataApi.message)
          navigate('/')
          fetchUserDetails()
          fetchUserAddToCart()


      }

      if(dataApi.error){
          toast.error(dataApi.message)
      }

  }

  console.log("data login",data)
  
  return (
    <section id="login" className='mx-auto container p-4 flex items-center justify-center'>
        <div className='w-full max-w-sm p-8 border border-gray-400 rounded-lg shadow-md'>
          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt='login icon'/>
          </div>
            <h1 className='text-2xl font-semibold text-center mb-6'>Đăng nhập</h1>
            <form action="" className='flex flex-col gap-2' onSubmit={handleSubmit}>

            <div className='grid'>
              <div className="flex flex-col">
                <label className="text-sm font-medium">Email</label>
                  <input 
                    type="email" 
                    placeholder='Nhập tên@gmail.com' 
                    name='email'
                    value={data.email}
                    onChange={handleOnChange}
                    className='border border-gray-300 p-2 rounded' required/>
              </div>
            </div>  

            <div className='grid'>
              <div className="flex flex-col relative">
                <label className="text-sm font-medium">Mật khẩu</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder='Nhập mật khẩu' 
                    name='password'
                    value={data.password} 
                    onChange={handleOnChange}
                    minLength={6}
                    className='border border-gray-300 p-2 rounded pr-10 w-full' required/>
                  <div 
                    className='absolute inset-y-0 right-2 flex items-center cursor-pointer text-xl'
                    onClick={() => setShowPassword((preve)=>!preve)}
                  >
                    <span>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </div>
            </div>

              <Link to={'/sign-up'} className='text-sm text-center'>Bạn chưa có tài khoản? <span className='text-blue-500 hover:underline'>Đăng ký</span></Link>
              <button type="submit" className='bg-red-500 text-white py-2 rounded hover:bg-red-800'>Đăng nhập</button>
            </form>
        </div>
    </section>
  )
}

export default Login