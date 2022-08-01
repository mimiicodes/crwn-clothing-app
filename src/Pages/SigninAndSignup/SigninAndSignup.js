import React from 'react'
import './SigninAndSignup.scss'
import Signin from '../../Components/Signin/Signin'
import Signup from '../../Components/Signup/Signup'

const SigninAndSignup = () => {
  return (
    <div className='sign-in-and-sign-up'>
      <Signin />
      <Signup />
    </div>
  )
}

export default SigninAndSignup