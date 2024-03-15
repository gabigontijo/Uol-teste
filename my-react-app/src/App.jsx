import { QueryClient, QueryClientProvider } from 'react-query';

import ThemeProvider from './theme';
import Router from './routes/sections';
import { useScrollToTop } from './hooks/use-scroll-to-top';

const queryClient = new QueryClient();

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
