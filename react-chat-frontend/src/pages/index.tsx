import AuthInput from '@components/auth/AuthInput'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = {
      username,
      password,
    }

    const res = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (res.ok) {
      router.replace(`/chat/${data.username}`)
    }
  }

  return (
    <div className='w-screen h-screen flex flex-col items-center'>
      <img src='/auth_page_logo.svg' className='w-64 h-64 mt-24 absolute' />
      <form onSubmit={handleSubmit} className='w-1/3 h-full flex flex-col items-center justify-center gap-2'>
        <div className='flex flex-col items-start self-start'>
          <h1 className='font-semibold text-xl'>Welcome Back!</h1>
          <p className='text-icon-color text-sm'>
            Login to continue or{' '}
            <Link href='/signup' className='underline text-blue-500'>
              Create new account
            </Link>
          </p>
        </div>
        <AuthInput onChange={e => setUsername(e.target.value)} placeholder='Username' type='text' />
        <AuthInput onChange={e => setPassword(e.target.value)} placeholder='Password' type='password' />
        <button type='submit' className='w-1/2 text-active-item-color hover:bg-[#f4f4f5] rounded-md'>
          Submit
        </button>
      </form>
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
