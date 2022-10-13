import * as React from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/keywordsSlice'
import LoadingButton from '@mui/lab/LoadingButton';
import groupNames from './groupNames';
export default function KeywordsEditorContainer() {

  const dispatch = useDispatch()
  const { editor,postingNewKeyword,keywords } = useSelector(state => state.keywords)

  function handleChange(e) {
    const { name, value } = e.target
    dispatch(actions.setEditorValue({ name, value }))
  }
  dispatch(actions.setPostingNewKeyword(true))
  async function handleSave() {
    const {_id:ID}=editor
    debugger
    if(ID){
      const response = await fetch('/.netlify/functions/crud', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
         },
        body: JSON.stringify(editor)
      });
  
      const result =await response.json()
      
      const nextState ={...keywords,[editor.groupName]:[...keywords[editor.groupName].filter(f=>f._id!==ID),{...editor,_id:ID}]}
      
      dispatch(actions.setUpdatedKeyword({nextState}))
      dispatch(actions.setKeywordsToDisplay({[editor.groupName]:[...keywords[editor.groupName].filter(f=>f._id!==ID),{...editor,_id:ID}]}))
      dispatch(actions.setPostingNewKeyword(true))
    }else{
      const response = await fetch('/.netlify/functions/crud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
         },
        body: JSON.stringify(editor)
      });
  
      const {_id} =await response.json()
      
      const nextState ={...keywords,[editor.groupName]:[...keywords[editor.groupName],{...editor,_id}]}
      
      dispatch(actions.setAddedKeyword(nextState))
      dispatch(actions.setKeywordsToDisplay({[editor.groupName]:[...keywords[editor.groupName],{...editor,_id}]}))
      dispatch(actions.setPostingNewKeyword(true))
      
    }


 
  
  }

  return <div style={{ marginTop: 100, display: 'flex', flexDirection: 'column'}}>

    <TextField
      id="outlined-multiline-flexible"
      label="Keywords"
      multiline
      maxRows={4}
      value={editor.keywords}
      onChange={handleChange}
      name='keywords'
    />
    <TextField sx={{ marginTop: 1 }}
      id="outlined-multiline-flexible"
      label="Title"

      value={editor.title}
      onChange={handleChange}
      name="title"
    />
    <TextField sx={{ marginTop: 1 }}
      id="outlined-multiline-flexible"
      label="Exclude"
      multiline
      maxRows={4}
      value={editor.exclude}
      onChange={handleChange}
      name="exclude"
    />

    <FormControl fullWidth sx={{ marginTop: 1 }}>
      <InputLabel id="demo-simple-select-label">Keyword type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={editor.keywordType}
        label="Keyword Type"
        onChange={handleChange}
        name="keywordType"
      >
        <MenuItem value={'category'}>category</MenuItem>
        <MenuItem value={'keyword'}>keyword</MenuItem>
        <MenuItem value={'marka'}>marka</MenuItem>
        <MenuItem value={'fiyat'}>fiyat</MenuItem>
      </Select>
    </FormControl>


    {editor.keywordType === 'category' && <FormControl fullWidth sx={{ marginTop: 1 }}>
      <InputLabel id="demo-simple-select-label">Category Group Name</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={editor.groupName}
        label="Category Group Name"
        onChange={handleChange}
        name="groupName"
      >
      {groupNames.filter(f=>f.keywordsType==='category').map(g=>{
          return <MenuItem value={g.groupName}>{g.groupName}</MenuItem>
        })}
        
    


      </Select>
    </FormControl>}

    {editor.keywordType === 'keyword' && <FormControl fullWidth sx={{ marginTop: 1 }}>
      <InputLabel id="demo-simple-select-label">Keyword Group Name</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={editor.groupName}
        label="Keyword Group Name"
        onChange={handleChange}
        name="groupName"
      >
      {groupNames.filter(f=>f.keywordsType==='keywords').map(g=>{
          return <MenuItem value={g.groupName}>{g.groupName}</MenuItem>
        })}
      </Select>
    </FormControl>}

    {editor.keywordType === 'category' &&
      <FormControl fullWidth sx={{ marginTop: 1 }}>
        <InputLabel id="demo-simple-select-label">Function Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={editor.functionName}
          label="Function Name"
          onChange={handleChange}
          name="functionName"
        >
          <MenuItem value="one">1</MenuItem>
          <MenuItem value="two">2</MenuItem>
          <MenuItem value="three">3</MenuItem>
          <MenuItem value="four">4</MenuItem>
          <MenuItem value="five">5</MenuItem>
          <MenuItem value="six">6</MenuItem>
          <MenuItem value="seven">7</MenuItem>
          <MenuItem value="eight">8</MenuItem>
          <MenuItem value="nine">9</MenuItem>
          <MenuItem value="ten">10</MenuItem>
        </Select>
      </FormControl>

    }


    <Stack spacing={2} direction="row" sx={{ marginTop: 1 }}>
      <LoadingButton  variant="contained" onClick={handleSave}  loadingIndicator="Loading…">Save</LoadingButton>
    </Stack>

  </div>

}