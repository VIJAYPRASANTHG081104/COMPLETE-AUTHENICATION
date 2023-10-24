import React, { useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import style from '../styles/Username.module.css'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { resetPasswordValidation } from '../helper/validate'
import { resetPassword } from '../helper/helper'
import { useAuthStore } from '../store/store'
import useFetch from '../hooks/fetch.hook'
const Reset = () => {
  const navigate = useNavigate()
  const { username } = useAuthStore(state => state.auth)
  const [{ isLoading, apiData,status, serverError }] = useFetch('createResetSession')


  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: ''
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const resetPromise = resetPassword({ username, password: values.password })
      toast.promise(resetPromise, {
        loading: 'updating...',
        success: <b>Reset Successfully...!</b>,
        error: <b>Reset is not successfull</b>
      })
      resetPromise.then(function(){navigate('/password')})
    }
  })
  if (isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>
  if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  if(status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>
  return (
    <div className='container mx-auto'>

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex flex-col justify-center items-center h-screen'>
        <div className={style.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Reset</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Enter new password
            </span>
          </div>

          <form className='py-20' onSubmit={formik.handleSubmit}>
            <div className='textbox flex flex-col items-center gap-6'>
              <input {...formik.getFieldProps('password')} className={style.textbox} type='password' placeholder='New Password' />
              <input {...formik.getFieldProps('confirm_password')} className={style.textbox} type='password' placeholder='Confirm Password' />
              <button className={style.btn} type='submit'>SignIn</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Reset