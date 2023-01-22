import AuthInput from '@components/auth/AuthInput'
import Button from '@components/ui-kit/Button'
import { useLoginMutation } from '@redux/api/auth/authSlice'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [login, { isLoading, isSuccess, error }] = useLoginMutation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = {
      username,
      password,
    }

    await login(data)
      .unwrap()
      .then(() => router.replace(`/chat`))
      .catch((error: any) => console.error(error))
  }

  return (
    <div className='w-screen h-screen flex flex-col items-center'>
      <img src='/auth_page_logo.svg' className='w-64 h-64 mt-24 absolute' />
      <div className='w-1/3 h-full flex flex-col items-center justify-center gap-2'>
        <div className='flex flex-col items-start self-start'>
          <h1 className='font-semibold text-xl'>Welcome Back!</h1>
          <p className='text-icon-color text-sm'>
            Login to continue or{' '}
            <Link href='/signup' className='underline text-blue-500'>
              create new account
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-2 items-center'>
          <AuthInput onChange={(e) => setUsername(e.target.value)} placeholder='Username' type='text' />
          {error && 'data' in error && <div className='text-red-500 text-sm self-start'>{error.data.message}</div>}
          <AuthInput onChange={(e) => setPassword(e.target.value)} placeholder='Password' type='password' />
          <Button type='submit' variant='subtle' isLoading={isLoading}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ req }: any) => {
  const cookie = req.cookies['REFRESH_TOKEN']

  if (cookie) {
    return {
      redirect: {
        permanent: false,
        destination: '/chat',
      },
    }
  }
  return {
    props: {},
  }
}
