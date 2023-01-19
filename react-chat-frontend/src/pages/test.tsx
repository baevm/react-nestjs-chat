import { useGetUserQuery } from 'redux/api/userSlice'

const TestPage = () => {
  const { data, isLoading } = useGetUserQuery()

  console.log({ data })

  return <div>TestPage</div>
}

export default TestPage
