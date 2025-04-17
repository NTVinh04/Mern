import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa"
import loginIcons from '../assest/user.jpg'
import imageTobase64 from '../helpers/imageTobase64'
import SummaryApi from '../common'
import { toast } from 'react-toastify'

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)

    const [showConfirmPassword,setShowConfirmPassword] = useState(false)

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: "",
      })
    
      const navigate = useNavigate()

      const handleOnChange = (e) => {
        const { name, value } = e.target
    
        setData((preve)=>{
          return{
            ...preve,
            [name] : value
          }
        })
      }


      const handleUploadPic = async (e) => {
        const file = e.target.files[0]

        const imagePic = await imageTobase64(file);

        setData((preve) => {
            return {
                ...preve,
                profilePic : imagePic
            };
        });
      }
    

      const handleSubmit = async(e) => {
        e.preventDefault()

        if(data.password === data.confirmPassword){

          const dataResponse = await fetch(SummaryApi.signUp.url,{
            method : SummaryApi.signUp.method,
            headers : {
              "content-type" : "application/json"
            },
            body : JSON.stringify(data)
          })
  
          const dataApi = await dataResponse.json()
  
          if(dataApi.success){
            toast.success(dataApi.message)
            navigate("/login")
          }

          if(dataApi.error){
            toast.error(dataApi.message)
          }

        }else{
          toast.error("Mật khẩu không khớp")
        }
      }
        
    
      console.log("data login", data)
  return (
<section id="signup" className=' mx-auto container p-4 flex items-center justify-center'>
        <div className='w-full max-w-sm p-8 border border-gray-400 rounded-lg shadow-md'>

                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                  <div>
                    <img src={data.profilePic || loginIcons} alt='login icon'/>
                  </div>

                  <form>
                    <label>
                      <div className='text-xs bg-opacity-80 bg-slate-200 pb-5 pt-1 cursor-pointer text-center absolute bottom-0 w-full'>
                        Upload Photo
                      </div>
                        <input type = 'file' className='hidden' onChange={handleUploadPic}/>
                    </label>
                  </form>
                </div>
                
            <h1 className='text-2xl font-semibold text-center mb-6'>Đăng ký tài khoản</h1>
            <form action="" className='flex flex-col gap-2' onSubmit={handleSubmit}>

            <div className='grid'>
              <div className="flex flex-col">
                <label className="text-sm font-medium">Tên</label>
                  <input 
                    type="name" 
                    placeholder='Nhập tên' 
                    name='name'
                    value={data.name}
                    onChange={handleOnChange}
                    className='border border-gray-300 p-2 rounded' required/>
              </div>
            </div>

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
                                {showPassword ? (<FaEyeSlash />) : (<FaEye />)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='grid'>
                <div className="flex flex-col relative">
                    <label className="text-sm font-medium">Nhập lại mật khẩu</label>
                    <div className="relative">
                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder='Nhập mật khẩu' 
                            name='confirmPassword'
                            value={data.confirmPassword} 
                            onChange={handleOnChange}
                            minLength={6}
                            className='border border-gray-300 p-2 rounded pr-10 w-full' required />
                        <div 
                            className='absolute inset-y-0 right-2 flex items-center cursor-pointer text-xl'
                            onClick={() => setShowConfirmPassword((preve)=>!preve)}
                        >
                            <span>
                                {showConfirmPassword ? (<FaEyeSlash />) : (<FaEye />)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
              <Link to={'/login'} className='text-sm text-center'>Bạn đã có tài khoản? <span className='text-blue-500 hover:underline'>Đăng nhập</span></Link>
              <button type="submit" className='bg-red-500 text-white py-2 rounded hover:bg-red-800'>Đăng ký</button>
            </form>
        </div>
    </section>
  )
}

export default SignUp