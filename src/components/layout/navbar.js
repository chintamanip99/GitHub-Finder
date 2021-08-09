import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
// class NavBar extends Component{
//     static defaultProps={
//         title:'GitHub Finder',
//         icons:'fab fa-github'
//     };

//     static propTypes={
//         title:PropTypes.string.isRequired,
//         icons:PropTypes.string.isRequired
//     }

//     render(){
//         return(
//             <React.Fragment>
//                 <nav className='navbar bg-primary'>
//                     <h1>
//                         <i className={this.props.icons}/>
//                         {this.props.title}</h1>
//                     </nav>
//             </React.Fragment>
//         )
//     }
// }

const NavBar=props=>{
    return(
                    <React.Fragment>
                        <nav className='navbar bg-primary'>
                            <h1>
                                <i className={props.icons}/>
                                {props.title}</h1>

                            <ul>
                                <li><Link to='/' >Home</Link>
                                 </li>
                                 <li><Link to='/about' >About</Link>
                                 </li>
                            </ul>
                            </nav>
                    </React.Fragment>
                )
}

    NavBar.defaultProps={
        title:'GitHub Finder',
        icons:'fab fa-github'
    };

    NavBar.propTypes={
        title:PropTypes.string.isRequired,
        icons:PropTypes.string.isRequired
    }

export default NavBar;