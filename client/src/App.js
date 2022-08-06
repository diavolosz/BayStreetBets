import './stylesheet/App.scss';
import NonLogged from './components/non-logged'
import Details from './components/details';
import Footer from './components/footer';

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
