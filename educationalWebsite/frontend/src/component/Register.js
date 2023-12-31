import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import style from '../styles/Username.module.css'
import toast,{Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import {regiterValidate} from '../helper/validate'
import convertToBase64 from '../helper/convert'
import { registerUser } from '../helper/helper'
const Register = () => {
const navigate  = useNavigate()
  const [file,setfile] = useState()

  const formik = useFormik({
    initialValues:{
      email:'',
      username:'',
      password:'',
    },
    validate:regiterValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async(values) =>{
      values = await Object.assign(values, {profile: file || ''})
      const registerPromise = registerUser(values)
      toast.promise(registerPromise,{
        loading:'Creating...',
        success:<b>Register successfull</b>,
        error:<b>Could not Register</b>
      })
      registerPromise.then(function(){navigate('/')});

    }
  })

  //formik does not support files
  const onUpload = async(e) =>{
    const base64 = await convertToBase64(e.target.files[0]);
    setfile(base64)
  }

  return (
    <div className='container mx-auto'>
      
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex flex-col justify-center items-center h-screen'>
        <div  className={style.glass} style={{height:"99%"}}>
        <div className='title flex flex-col items-center'>
          <h4 className='text-5xl font-bold'>Register</h4>
          <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
            HAppy to join you!
          </span>
        </div>

        <form className='py-1' onSubmit={formik.handleSubmit}>
          <div className='profile flex justify-center py-4'>
              <label htmlFor='profile'>
              <img src={file || avatar} className={style.profile_img} alt='avatar'/>
              </label>
            
            <input onChange={onUpload} type='file' id='profile' name='password'/>
          </div>
          <div className='textbox flex flex-col items-center gap-6'>
            <input {...formik.getFieldProps('email')} className={style.textbox} type='password' placeholder='Email'/>
            <input {...formik.getFieldProps('username')} className={style.textbox} type='text' placeholder='Username'/>
            <input {...formik.getFieldProps('password')} className={style.textbox} type='text' placeholder='Password'/>
            <button className={style.btn} type='submit'>Register</button>
          </div>

          <div className='text-center py-4'>
            <span className='text-gray-500'>Already register<Link className='text-red-500' to={'/login'}> Recovery</Link></span>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Register