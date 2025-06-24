import React,{useEffect} from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import MainSection from './components/MainSection/MainSection';
import axios from 'axios';

function App() {

  return (
    <div>
      <Navbar />
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem 1rem 1rem 1rem'
      }}>
        <div style={{ width: '20%' }}>
          <Sidebar />
        </div>
        <div style={{ width: '80%' }}>
          <MainSection />
        </div>
      </div>
    </div>
  );
}

export default App;
