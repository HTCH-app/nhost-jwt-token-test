import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NhostProvider, NhostSession } from "@nhost/nextjs";
import { nhost } from "@/services";
import { NhostApolloProvider } from "@nhost/react-apollo";

type Props = {
  nhostSession?: NhostSession;
}

export default function App({ Component, pageProps }: AppProps<Props>) {

  console.log('app, from ssr', pageProps.nhostSession);
  return (
    <NhostProvider nhost={nhost} initial={pageProps.nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        <Component {...pageProps} />
      </NhostApolloProvider>
    </NhostProvider>
  )
}
