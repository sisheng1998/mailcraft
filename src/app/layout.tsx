import type { Metadata } from "next"
import { Plus_Jakarta_Sans as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import Providers from "@/app/providers"

import "@/app/globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "React Email Editor",
  description: "Build and preview emails with React Email",
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => (
  <html lang="en" suppressHydrationWarning>
    <body
      className={cn(
        "relative flex min-h-screen flex-col overflow-x-hidden overscroll-y-none bg-background font-sans text-foreground antialiased",
        fontSans.variable
      )}
    >
      <Providers>{children}</Providers>
    </body>
  </html>
)

export default RootLayout
