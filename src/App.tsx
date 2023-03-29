import { RouterProvider } from 'react-router-dom'
import Container from '@mui/material/Container'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { router } from './router'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const client = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={client}>
      <Container maxWidth="sm">
        <RouterProvider
          router={router}
        />
      </Container>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}