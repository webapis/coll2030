
import { useSelector, useDispatch } from 'react-redux'
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import Grid from '@mui/material/Grid'
import markajson from '../marka-nav.json'
import Avatar from '@mui/material/Avatar';
import { actions } from '../store/accordionSlice'
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import { useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const { nav: { markas:mkas, totalByMarka } } = markajson[0]


export default function MarkaList() {
    const dispatch = useDispatch()
 const {markas} =useSelector(state=> state.accordion)
  


    useEffect(()=>{
        const markasArray = Object.entries(mkas)
        const sortedmarkasArray = markasArray.sort(function (a, b) {
    
            var textA = a[0].toUpperCase();
            var textB = b[0].toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })
    
        const groupAlfabetically = sortedmarkasArray.reduce((prev, curr, i, arr) => {
            const alfabet = curr[0].charAt(0)
            const marka = curr[0]
            const total = curr[1]['totalByCatory']
    
            if (i === 0) {
                return { ...prev, [alfabet]: [{ marka, total }] }
            } else {
                if (prev[alfabet] === undefined) {
                    return { ...prev, [alfabet]: [{ marka, total }] }
                } else {
                    return { ...prev, [alfabet]: [...prev[alfabet], { marka, total }] }
                }
    
            }
    
    
        
    
        }, {})

        const alfabetikArray =Object.entries(groupAlfabetically)

        setTimeout(()=>{
            dispatch(actions.setMarkas(alfabetikArray))
        },1000)
     
    },[])

    function selectMarka(e) {
        const { id } = e.currentTarget

        dispatch(actions.setMarka(id))
    }

    
    if (markas.length === 0) {

        return (

            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }
    return <Grid container>
        {markas.map((m, a) => {
            const alfabet =m[0]
            const markaNames =m[1]

            return (<Grid key={a} item xs={12}> 
             <Avatar sx={{ width: 24, height: 24 }}  >{alfabet}</Avatar>
                <List>
                    {markaNames.map((mk,i)=>{
                        const markaName =mk.marka

                        return (
                            <ListItemButton key={i}  onClick={selectMarka} id={markaName}
                          >
                            <ListItemText primary={markaName} sx={{ textTransform: 'uppercase' }}/>
                          </ListItemButton>
                        )
                    })}
                </List>
              
            </Grid>)
     
            })}
    </Grid>
}







/*

import { useSelector, useDispatch } from 'react-redux'
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Grid from '@mui/material/Grid'
import markajson from '../marka-nav.json'
import Avatar from '@mui/material/Avatar';
import {actions} from '../store/accordionSlice'
import Link from '@mui/material/Link';
const { nav: { markas, totalByMarka } } = markajson[0]
console.log('markajson', markas)

export default function MarkaList() {
    const dispatch =useDispatch()
    const markasArray = Object.entries(markas)
    const sortedmarkasArray = markasArray.sort(function (a, b) {

        var textA = a[0].toUpperCase();
        var textB = b[0].toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })



    function selectMarka(e) {
        const {id} =e.currentTarget
  
        dispatch(actions.setMarka(id))
    }

    return <Grid container>
        {sortedmarkasArray.map((m, i) => {


            if (i === 0) {
                return [<Grid key={m[0].charAt(0).toUpperCase()} item sx={{ margin: 0 }} xs={12}> <Avatar sx={{ width: 24, height: 24 }} key={i} onClick={() => { }}  >{m[0].charAt(0).toUpperCase()}</Avatar></Grid>,
                <Grid xs={12} key={m[0]} item sx={{ margin: 0 }}> <Link  key={i} onClick={selectMarka}  id={m[0]} >{m[0]}</Link></Grid>
                ]
            }
            else {
                const prevChar = sortedmarkasArray[i - 1][0].charAt(0)

            
                if (prevChar === m[0].charAt(0)) {
                
                    return <Grid xs={12} key={m[0]} item sx={{ margin: 0 }}> <Link key={i} onClick={selectMarka}  id={m[0]} >{m[0]}</Link></Grid>
                } else {
                    return [<Grid key={m[0].charAt(0).toUpperCase()} sx={{ margin: 0 }} item xs={12}> <Avatar sx={{ width: 24, height: 24 }} key={i} onClick={() => { }}  >{m[0].charAt(0).toUpperCase()}</Avatar></Grid>,
                    <Grid xs={12} key={m[0]} item sx={{ margin: 0 }}> <Link key={i} onClick={selectMarka}  id={m[0]} >{m[0]}</Link></Grid>]
                }
              

            }



        })

        }
    </Grid>
}
*/