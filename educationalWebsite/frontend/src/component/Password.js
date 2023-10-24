import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import style from '../styles/Username.module.css'
import toast,{Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import {PasswordValidate} from '../helper/validate'
import useFetch from '../hooks/fetch.hook'
import { useAuthStore } from '../store/store'
import { verifyPassword } from '../helper/helper'

const Password = () => {
const navigate = useNavigate()
  const {username} = useAuthStore(state => state.auth)
  // console.log(username)
  const [{isLoading,apiData,serverError}] = useFetch(`/user/${username}`)
  console.log(serverError)
  const formik = useFormik({
    initialValues:{
      password:''
    },
    validate:PasswordValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async values =>{
      const loginPromise = verifyPassword({username,password:values.password})
      toast.promise(loginPromise,{
        loading: "Checking...",
        success: <b>Login successfully..</b>,
        error:<b>Passsword does not match</b>
      })
      loginPromise.then(res=>{
        const {token} = res.data;
        localStorage.setItem('TOKEN',token);
        navigate('/profile')
      })
    }
  })
  if(isLoading) return<h1 className='text-2xl font-bold'>isLoading</h1>
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  return (
    <div className='container mx-auto'>
      
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex flex-col justify-center items-center h-screen'>
        <div  className={style.glass}>
        <div className='title flex flex-col items-center'>
          <h4 className='text-5xl font-bold'>Hello {apiData?.firstName || apiData?.username}</h4>
          <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
            Expore More by connecting with us
          </span>
        </div>

        <form className='py-1' onSubmit={formik.handleSubmit}>
          <div className='profile flex justify-center py-4'>
              <img src={apiData?.profile || avatar} className={style.profile_img} alt='avatar'/>
          </div>
          <div className='textbox flex flex-col items-center gap-6'>
            <input {...formik.getFieldProps('password')} className={style.textbox} type='password' placeholder='Password'/>
            <button className={style.btn} type='submit'>SignIn</button>
          </div>

          <div className='text-center py-4'>
            <span className='text-gray-500'>Forgot password<Link className='text-red-500' to={'/recovery'}> Recovery</Link></span>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Password