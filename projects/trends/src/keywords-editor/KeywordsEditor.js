
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';

import LoadingButton from '@mui/lab/LoadingButton';
import  { AppContext } from '../App';
import AppBarComponent from '../AppBarComponent';
export default function KeywordEditor() {
 


    return<AppContext.Consumer>{({editor,filteredGroupName,setEditorValue ,saveKeyword}) => {
        console.log('editor',editor)
console.log('filteredGroupName',filteredGroupName)
            return <div style={{ marginTop: 100, display: 'flex', flexDirection: 'column' }}>
                <AppBarComponent/>
                <TextField sx={{ marginTop: 1 }}
                    id="outlined-multiline-flexible"
                    label="Title"

                    value={editor.title}
                    onChange={setEditorValue}
                    name="title"
                />
                <TextField
                sx={{ marginTop: 1 }}
                    id="outlined-multiline-flexible"
                    label="Keywords"
                    multiline
                    maxRows={4}
                    value={editor.keywords}
                    onChange={setEditorValue}
                    name='keywords'
                />
 
                <TextField sx={{ marginTop: 1 }}
                    id="outlined-multiline-flexible"
                    label="Exclude"
                    multiline
                    maxRows={4}
                    value={editor.exclude}
                    onChange={setEditorValue}
                    name="exclude"
                />


                <Stack spacing={2} direction="row" sx={{ marginTop: 1 }}>
                    <LoadingButton component={Link} variant="contained" onClick={saveKeyword} loadingIndicator="Loading…">Save</LoadingButton>
                </Stack>

            </div>
        }}</AppContext.Consumer>

   

}