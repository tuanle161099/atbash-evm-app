import type { Metadata, Viewport } from 'next'

import UiProvider from '@/providers/ui.provider'
import WalletProvider from '@/providers/wallet.provider'
import Header from './header'

const title = 'Atbash'
const description =
  'Atbash: Redefining Digital Democracy with Advanced Privacy Tech. Unveiling the next era of secure, confidential e-voting.'
const thumbnail = '/thumbnail.jpeg'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [thumbnail],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@1,900,700,500,300,400,2&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="w-full">
        <UiProvider>
          <WalletProvider>
            <div className="w-full min-h-[100dvh] flex flex-col gap-6">
              <header className="sticky top-0 z-10">
                <Header />
              </header>
              <main className="px-4">{children}</main>
            </div>
          </WalletProvider>
        </UiProvider>
      </body>
    </html>
  )
}
