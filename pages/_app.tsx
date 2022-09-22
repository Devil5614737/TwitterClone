import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../context/AuthContext'
import { PostContextProvider } from '../context/PostContext'

function MyApp({ Component, pageProps }: AppProps) {
  return <AuthContextProvider>
    <PostContextProvider>
    <Component {...pageProps} />
    </PostContextProvider>
  </AuthContextProvider>
}

export default MyApp
