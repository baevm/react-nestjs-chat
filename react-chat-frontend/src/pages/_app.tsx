import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { Roboto } from '@next/font/google'
import { IconContext } from 'react-icons'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import { store } from 'redux/store'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
})

/* const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
}) */

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <IconContext.Provider value={{ size: '24', color: 'var(--icon-color)' }}>
        <main className={roboto.className}>
          <Component {...pageProps} />
        </main>
      </IconContext.Provider>
    </Provider>
    /* <QueryClientProvider client={queryClient}> */

    /*  </QueryClientProvider> */
  )
}
