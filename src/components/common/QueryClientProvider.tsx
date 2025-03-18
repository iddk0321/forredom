'use client'

import { ReactNode, useState } from 'react'
import {
  QueryClient,
  QueryClientProvider as Provider,
} from '@tanstack/react-query'

export function QueryClientProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      // Github API 403 Forbidden 에러가 발생하는 경우가 있어서 retry 0으로 설정
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            refetchOnWindowFocus: false,
          },
        },
      }),
  )
  return <Provider client={queryClient}>{children}</Provider>
}
