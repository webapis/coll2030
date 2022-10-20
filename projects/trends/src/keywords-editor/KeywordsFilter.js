
import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Chip from '@mui/material/Chip';
import { Button } from '@mui/material';
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


  return <AppContext.Consumer style={{ width: 400 }}>{({ filterKeyword, groupNames, showDisabled, showDisabledIsChecked, filteredGroupName,clearFilter,publishKeywords }) => {



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
      <FormGroup><Button onClick={publishKeywords}>Publish</Button></FormGroup>
      <FormGroup>
        <FormControlLabel control={<Checkbox checked={showDisabledIsChecked} onChange={showDisabled} />} label="show disabled" />

      </FormGroup>
    </div>
  }}</AppContext.Consumer>



}


//https://reactjsexample.com/a-react-search-box-that-filters-the-provided-array-of-objects/

