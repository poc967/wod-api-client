import './App.css';
import styled from 'styled-components';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from './actions/authActions';

// components
import NavigationBar from './components/NavigationBar';
import Main from './components/Main';
import Login from './components/Login';

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
        <Route path="/" element={true ? <Main /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
