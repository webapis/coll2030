
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import groupNames from './groupNames';
import { useDispatch,useSelector } from 'react-redux';
import {actions} from '../store/keywordsSlice'
export default function KeywordsFilter(){
const dispatch=useDispatch()
const {filteredGroupName,keywords}=useSelector(state=>state.keywords)
debugger
function handleFilter(event,newInputValue){
    let filtered ={}
    for(let k in keywords){
        if(k===newInputValue){
         filtered[k]=keywords[k]
         debugger
         break;
        }
 
    }
debugger
    dispatch(actions.setKeywordsFilter(filtered))
}
    return (
        <Autocomplete
      
          disablePortal
          id="combo-box-demo"
          options={groupNames.map(m=>{return {label:m.groupName} })}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Group Names" />}
          onInputChange={handleFilter}
        />
      );
}