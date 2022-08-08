import { useEffect, useState } from 'react';
import './stylesheet/App.scss';
import NonLogged from './components/NonLogged'
import Details from './components/Details';
import Footer from './components/Footer';

function App() {

  const [state, setState] = useState({
    user: null,
    transactions: [],
    competitions_created: {},
    competitions_enrolled: {},
  });

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      setState(prev => ({
        ...prev,
        user: parseInt(userFromLocalStorage)
      }))
    }
  }, []);

  return (
    <div className="App">
      <div className="background-container">
        <img src="img/background.jpg" className="background-image" />
        <NonLogged />
        <Details />

        <Footer />
      </div>
    </div>
  );
}

export default App;
