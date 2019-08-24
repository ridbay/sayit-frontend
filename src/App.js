import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
//Components
import Navbar from './components/Navbar'

export const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  pallete: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#0008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '20px auto 20px auto'
  },
  pageTitle: {
    margin: '5px auto 5px auto'
  },
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  }
})



export class App extends Component {
  render() {
    return ( 
      <MuiThemeProvider theme={theme}>
        <div className='App'>
        <Router>
        <Navbar />
          <div className='container'>
          <Switch>
            <Route exact path="/" component={home} />
            <Route exact path="/login" component={login} />
            <Route exact path="/signup" component={signup} />
          </Switch>
          </div>
        </Router>
      </div>
      </MuiThemeProvider>
    )
  }
}

export default App
