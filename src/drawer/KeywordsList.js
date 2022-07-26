
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/accordionSlice'
//import TreeView from '@mui/lab/TreeView';
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
//import TreeItem from '@mui/lab/TreeItem';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Button } from '@mui/material';

export default function KeywordsList() {
    const { selectedMarka, selectedSubcategory, keywords, fetchingKeywords, accordionOneValue } = useSelector(state => state.accordion)
    const dispatch = useDispatch()
    const [contentHeight, setContentHeight] = useState(80)

    useEffect(() => {

        if (selectedSubcategory.length > 0) {

            dispatch(actions.setFetchingKeywords(true))
            setTimeout(() => {

                if (selectedMarka.length > 0) {
                    fetch(`/keywords/marka/${selectedMarka}.json`).then((response) => { return response.json() }).then((data) => {
                        const keywords = data[selectedSubcategory]

                        dispatch(actions.setKeywords(keywords))
                    })
                }
                else if (selectedMarka === '' && selectedSubcategory.length > 0) {
                    fetch(`/keywords/category/${selectedSubcategory}.json`).then((response) => { return response.json() }).then((data) => {
                        dispatch(actions.setKeywords(data))
                    })

                }


            }, 500)

        }


    }, [selectedSubcategory])


    function selectKeyword({ keyword, total, childkeywords, title }) {
        //   document.getElementById("navbar").style.height = "0";
      //  document.getElementById('static-nav').style.visibility = "visible"
        dispatch(actions.setSelectedKeyword({ keyword, parentKeyword: keyword, total, childkeywords, title }))
    }




    const mapgroupandtitle = keywords && Object.entries(keywords).map((curr, i, arr) => {

        const parentKeyword = curr[0]
        const childKeywords = curr[1]['keywords']
        const title = curr[1]['title'] ? curr[1]['title'].trim() : parentKeyword.trim()
        const group = curr[1]['group'] ? curr[1]['group'].trim() : parentKeyword.trim()

        return { parentKeyword, childKeywords, title, group }

    }).sort(function (a, b) {

        var textA = a.title.toUpperCase();
        var textB = b.title.toUpperCase();

        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

    const reduceByGroup = mapgroupandtitle && mapgroupandtitle.reduce((prev, curr, i) => {


        const group = curr['group']
        const parentKeyword = curr['parentKeyword']
        const title = curr['title']
        const childKeywords = curr['childKeywords'] ? curr['childKeywords'] : []
        if (prev[group] === undefined) {
            prev[group] = {}

        }
        if (prev[group][parentKeyword] === undefined) {
            prev[group][parentKeyword] = {}

        }
        if (prev[group][parentKeyword][childKeywords] === undefined) {
            prev[group][parentKeyword][childKeywords] = {}

        }

        return { ...prev, [group]: { ...prev[group], [parentKeyword]: { ...prev[group][parentKeyword], childKeywords: { ...prev[group][parentKeyword].childKeywords, ...childKeywords }, title } } }


    }, {})

    if (fetchingKeywords && keywords === null) {


        return (

            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )

    }

    return <Grid container spacing={1}>{reduceByGroup && Object.entries(reduceByGroup).map((mk, i) => {
        try {

            const group = mk[0]
            const parentKeys = Object.entries(mk[1])

            return <Grid item xs={12}>
                <Card >
                    <CardContent>
                        <Divider textAlign="left">{group}</Divider>
                        <div >
                            {parentKeys.map((m) => {
                                const parentKeyword = m[0]
                                const childkeywords = m[1]['childKeywords']
                                const title = m[1]['title']
                              const total =Object.entries(childkeywords).find(f=>f[0]===parentKeyword)[1]

            
                                return <Chip onClick={()=>selectKeyword({ keyword:parentKeyword, total, childkeywords, title })} sx={{ margin: 1 }} label={parentKeyword} />
                            })}
                          
                        </div>
                
                    </CardContent>

                </Card >
            </Grid>


        } catch (error) {

        }
    })}</Grid>





}

