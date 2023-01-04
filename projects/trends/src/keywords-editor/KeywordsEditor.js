
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';

import LoadingButton from '@mui/lab/LoadingButton';
import { AppContext } from '../KeywordsRoute';

export default function KeywordEditor() {
    const navigate = useNavigate()


    return <AppContext.Consumer>{({ editor, filteredGroupName, setEditorValue, saveKeyword }) => {


        async function handleSave() {
            await saveKeyword()
            debugger
      
            navigate('/keywords')
            debugger
        }
        return <div style={{ marginTop: 100, display: 'flex', flexDirection: 'column' }}>
         
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
                <LoadingButton component={Link} variant="contained" onClick={handleSave} loadingIndicator="Loading…">Save</LoadingButton>
            </Stack>

        </div>
    }}</AppContext.Consumer>



}