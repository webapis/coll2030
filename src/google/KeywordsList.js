
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/accordionSlice'
//import TreeView from '@mui/lab/TreeView';
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import ChevronRightIcon from '@mui/icons-material/ChevronRight';
//import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
//import Box from '@mui/material/Box';
//import TreeItem from '@mui/lab/TreeItem';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid'
//import Chip from '@mui/material/Chip';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
export default function KeywordsList() {
    const { selectedMarka, selectedSubcategory, keywords, fetchingKeywords, accordionOneValue } = useSelector(state => state.accordion)
    const dispatch = useDispatch()





    function selectKeyword({ keyword, total,childkeywords,title }) {
       //   document.getElementById("navbar").style.height = "0";
       document.getElementById('static-nav').style.visibility="visible"
        dispatch(actions.setSelectedKeyword({ keyword, parentKeyword: keyword, total,childkeywords,title }))
    }



    const sortedArrayKeywords = keywords && Object.entries(keywords).sort(function (a, b) {

        var textA = a[0].toUpperCase();
        var textB = b[0].toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

    const groupAlfabetically = keywords && sortedArrayKeywords.reduce((prev, curr, i, arr) => {
        const alfabet = curr[0].charAt(0)
        const parentKeyword = curr[0]
        const childKeywords = curr[1]['keywords']
        const title = curr[1]['title'] ? curr[1]['title'] : parentKeyword
    


        if (i === 0) {
            return { ...prev, [alfabet]: [{ parentKeyword, childKeywords,title }] }
        } else {
            if (prev[alfabet] === undefined) {
                return { ...prev, [alfabet]: [{ parentKeyword, childKeywords,title }] }
            } else {
                return { ...prev, [alfabet]: [...prev[alfabet], { parentKeyword, childKeywords,title }] }
            }

        }





    }, {})

    const alfabetikArray = keywords && Object.entries(groupAlfabetically)

    return <Grid container>
        {alfabetikArray && alfabetikArray.map((m, a) => {

            const alfabet = m[0]
            const keywords = m[1]
   
            return (<Grid key={a} item xs={12}>
                {/* <Avatar sx={{ width: 24, height: 24 }}  >{alfabet}</Avatar> */}
      
                    {keywords.map((mk, i) => {

                        const keyword = mk.parentKeyword
                        const title =mk.title
                        const total = mk.childKeywords[keyword]
                        const childkeywords= Object.entries(mk.childKeywords)
                  

                        return [
                            <ListItem key={i} component="div" disablePadding>
                                <ListItemButton onClick={() => selectKeyword({ keyword, total,childkeywords,title })}>
                                    <ListItemText primary={<div style={{display:'flex'}}> <Typography variant="overline" style={{minWidth:150,flex:2}}>{title.substring(0).toUpperCase()}</Typography><span style={{color: '#9e9e9e', padding:2, fontSize:14}}>{total}</span></div>} />
                                </ListItemButton>
                            </ListItem>,
                            <Divider variant="middle" />
                        ]
                    })}
             

            </Grid>)

        })}
    </Grid>


}