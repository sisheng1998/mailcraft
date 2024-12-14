"use client"

import React from "react"
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes"

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => (
  <NextThemesProvider {...props}>{children}</NextThemesProvider>
)

export default ThemeProvider
