import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../store/keywordsSlice'
import { Button } from "@mui/material";
import KeywordGroup from "./KeywordGroup";
import KeywordsEditorContainer from "./KeywordsEditorContainer";
import CircularProgress from '@mui/material/CircularProgress';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import KeywordsFilter from "./KeywordsFilter";
export default function KeywordsList() {
    const { keywords,keywordsToDisplay,addKeywords,loadingKeywords } = useSelector(state => state.keywords)
  
console.log('keywords',keywords)
    const dispatch = useDispatch()

    useEffect(() => {
        getKeywords()
    }, [])


    async function getKeywords() {
        dispatch(actions.setLoadingKeywords(true))
        const response = await fetch('/.netlify/functions/crud?type=all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        });

        const { data } = await response.json()
        const groupByGroupName = groupBy(data, 'groupName')

        dispatch(actions.setKeywords(groupByGroupName))
        dispatch(actions.setLoadingKeywords(false))
    }

    function handleAddKeywords(){
        dispatch(actions.setAddKeywords())
    }

    return<Container> <Grid container  style={{ marginTop: 100 }} gap={2}>
<Grid item xs={12}>
{!addKeywords && <Button onClick={handleAddKeywords}>Add Keywords</Button>}
{!addKeywords &&<Grid item xs={12} style={{display:'flex',justifyContent:'flex-end'}}><KeywordsFilter/></Grid> }
</Grid>
    
        {addKeywords && <Grid item xs={12}><KeywordsEditorContainer/></Grid>}

        {!addKeywords && Object.entries(keywordsToDisplay).map((m,i) => {
            const groupName = m[0]
            const keywords = m[1]
      
            return <Grid key={i} item xs={12} md={3}   sx={{height:400,overflow:'scroll'}}> <KeywordGroup groupName={groupName} keywords={keywords} /></Grid>
        })}
        <Grid item  xs={12}>

        {loadingKeywords &&<div>Loading Keywords...<CircularProgress/></div>}
        </Grid>
       
    </Grid></Container>
}



function groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};