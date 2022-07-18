
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/accordionSlice'
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TreeItem from '@mui/lab/TreeItem';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip';
export default function KeywordsList() {
    const { selectedMarka, selectedSubcategory, keywords, fetchingKeywords,accordionOneValue } = useSelector(state => state.accordion)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.setFetchingKeywords(true))
        if(selectedMarka.length>0){
            
            fetch(`/keywords/marka/${selectedMarka}.json`).then((response) => { return response.json() }).then((data) => {
                const keywords = data[selectedSubcategory]
                
                dispatch(actions.setKeywords(keywords))
            })
        }

        else if(selectedMarka==='' && selectedSubcategory.length>0){
            
            fetch(`/keywords/category/${selectedSubcategory}.json`).then((response) => { return response.json() }).then((data) => {
            
                
                dispatch(actions.setKeywords(data))
            })

        }
    

    }, [])

    
    function selectKeyword({ keyword, total }) {
      //  document.getElementById("navbar").style.height = "0";
        dispatch(actions.setSelectedKeyword({ keyword, total }))
    }


    if (fetchingKeywords && keywords === null)

        return <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>


    const sortedArrayKeywords = keywords && Object.entries(keywords).sort(function (a, b) {

        var textA = a[0].toUpperCase();
        var textB = b[0].toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

 
        const groupAlfabetically = keywords && sortedArrayKeywords.reduce((prev, curr, i, arr) => {
            const alfabet = curr[0].charAt(0)
            const parentKeyword = curr[0]
            const childKeywords = curr[1]


            if (i === 0) {
                return { ...prev, [alfabet]: [{ parentKeyword, childKeywords }] }
            } else {
                if (prev[alfabet] === undefined) {
                    return { ...prev, [alfabet]: [{ parentKeyword, childKeywords }] }
                } else {
                    return { ...prev, [alfabet]: [...prev[alfabet], { parentKeyword, childKeywords }] }
                }

            }





        }, {})

        const alfabetikArray = keywords && Object.entries(groupAlfabetically)
        
        return <Grid container>
            {alfabetikArray && alfabetikArray.map((m, a) => {

                const alfabet = m[0]
                const keywords = m[1]

                return (<Grid key={a} item xs={12}>
                    <Avatar sx={{ width: 24, height: 24 }}  >{alfabet}</Avatar>
                    <TreeView
                        key={a}
                        aria-label="file system navigator"
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                        sx={{ flexGrow: 1 }}>
                        {keywords.map((mk, i) => {
                            
                            const parentKeyword = mk.parentKeyword
                            const childKeywords = Object.entries(mk.childKeywords)
                            
                            
                            return (
                                <TreeItem nodeId={parentKeyword+1} label={parentKeyword + " " + selectedSubcategory} sx={{ padding: 1 }}>
                                    {childKeywords.map((k, d) => {
                                        const keyword = k[0]
                                        const total = k[1]
                                        
                                        return <TreeItem sx={{ padding: 1 }} key={d} nodeId={d + "ss"} label={<div>{keyword} <Chip label={total} /></div>} id={keyword} onClick={() => selectKeyword({ keyword, total })} />
                                    })}

                                </TreeItem>
                            )
                        })}
                    </TreeView>

                </Grid>)
                
            })}
        </Grid>



  







}