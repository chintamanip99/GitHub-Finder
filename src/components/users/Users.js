import React, { useContext,useEffect} from 'react'
import UserItem from './UserItem';
import Spinner from '../layout/spinner'
import GithubContext from '../../context/github/githubContext';



const Users =()=>  {

const githubContext = useContext(GithubContext);

// eslint-disable-next-line react-hooks/exhaustive-deps

useEffect(() => {
   githubContext.loadUsers();
     // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

if(githubContext.loading){
return <Spinner/>
}



// componentDidMount(){
//     axios
//     .get('https://api.github.com/users')
//     .then(res=>console.log(res))
// }

// async componentDidMount(){
//     const resp=await axios
//     .get('https://api.github.com/users')
//     console.log(resp)
// }

else return(
        <div style={UserStyle}>
            {githubContext.users.map(
                user=>(
                    <UserItem key={user.id} user={user}/>
                )
            )}
        </div>
    )
                
}



const UserStyle={
    display:'grid',
    gridTemplateColumns:'repeat(3,1fr)',
    gridGap:'1rem'
}

export default Users;