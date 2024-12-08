import type { Metadata } from "next"
import { Plus_Jakarta_Sans as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"

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
  <html lang="en">
    <body
      className={cn(
        "bg-background text-foreground relative flex min-h-screen flex-col overflow-x-hidden overscroll-y-none font-sans antialiased",
        fontSans.variable
      )}
    >
      {children}
    </body>
  </html>
)

export default RootLayout
