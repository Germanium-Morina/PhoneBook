
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PhoneBook from './pages/PhoneBook';
import AddContact from './pages/AddContact';
import EditContact from './pages/EditContact';
function App() {
  return (
    
    <Router>
      <div>
      <div className="bg-slate-950 mt-2 pl-2 pt-4 pb-4 mb-6">
        <h1 className="text-4xl text-white">PhoneBook</h1>
      </div>
        <Routes>
        <Route path="/" element={<PhoneBook />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/edit-contact/:id" element={<EditContact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
