import React from 'react'
import { makeSignUpValidation } from './signup-validation-factory'
import { Signup } from '@/presentation/pages'
import { makeRemoteAddAccount } from '@/main/factories/usecases/add-account/remote-add-account-factory'

export const makeSignup: React.FC = () => {
  return <Signup
    addAccount={makeRemoteAddAccount()}
    validation={makeSignUpValidation()}
  />
}
