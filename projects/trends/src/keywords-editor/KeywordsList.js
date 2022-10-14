import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../store/keywordsSlice'
import { Button } from "@mui/material";
import KeywordGroup from "./KeywordGroup";
import KeywordsEditorContainer from "./KeywordsEditorContainer";
import CircularProgress from '@mui/material/CircularProgress';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import KeywordsFilter from "./KeywordsFilter";


export default function KeywordsList() {

    const { keywordsToDisplay, addKeywords, loadingKeywords } = useSelector(state => state.keywords)


    const dispatch = useDispatch()
  
useEffect(()=>{

        console.log('keywordsToDisplay',keywordsToDisplay)
        debugger
   
    
},[keywordsToDisplay])


    useEffect(() => {
        const  getKeywords=async()=> {
            dispatch(actions.setLoadingKeywords(true))
            const response = await fetch('/.netlify/functions/crud?type=all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
    
            });
    
            const { data } = await response.json()
            const groupByGroupName = groupBy(data, 'groupName')
    debugger
            dispatch(actions.setKeywords(groupByGroupName))
            dispatch(actions.setLoadingKeywords(false))
        }
        getKeywords()
       
    }, [dispatch])

    function handleAddKeywords() {
        dispatch(actions.setAddKeywords())
    }

    async function publishKeywords(){
        const response = await fetch('/.netlify/functions/publishKeywords', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

        });
        debugger
    }
    return <Container> <Grid container style={{ marginTop: 100 }} gap={2}>
        <Grid item xs={12}>
            {!addKeywords && <div><Button onClick={handleAddKeywords}>Add Keywords</Button><Button onClick={publishKeywords}>Publish</Button></div>  }
            {!addKeywords && <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}><KeywordsFilter /></Grid>}
        </Grid>

        {addKeywords && <Grid item xs={12}><KeywordsEditorContainer /></Grid>}

        {!addKeywords && keywordsToDisplay && Object.entries(keywordsToDisplay).map((m, i) => {
     
            const groupName = m[0]
            const keywords = m[1]

            return <Grid key={i} item xs={12} md={3} sx={{ height: 400, overflow: 'scroll' }}> <KeywordGroup groupName={groupName} keywords={keywords} /></Grid>
        })}
        <Grid item xs={12}>

            {loadingKeywords && <div>Loading Keywords...<CircularProgress /></div>}
        </Grid>

    </Grid></Container>
}



function groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};



async function triggerAction({ ticket, body, gh_action_url }) {


    try {
        const response = await fetch(gh_action_url, {
            method: 'post',
            headers: {
                authorization: `token ${ticket}`,
                Accept: 'application/vnd.github.v3+json'
            },
            body
        })
        const data = await response.json()
    } catch (error) {

    }

}

//const body = JSON.stringify({ ref: 'main', inputs: { projectName: workspaceName, parameters } })

//const response = await triggerAction({ gh_action_url: `https://api.github.com/repos/webapis/coll2030/actions/workflows/generateKeywords.yml/dispatches`, ticket: token, body })