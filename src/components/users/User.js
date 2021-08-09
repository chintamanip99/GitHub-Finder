import React, { Component, Fragment,useEffect } from 'react'
import Spinner from '../layout/spinner';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import {Repos} from '../repos/Repos';

const User =({user,loading,getUser,getUserRepos,repos,match:{params}})=> {

   useEffect(()=>{
    getUser(params.login);
    getUserRepos(params.login);
   }

   ,[])

   

    

        const {
            login,
            company,
            id,
            node_id,
            avatar_url,
            html_url,
            name,
            blog,
            location,
            hireable,
            bio,
            public_repos,
            public_gists,
            followers,
            following,
          }=user;

          if(loading) return <Spinner/>;
        return (
            <Fragment>
                <Link to='/' className='btn btn-light'>Back to search</Link>
                Hireable:{' '}
                {hireable?<i className='fas fa-check text-success'/>:<i className='fas fa-times-circle text-danger'/>}
                <div className='card grid-2'>
                    <div className='all-center'>
                        <img 
                        src={avatar_url} 
                        className='round-img'
                        alt=''
                        style={{width:'150px'}}/>
                        <h1> {name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>

                        {bio && 
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                        }
                        <a href={html_url} className='btn btn-dark my-1'>Visit Github Profile</a>
                        {company &&
                        <Fragment>
                           <h3> Company</h3>
                           <strong>{company}</strong>
                        </Fragment>
                        }
                        {blog &&
                        <Fragment>
                            <h3>Website</h3>
                            <strong>{blog}</strong>
                        </Fragment>
                        }
                    </div>
                    </div>
                    <div className='card text-center'>
                        <div className='badge badge-primary'>
                            Followers: {followers}
                            </div>

                            <div className='badge badge-success'>
                            Following: {following}
                            </div>

                            <div className='badge badge-white'>
                            Public Repos: {public_repos}
                            </div>

                            <div className='badge badge-dark'>
                            Public Gists: {public_gists}
                            </div>
                        </div> 
                        <Repos  repos={repos} />
            </Fragment>
        )
            
        
    
}

User.propTypes={
    loading:PropTypes.bool.isRequired,
    user:PropTypes.object.isRequired,
    getUser:PropTypes.func.isRequired,
    getUserRepos:PropTypes.func.isRequired,
    repos:PropTypes.array.isRequired,
};

export default User;
