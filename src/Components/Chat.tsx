import React, { useContext } from 'react'
import { User, userType } from '../Context/User'

export default function Chat() {
  const {docId} = useContext(User)  as userType

  return (
    <div>
   {!docId && <h1>Login first</h1>}
    </div>
  )
}
