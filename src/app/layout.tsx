import type { Metadata } from "next"
import { Plus_Jakarta_Sans as FontSans } from "next/font/google"
import Script from "next/script"

import { cn } from "@/lib/utils"
import Providers from "@/app/providers"

import "@/app/globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    template: "%s | Mailcraft",
    default: "Mailcraft",
  },
  description: "Build & Preview Emails Online",
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => (
  <html lang="en" suppressHydrationWarning>
    <head>
      <Script src="https://unpkg.com/web-streams-polyfill/dist/polyfill.js" />
    </head>
    <body
      className={cn(
        "relative flex min-h-svh flex-col overflow-x-hidden overscroll-y-none font-sans antialiased",
        fontSans.variable
      )}
    >
      <Providers>{children}</Providers>
    </body>
  </html>
)

export default RootLayout
