import {
    SEARCH_USERS,
    SET_LOADING,
    
    LOAD_USERS
   } from '../types';

   // eslint-disable-next-line import/no-anonymous-default-export
   export default (state,action)=>{
       switch(action.type){

           case SEARCH_USERS:
                return {
                    ...state,
                    users:action.payload,
                    loading:false
                };

           case SET_LOADING:
               return{
                   ...state,
                   loading:true
               }

            case LOAD_USERS:
                return{
                    ...state,
                    users:action.payload,
                    loading:false
                }
            default:
                return state;
       }
   }