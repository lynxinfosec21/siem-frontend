import React,{useEffect} from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import MainSection from './components/MainSection/MainSection';
import axios from 'axios';

function App() {

async function getOpenSearchInfo() {
  try {
    const response = await axios.get('http://localhost:4000/api/opensearch', {
      auth: {
        username: 'admin',
        password: 'Orthorhombic777!',
      },
    });

    console.log('OpenSearch Info:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error calling OpenSearch:', error.response?.data || error.message);
  }
}


const fetchLogs = async () => {
  try {
    const response = await axios.post('http://localhost:4000/api/search', {
      index: 'top_queries-*',
      query: {
        size: 100,
        query: {
          match_all: {}
        }
      }
    });

    console.log('Logs:', response.data.hits.hits);
  } catch (error) {
    console.error('Error fetching logs:', error);
  }
};


const fetchIndices = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/indices');
    console.log("Indices:\n", response.data);
  } catch (error) {
    console.error("Error fetching indices:", error);
  }
};

useEffect(() => {
  getOpenSearchInfo();
  fetchLogs();
  fetchIndices();
}, []);
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
