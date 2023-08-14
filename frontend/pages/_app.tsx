import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from '@clerk/nextjs';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';


const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps<{}>) {
  const queryClient = new QueryClient();

  return (
    <div
      className={inter.className}
      style={{ background: `url('/bkd.png') no-repeat center center fixed` }}
    >
      <Toaster />
      <ClerkProvider
        appearance={
          {
          layout: {
            logoImageUrl: "logo2.png",
            logoPlacement: "inside",
              }
          }
        }
      >
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="flex items-center mb-4">
            <SignedIn>
              <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
              </QueryClientProvider>
            </SignedIn>
            <SignedOut>
              <SignIn />
            </SignedOut>
          </div>
        </div>
      </ClerkProvider>
    </div>
  );
}

export default appWithTranslation(App);
