import './App.css';
import styled from 'styled-components';

// components
import NavigationBar from './components/NavigationBar';
import Button1 from './components/Button1';

const AppContainer = styled.div`
  width: 100wv;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

function App() {
  return (
    <AppContainer className="App">
      <NavigationBar />
      <Button1 />
    </AppContainer>
  );
}

export default App;
