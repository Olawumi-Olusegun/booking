import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './context/AppContext.tsx'
import { SearchContextProvider } from './context/SearchContext.tsx'
import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0
      }
    }
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
