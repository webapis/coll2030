
import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Chip from '@mui/material/Chip';

import { AppContext } from '../App';




export default function KeywordsFilter() {


  const formatResult = (item) => {

    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
      </>
    )
  }


  return <AppContext.Consumer style={{ width: 400 }}>{({ filterKeyword, groupNames, showDisabled, showDisabledIsChecked, filteredGroupName,clearFilter }) => {



    return <div style={{ marginBottom: 10, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
      <FormGroup style={{ marginBottom: 10, width: 400 }}>
        <ReactSearchAutocomplete
          items={groupNames}
          onSelect={filterKeyword}

          autoFocus
          formatResult={formatResult}
        />
      </FormGroup>
      <FormGroup>{filteredGroupName.groupName !==''&& <Chip label={filteredGroupName.name} onDelete={clearFilter} />}</FormGroup>
      <FormGroup>
        <FormControlLabel control={<Checkbox checked={showDisabledIsChecked} onChange={showDisabled} />} label="show disabled" />

      </FormGroup>
    </div>
  }}</AppContext.Consumer>



}


//https://reactjsexample.com/a-react-search-box-that-filters-the-provided-array-of-objects/
/*
export default function KeywordsFilter() {





  return <div style={{ display: 'flex', justifyContent: 'end', marginBottom: 10 }}>
    <AppContext.Consumer>{({filterKeyword,groupNames})=>{

      const filteredGroupName =JSON.parse(localStorage.getItem('filteredGroupName'))

      return    <Autocomplete
   
      inputValue={filteredGroupName.groupName}

      disablePortal
      id="combo-box-demo"
      options={groupNames.map(m => { return { label: m.groupName } })}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Group Names" />}
      onInputChange={filterKeyword}
    
    />
    }}</AppContext.Consumer>
 
  </div>

}
*/