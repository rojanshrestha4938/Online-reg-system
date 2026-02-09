import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BirthRegistration from './components/BirthRegistration';
import DeathRegistration from './components/DeathRegistration';
import MarriageRegistration from './components/MarriageRegistration';
import Footer from './components/Footer';

const App = () => {
  const [page, setPage] = useState('home');

  return (
    <div>
      <Navbar setPage={setPage} />
      <div className="container mt-4">
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'birth' && <BirthRegistration />}
        {page === 'death' && <DeathRegistration />}
        {page === 'marriage' && <MarriageRegistration />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
