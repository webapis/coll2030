
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import groupNames from './groupNames';
import { useDispatch,useSelector } from 'react-redux';
import {actions} from '../store/keywordsSlice'
export default function KeywordsFilter(){
const dispatch=useDispatch()
const {filteredGroupName,keywords}=useSelector(state=>state.keywords)

function handleFilter(event,newInputValue){
    let filtered ={}
    if(newInputValue===''){
        filtered=keywords
    }else{

        for(let k in keywords){
            if(k===newInputValue){
             filtered[k]=keywords[k]
       
             break;
            }
     
        }
    }
    const keywordsToDisplay=Object.entries(filtered)[0][1]
    const groupName=Object.entries(filtered)[0][0]
debugger
    dispatch(actions.setKeywordsFilter({groupName,[groupName]:keywordsToDisplay}))
}
    return (
        <Autocomplete
            inputValue={filteredGroupName}
          disablePortal
          id="combo-box-demo"
          options={groupNames.map(m=>{return {label:m.groupName} })}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Group Names" />}
          onInputChange={handleFilter}
        />
      );
}