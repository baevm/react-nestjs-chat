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
    <div className='w-screen h-screen flex flex-col items-center'>
      <img src='/auth_page_logo.svg' className='w-64 h-64 mt-24 absolute' />
      <div className='md:w-1/4 h-full flex flex-col items-center justify-center gap-2'>
        <div className='flex flex-col items-start self-start'>
          <h1 className='font-semibold text-xl'>Welcome Back!</h1>
          <p className='text-icon-color text-sm'>
            Login to continue or{' '}
            <Link href='/signup' className='underline text-blue-500'>
              create new account
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-2 items-center'>
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
