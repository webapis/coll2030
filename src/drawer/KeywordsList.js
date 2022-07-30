
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/accordionSlice'
import Container from '@mui/material/Container'
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
import NavList from './NavList';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
export default function KeywordsList() {
    const { selectedMarka, selectedSubcategory, keywords, fetchingKeywords, accordionOneValue, navKeywords } = useSelector(state => state.accordion)
    const dispatch = useDispatch()
    const [contentHeight, setContentHeight] = useState(80)

    useEffect(() => {
        fetch('./nav-keywords/start.json').then((response) => response.json()).then(data => {
            const { keywords, navMatch } = data
            const map = Object.entries(keywords).map((m) => { return { ...m[1], keyword: m[0] } })

            const navKeywords = map.reduce((prev, curr) => {

                if (prev[curr.group] === undefined) {
                    return { ...prev, [curr.group]: { keywords: [{ keyword: curr.keyword, index: curr.index, count: curr.count }] } }
                } else {


                    return {
                        ...prev, [curr.group]: { keywords: [...prev[curr.group].keywords, { keyword: curr.keyword, index: curr.index, count: curr.count }] }
                    }
                }

            }, {})

            dispatch(actions.setNavkeywords(navKeywords))

        })
    }, [])


    return <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' ,  height:'100vh',overflowY:'auto'}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                Nested List Items
            </ListSubheader>
        }
    >{
            navKeywords && Object.entries(navKeywords).map((m) => {
                const groupName = m[0]
                const keywords = m[1]['keywords']
                return <NavList groupName={groupName} keywords={keywords} />



            })

        }</List>


}




// <NavList groupName={groupName} keywords={keywords} />