import AuthInput from '@components/auth/AuthInput'
import ErrorText from '@components/auth/ErrorText'
import { Button, useToast } from '@ui-kit'
import { useSignupMutation } from '@redux/api/auth/authSlice'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  username: string
  password: string
}

const SignupPage = () => {
  const [signup, { isLoading, error: apiError }] = useSignupMutation()
  const toast = useToast()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await signup(data)
      .unwrap()
      .then(() =>
        toast.show({
          type: 'success',
          title: 'Success!',
          text: 'Account created. You can login now.',
          position: 'bottom-right',
        })
      )
      .catch((error: any) => console.error(error))
  }

  return (
    <div className='flex h-screen w-screen flex-col items-center'>
      <img src='/auth_page_logo.svg' className='absolute mt-24 h-64 w-64' />
      <div className='flex h-full w-[400px] flex-col items-center justify-center gap-2 '>
        <div className='flex flex-col items-start self-start'>
          <h1 className='text-xl font-semibold'>Create account</h1>
          <p className='text-icon-color text-sm'>
            Got an account?{' '}
            <Link href='/' className='text-blue-500 underline'>
              Log in
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

export default SignupPage

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
