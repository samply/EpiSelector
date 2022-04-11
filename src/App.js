import './App.css';
import Nav from './Nav';
import NavB from './NavB'
import Mainpage from './Mainpage';
import Betapage from './Betapage';
import UploadData from './UploadData';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import InfoBox from "./InfoBox";
import InputProtokoll from "./InputProtokoll";
import TopNav from "./TopNav";


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
