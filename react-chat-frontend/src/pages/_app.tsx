import { Roboto } from '@next/font/google'
import type { AppProps } from 'next/app'
import { IconContext } from 'react-icons'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import { store } from 'redux/store'
import { ToastProvider } from '@ui-kit'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <IconContext.Provider value={{ size: '24', color: 'var(--icon-color)' }}>
        <ToastProvider>
          <main className={roboto.className}>
            <Component {...pageProps} />
          </main>
          <div id='portals' />
        </ToastProvider>
      </IconContext.Provider>
    </Provider>
  )
}
