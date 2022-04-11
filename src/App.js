import './App.css';
import Nav from './components/Nav';
import NavB from './components/NavB'
import Mainpage from './pages/Mainpage';
import Betapage from './pages/Betapage';
import UploadData from './components/form/UploadData';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import InfoBox from "./components/InfoBox";
import InputProtokoll from "./components/InputProtokoll";
import TopNav from "./components/TopNav";


function App() {

  return (
      <div>
      <Router>
          <TopNav/>
        <div className="App">
                <NavB/>
          <Switch>
            <Route path='/' exact component={Mainpage}/>
            <Route path="/mainpage" component={Mainpage}/>
            <Route path="/betapage" component={Betapage}/>
              <Route path="/uploadData" component={UploadData}/>
          </Switch>
            <div className="rightSideStructure">
            <InputProtokoll/>
            <InfoBox/>
            </div>
        </div>
      </Router>
      </div>
  );
}

export default App;
