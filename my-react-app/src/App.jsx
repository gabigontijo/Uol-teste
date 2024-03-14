import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { QueryClient, QueryClientProvider } from 'react-query';

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
