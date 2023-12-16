import '../styles/globals.css'
import type { AppType } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { trpc } from '../utils/trpc'

const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};
export default trpc.withTRPC(MyApp);