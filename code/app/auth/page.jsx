'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {useState} from 'react'
import Signin from './signin'
import Signup from './signup'

export default function page() {
  const [form, setForm] = useState('signin')

  const chooseForm = (form) => {
    setForm(form)
  }

  return (
    <div className='flex h-screen justify-start flex-col p-4'>
        {/* Logo and title */}
        <motion.div
        className='flex justify-center items-center flex-col text-center text-6xl font-semibold drop-shadow-md'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, duration: 1.0 }}
        exit={{ opacity: 0 }}
        >
            CALENDO
            <Image src='/logo.png' width={200} height={200} alt='Logo' />
        </motion.div>
        
        { form === 'signin' ? (
        <>
          {/* Signin form */}
          <motion.div
          key='signin' 
          className='flex m-auto flex-col gap-8 items-center justify-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, duration: 1.0 }}
          exit={{ opacity: 0 }}
          >
            <Signin />
            <button
            className='text-blue-500 font-bold underline' 
            onClick={() => chooseForm('signup')}
            >
              Don't have an account? Sign Up 
            </button>
          </motion.div>
        </>
      ) : form === 'signup' ? (
        <>
          {/* Signup form */}
          <motion.div
          key='signup' 
          className='flex m-auto flex-col gap-8 items-center justify-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, duration: 1.0 }}
          exit={{ opacity: 0 }}
          >
            <Signup />
            <button 
            className='text-blue-500 font-bold underline'
            onClick={() => chooseForm('signin')}
            >
              Already have an account? Sign In 
            </button>
          </motion.div>
        </>
      ) : null}
    </div>
  )
}

