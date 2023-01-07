import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { Roboto } from '@next/font/google'
import { IconContext } from 'react-icons'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <IconContext.Provider value={{ size: '24' }}>
        <main className={roboto.className}>
          <Component {...pageProps} />
        </main>
      </IconContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
