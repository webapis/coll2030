


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
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid'
import ListItemButton from '@mui/material/ListItemButton';
export default function KeywordsList() {
    const { selectedMarka, selectedSubcategory, keywords, fetching } = useSelector(state => state.accordion)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.setFetchState(true))
        fetch(`/keywords/marka/${selectedMarka}.json`).then((response) => { return response.json() }).then((data) => {
            const keywords = data[selectedSubcategory]
            debugger
            dispatch(actions.setKeywords(keywords))
        })

    }, [])

    function selectKeyword({ keyword, total }) {

        dispatch(actions.setSelectedKeyword({ keyword, total }))
    }


    if (fetching && keywords === null)

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
        debugger
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
                            debugger
                            debugger
                            return (
                                <TreeItem nodeId={parentKeyword+1} label={parentKeyword + " " + selectedSubcategory} sx={{ padding: 1 }}>
                                    {childKeywords.map((k, d) => {
                                        const keyword = k[0]
                                        const total = k[1]
                                        debugger
                                        return <TreeItem sx={{ padding: 1 }} key={d} nodeId={d + "ss"} label={keyword} id={keyword} onClick={() => selectKeyword({ keyword, total })} />
                                    })}

                                </TreeItem>
                            )
                        })}
                    </TreeView>

                </Grid>)
                debugger
            })}
        </Grid>



  







}