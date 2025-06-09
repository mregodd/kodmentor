import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EditMentor from './pages/EditMentor';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './components/Spinner';

function App() {
  return (
    <>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
      <Spinner /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditMentor />} />
      </Routes>
    </>
  );
}

export default App;
