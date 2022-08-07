import './stylesheet/App.scss';
import NonLogged from './components/NonLogged'
import Details from './components/Details';
import Footer from './components/Footer';

function App() {
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
