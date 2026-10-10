import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import PageLoading from '~/components/Loading/PageLoading'
import { verifyUserApi } from '~/apis'

export default function AccountVerification() {
  const [searchParam] = useSearchParams()
  const { email, token } = Object.fromEntries(searchParam)
  const [verified, setVerified] = useState(false)
  const navigate = useNavigate()
  // call api để verify account
  useEffect(() => {
    if ( email && token) {
      verifyUserApi({ email, token })
        .then(() => setVerified(true))
        .catch((error) => {
          if (error?.response.data.statusCode === 403) {
            navigate('/login', { replace: true })
          }
        })
    }
  }, [email, token, navigate])

  //url có vấn đề, không tồn tại 1 trong 2 params
  if (!email || !token) {
    return <Navigate to='/404'/>
  }

  if (!verified) {
    return <PageLoading caption='Verifying account...'/>
  }
  return (
    <Navigate to={`/login?verifiedEmail=${email}`}/>
  )
}
