"use client"

import { useCallback } from "react"
import { useSearchParams } from "next/navigation"

const useCreateQueryString = () => {
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === null) {
        params.delete(name)
      } else {
        params.set(name, value)
      }

      return params.toString()
    },
    [searchParams]
  )

  return createQueryString
}

export default useCreateQueryString
