
import './App.css';
import { useState } from 'react'
import axios from 'axios'
import { setAuthenticationHeader } from './utils/authenticate';

function App() {

  const [credentials, setCredentials] = useState({})

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = () => {
    // perform the login request 
  
    axios.post('http://localhost:8080/login',{
      username: credentials.username, 
      password: credentials.password    
    }).then(response => {
      if(response.data) {     
        const token = response.data.token
        localStorage.setItem('jsonwebtoken', token)
        // set default headers 
        setAuthenticationHeader(token) 
        console.log(token)   
      }
    }).catch(error => {
      console.log(error)    
    })

  }

  const handleGetAllAccounts = () => {

    axios.get(`http://localhost:8080/accounts/${credentials.username}`)
    .then(response => console.log(response))
    .catch(error => console.log(error))

  }

  const handleGetProfile = () => {
    axios.get(`http://localhost:8080/profile/${credentials.username}`)
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

  return (
    <div className="App">
      <h1>Login</h1>
      <div>
        <input type="text" name="username" onChange={handleChange} placeholder="Enter user name"></input>
        <input type="password" name="password" onChange={handleChange} placeholder="Enter password"></input>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleGetAllAccounts}>Get All Accounts</button>
        <button onClick={handleGetProfile}>Get Profile</button>
      </div>

    </div>
  );
}

export default App;
