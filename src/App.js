import './App.css';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';

// components
import NavigationBar from './components/NavigationBar';
import Main from './components/Main';

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
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
