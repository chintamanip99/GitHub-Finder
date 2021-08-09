import React ,{useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import {
 SEARCH_USERS,
 SET_LOADING,
 LOAD_USERS,
 CLEAR_USERS,
 GET_USER,
 GET_REPOS
} from '../types';

const GithubState=props=>{
    const initialState={
        users:[],
        user:{},
        repos:[],
        loading:false
    }
    const [state,dispatch]=useReducer(GithubReducer,initialState);

    //Search users
    const searchUsers=async text=>{
        // this.setState({loading:true})
        setLoading();
        const resp=await axios
        .get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      
        // this.setState({users:resp.data.items,loading:false});
        // setUsers(resp.data.items);
        // setLoading(false);
        dispatch(
        {
            type:SEARCH_USERS,
            payload:resp.data.items
        }
        );
      }

    //get user

    //get repos

    //clear users

    //set loading

    const setLoading=()=>dispatch({type:SET_LOADING})
    

    //get users on app startup
    const loadUsers =async() =>{
        // this.setState({loading:true})
        setLoading();
        const resp=await axios
        .get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      
        // this.setState({users:resp.data.items,loading:false});
        // setUsers(resp.data.items);
        // setLoading(false);
        dispatch(
        {
            type:LOAD_USERS,
            payload:resp.data
        }
        );
      }

    return <GithubContext.Provider
    value={
        {
             users:state.users,
             user:state.user,
             repos:state.repos,
             loading:state.loading,
             searchUsers,
             loadUsers
        }
    }
    >
        {props.children}

    </GithubContext.Provider>
}

export default GithubState;