import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  PageSize = 18;
  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar/>
          <div>
            <Routes>
              {/* remounting using the key */}
              <Route exact path="/" element= {<News key="general" PageSize = {this.PageSize} country = "in" category = "general"/>} />
              <Route exact path="/business" element= {<News key="business" PageSize = {this.PageSize} country = "in" category = "business"/>} />
              <Route exact path="/entertainment" element= {<News key="entertainment" PageSize = {this.PageSize} country = "in" category = "entertainment"/>} />
              <Route exact path="/health" element= {<News key="health" PageSize = {this.PageSize} country = "in" category = "health"/>} />
              <Route exact path="/science" element= {<News key="science" PageSize = {this.PageSize} country = "in" category = "science"/>} />
              <Route exact path="/sports" element= {<News key="sports" PageSize = {this.PageSize} country = "in" category = "sports"/>} />
              <Route exact path="/technology" element= {<News key="technology" PageSize = {this.PageSize} country = "in" category = "technology"/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </>
    )
  }
}

// consst App(){
//   return{
/*
<Route path="/business"><News PageSize = {6} country = "in" category = "business"/></Route>
<Route path="/entertainment"><News PageSize = {6} country = "in" category = "entertainment"/></Route>
<Route path="/general"><News PageSize = {6} country = "in" category = "general"/></Route>
<Route path="/health"><News PageSize = {6} country = "in" category = "health"/></Route>
<Route path="/science"><News PageSize = {6} country = "in" category = "science"/></Route>
<Route path="/sports"><News PageSize = {6} country = "in" category = "sports"/></Route>
<Route path="/technology"><News PageSize = {6} country = "in" category = "technology"/></Route>
*/
//   }
// }