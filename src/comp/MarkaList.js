
import { useSelector, useDispatch } from 'react-redux'
import Chip from '@mui/material/Chip';

import Grid from '@mui/material/Grid'
import markajson from '../marka-nav.json'
import Avatar from '@mui/material/Avatar';
import {actions} from '../store/mainTabSlice'
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
                return [<Grid key={m[0].charAt(0).toUpperCase()} item sx={{ margin: 2 }} xs={12}> <Avatar sx={{ width: 24, height: 24 }} key={i} onClick={() => { }}  >{m[0].charAt(0).toUpperCase()}</Avatar></Grid>,
                <Grid key={m[0]} item sx={{ margin: 1 }}> <Chip key={i} onClick={selectMarka} label={m[0]} id={m[0]} /></Grid>
                ]
            }
            else {
                const prevChar = sortedmarkasArray[i - 1][0].charAt(0)

            
                if (prevChar === m[0].charAt(0)) {
                
                    return <Grid key={m[0]} item sx={{ margin: 1 }}> <Chip key={i} onClick={selectMarka} label={m[0]} id={m[0]} /></Grid>
                } else {
                    return [<Grid key={m[0].charAt(0).toUpperCase()} sx={{ margin: 2 }} item xs={12}> <Avatar sx={{ width: 24, height: 24 }} key={i} onClick={() => { }}  >{m[0].charAt(0).toUpperCase()}</Avatar></Grid>,
                    <Grid key={m[0]} item sx={{ margin: 1 }}> <Chip key={i} onClick={selectMarka} label={m[0]} id={m[0]} /></Grid>]
                }
              

            }



        })

        }
    </Grid>
}