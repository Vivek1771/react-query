import './App.css';
import User from './components/User';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


function App() {

  const queryClient = new QueryClient()

  return (
    <div className="App">
      <h1>React-Query</h1>
      <QueryClientProvider client={queryClient}>
        <User />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
