import './App.css';
import Home from './Pages/Home/Home';
import Shop from './Pages/Shop/Shop';
import Header from './Components/Header/Header';
import SigninAndSignup from './Pages/SigninAndSignup/SigninAndSignup';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { auth, createUserProfileDocument } from './firebase/firebase';

import React, { Component } from 'react'

class App extends Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });

          console.log(this.state)
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount () {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className='App'>
      <BrowserRouter>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/signin' element={<SigninAndSignup />} />
        </Routes>
      </BrowserRouter>
    </div>
    )
  }
}

export default App; 
