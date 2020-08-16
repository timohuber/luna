import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './css/main.css';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from "./routes/home"
import Search from "./routes/search"
import Restaurant from "./routes/restaurant"
import Login from "./routes/login"
import Registration from "./routes/registration"
import CreateRestaurant from "./routes/create-restaurant"
import Profile from "./routes/profile"
import User from "./routes/user"

import authComponent from './hoc/authHOC';


import { fetchUserData } from "./store/actions/loginActions"
import AddReview from './routes/add-review';
import connectedAuthComponent from "./hoc/authHOC";


function App() {
  const dispatch = useDispatch()

  if (localStorage.getItem('accessToken')) {
    dispatch(fetchUserData());
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
          <main className="main-content">
              <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route exact path="/home" component={Home} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/restaurant-detail/:id" component={Restaurant} />
              <Route exact path="/login" component={connectedAuthComponent(Login, true)} />
              <Route exact path="/create-restaurant" component={connectedAuthComponent(CreateRestaurant)} />
              <Route exact path="/profile/" component={connectedAuthComponent(Profile)} />
              <Route exact path="/user/:id" component={connectedAuthComponent(User)} />
              <Route exact path="/add-review/:id" component={connectedAuthComponent(AddReview)} />
              </Switch>
          </main>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;