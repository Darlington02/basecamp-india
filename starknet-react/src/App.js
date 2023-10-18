import Home from './components/home'
import StarknetProvider from './components/starknet-provider';

function App() {
  return (
    <StarknetProvider>
      <Home />
    </StarknetProvider>
  );
}

export default App;