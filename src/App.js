import logo from './logo.svg';
import './App.css';
import React, { Component, Fragment,useState ,useEffect,useContext} from 'react';
import NavBar from './components/layout/navbar.js';
import UserItem from './components/users/UserItem.js';
import Users from './components/users/Users.js';
import User from './components/users/User';
import Search from './components/users/Search.js';
import axios from 'axios';
import Alert from './components/layout/alert';
import About from './components/pages.js/About';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import GithubState from './context/github/GithubState';
import GithubContext from './context/github/githubContext';

const App=()=> {
 
  const githubContext = useContext(GithubContext);
  const [users,setUsers]=useState([]);
  const [loading,setLoading]=useState(false);
  const [alert,setAlert]=useState(null);
  const [repos,setRepos]=useState([]);
  const [user,setUser]=useState({});

 

  const clearUsers=()=>{
    setLoading(false);
    setUsers([]);
  }

  const getUser=async (username)=>{
    setLoading(true);
    const resp=await axios
    .get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUser(resp.data);
    setLoading(false);
  }

  const getUserRepos=async (username)=>{
    setLoading(true);
    const resp=await axios
    .get(`https://api.github.com/users/${username}/repos?sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    // this.setState({repos:resp.data,loading:false});
    setRepos(resp.data);
    setLoading(false);
  }

  // const searchUsers=async text=>{
  //   // this.setState({loading:true})
  //   setLoading(true);
  //   const resp=await axios
  //   .get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  
  //   // this.setState({users:resp.data.items,loading:false});
  //   setUsers(resp.data.items);
  //   setLoading(false);
  // }

  const setThisAlert=(message,type)=>{
    // this.setState({alert:{message,type}})
    setAlert({message,type});
    // setTimeout(()=>this.setState({alert:null}),5000)
    setTimeout(()=>setAlert(null),3000)
  }

  useEffect(() => {
    setLoading(true);
    axios
    .get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    .then((resp)=>{setUsers(resp.data);setLoading(false)});
  }, [])

  // async componentDidMount(){
  //   console.log(process.env.REACT_APP_GITHUB_CLIENT_ID)
  //   // this.setState({loading:true});
  //   setLoading(true)
  //   const resp=await axios
  //   .get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   console.log(resp);
  //   // this.setState({users:resp.data,loading:false});
  //   setUsers(resp.data);
  //   setLoading(false);
  // }
 
    // const name1="Chintamani";
    // const loading=false;
    // const showname=true;

    
   return (
     <GithubState>
     <Router>
      <div className='App'>
        
        <NavBar title="GitHub finder" icons="fab fa-github"/>
        <div className='container'>
          <Alert alert={alert}/>
          <Switch>
            <Route
              exact path='/'
              render={
                props=>(
                  <Fragment>
                     <Search  clearUsers={clearUsers} setAlert={setThisAlert} showClear={users.length>0?true:false}/>
        
                      <Users/>
                  </Fragment>
                )
              }
            />
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login' render={
              props=>(
                <Fragment>
                  <User
                   {...props} 
                   getUser={getUser} 
                   getUserRepos={getUserRepos}
                   user={user} 
                   repos={repos}
                   loading={loading}/>
                </Fragment>
              )
            }/>
          </Switch>
       
        {/* {loading?<h2>loading...</h2>:<h1>Hello {name.toUpperCase()}</h1>}
        {showname && "Hello"+name} */}
        </div>
        </div>
    </Router>
    </GithubState>
    )
  
}

export default App;
