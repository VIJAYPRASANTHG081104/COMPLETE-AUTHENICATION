import React, { useEffect, useState } from 'react'
import style from '../styles/Username.module.css'
import toast, { Toaster } from 'react-hot-toast'
import { useAuthStore } from '../store/store'
import { generateOTP, verifyOTP } from '../helper/helper'
import { useNavigate } from 'react-router-dom'

const Recovery = () => {
  const navigate = useNavigate()
  const { username } = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState()

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP)
      if (OTP) return toast.success('OTP has been send to your email')
      else return toast.error('Problem while generating OTP')
    })
  }, [username])

  const onsubmit = async (e) => {
    e.preventDefault();

    try {
      const { status } = await verifyOTP({ username, code: OTP })
      if (status === 201) {
        toast.success("Verify Successfully")
        return navigate('/reset')
      }
    } catch (error) {
      return toast.error("Wrong OTP") 
    }
  }

  // resend OTP
  const resendOTP = () => {
    const sendPromise = generateOTP(username);

    toast.promise(sendPromise, {
      loading: 'sending..',
      success: <b>OTP has been send to email</b>,
      error: <b>OTP not send</b>
    })

    sendPromise.then(OTP => {
      console.log(OTP)
    })
  }

  return (
    <div className='container mx-auto'>

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex flex-col justify-center items-center h-screen'>
        <div className={style.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Recovery</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Enter OTP to recovery password
            </span>
          </div>

          <form className='pt-20' onSubmit={onsubmit}>
            <div className='textbox flex flex-col items-center gap-6'>
              <div className='input text-center'>
                <span className='py-4 text-sm text-left text-gray-400'>Enter the 6 digit OTP sent to you email address</span>
                <input onChange={(e) => setOTP(e.target.value)} className={style.textbox} type='password' placeholder='OTP' />
              </div>
              <button className={style.btn} type='submit'>SignIn</button>
            </div>
          </form>
          <div className='text-center py-4'>
              <span className='text-gray-500'>Can't get OTP?<button onClick={resendOTP} className='text-red-500'>Resend</button></span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Recovery