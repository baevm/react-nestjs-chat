import AuthInput from '@components/auth/AuthInput'
import ErrorText from '@components/auth/ErrorText'
import { Button } from '@ui-kit'
import { useLoginMutation } from '@redux/api/auth/authSlice'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'

type Inputs = {
  username: string
  password: string
}

export default function Home() {
  const router = useRouter()
  const [login, { isLoading, isSuccess, error: apiError }] = useLoginMutation()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await login(data)
      .unwrap()
      .then(() => router.replace(`/chat`))
      .catch((error: any) => console.error(error))
  }

  return (
    <div className='flex h-screen w-screen flex-col items-center'>
      <img src='/images/auth_page_logo.svg' className='absolute mt-[5vw] h-64 w-64' alt='logo' />
      <div className='flex h-full w-[400px] flex-col items-center justify-center gap-2'>
        <div className='flex flex-col items-start self-start'>
          <h1 className='text-xl font-semibold'>Welcome Back!</h1>
          <p className='text-icon-color text-sm'>
            Login to continue or{' '}
            <Link href='/signup' className='text-blue-500 underline'>
              create new account
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col items-center gap-2'>
          <AuthInput {...register('username', { required: true })} placeholder='Username' type='text' />
          {apiError && 'data' in apiError && apiError.data.type === 'username' && (
            <ErrorText>{apiError.data.message}</ErrorText>
          )}
          {errors.username?.type === 'required' && <ErrorText>Username is required</ErrorText>}

          <AuthInput {...register('password', { required: true })} placeholder='Password' type='password' />
          {apiError && 'data' in apiError && apiError.data.type === 'password' && (
            <ErrorText>{apiError.data.message}</ErrorText>
          )}
          {errors.password?.type === 'required' && <ErrorText>Password is required</ErrorText>}

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
