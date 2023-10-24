import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import style from '../styles/Username.module.css'
import toast, {Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import {profileValidate} from '../helper/validate'
import convertToBase64 from '../helper/convert'
import useFetch from '../hooks/fetch.hook'
import { updateUser } from '../helper/helper'

const Profile = () => {
  const navigate = useNavigate()
  const [file,setfile] = useState();
  const [{isLoading,apiData,serverError}] = useFetch();

  const formik = useFormik({
    initialValues:{
      firstname: apiData?.firstname||'',
      lastname: apiData?.lastname||'',
      email: apiData?.email||'',
      mobile: apiData?.mobile||'',
      address: apiData?.address||''
    },
    enableReinitialize:true,
    validate:profileValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async(values) =>{
      values = await Object.assign(values, {profile: file || apiData?.profile || ''})
      const updatePromise = updateUser(values)
      toast.promise(updatePromise,{
        loading:'Updating...',
        success:"Updated successfully",
        error:"Not Updated"
      })
    }
  })

  //formik does not support files
  const onUpload = async(e) =>{
    const base64 = await convertToBase64(e.target.files[0]);
    setfile(base64)
  }

  const logout = () =>{
    localStorage.removeItem('TOKEN');
    navigate('/')
  }
  if(isLoading) return<h1 className='text-2xl font-bold'>isLoading</h1>
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  return (
    <div className='container mx-auto'>
      
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex flex-col justify-center items-center h-screen'>
        <div  className={style.glass} style={{height:"99%"}}>
        <div className='title flex flex-col items-center'>
          <h4 className='text-5xl font-bold'>Profile</h4>
          <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
            You can update your profile here!
          </span>
        </div>

        <form className='py-1' onSubmit={formik.handleSubmit}>
          <div className='profile flex justify-center py-4'>
              <label htmlFor='profile'>
              <img src={apiData?.profile || file || avatar} className={style.profile_img} alt='avatar'/>
              </label>
            
            <input onChange={onUpload} type='file' id='profile' name='password'/>
          </div>
          <div className='textbox flex flex-col items-center gap-6'>
            <div className='name flex w-3/4 gap-10'>
            <input {...formik.getFieldProps('firstname')} className={style.textbox} type='text' placeholder='FirstName'/>
            <input {...formik.getFieldProps('lastname')} className={style.textbox} type='text' placeholder='LastName'/>
            </div>
            <div className='name flex w-3/4 gap-10'>
            <input {...formik.getFieldProps('mobile')} className={style.textbox} type='text' placeholder='Mobile'/>
            <input {...formik.getFieldProps('email')} className={style.textbox} type='text' placeholder='Email'/>
            </div>

            <input {...formik.getFieldProps('address')} className={style.textbox} type='text' placeholder='Address'/>
            <button className={style.btn} type='submit'>Update</button>
          </div>

          <div className='text-center py-4'>
            <span className='text-gray-500'>Come back later<button className='text-red-500' onClick={logout}> Logout</button></span>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Profile