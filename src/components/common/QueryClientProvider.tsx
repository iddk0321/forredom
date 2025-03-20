'use client'

import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider as Provider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
  })
}

let clientQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient()
  } else {
    if (!clientQueryClient) {
      clientQueryClient = makeQueryClient()
    }
    return clientQueryClient
  }
}

export function QueryClientProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient()
  return (
    <Provider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
    </Provider>
  )
}
