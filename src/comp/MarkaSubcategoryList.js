
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid'
import MarkaNav from '../marka-nav.json'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../store/mainTabSlice'
const { markas, totalByMarka } = MarkaNav[0]['nav']
export default function MarkaSabcategoryList() {
    const { selectedMarka } = useSelector(state => state.maintab)
    const dispatch = useDispatch()

    const markasArray = Object.entries(markas[selectedMarka]['categories'])
    const joincategories = markasArray.reduce((prev, curr) => {

        const arr = Object.entries(curr[1]['subcategories']).map((m) => { return { subcategory: m[0], total: m[1]['count'] } })

        return [...prev, ...arr]


    }, [])

    const sortedsubcategories = joincategories.sort(function (a, b) {
        var textA = a['subcategory'].toUpperCase();
        var textB = b['subcategory'].toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

    function selectSubcategory(subcategory,totalSubcategory) {
      
        dispatch(actions.setSubcategory({subcategory,totalSubcategory}))
    }

    return <Grid container>
        {sortedsubcategories.map((m, i) => {
            const subcategory = m['subcategory']
            const total =m['total']
            const currentChar = subcategory.charAt(0)

            if (i === 0) {

                return [<Grid key={currentChar} item sx={{ margin: 2 }} xs={12}> <Avatar sx={{ width: 24, height: 24 }} key={i} onClick={() => { }}  >{subcategory.charAt(0).toUpperCase()}</Avatar></Grid>,
                <Grid key={subcategory} item sx={{ margin: 1 }}> <Chip key={i} onClick={()=>selectSubcategory(subcategory,total)} label={subcategory} id={subcategory} /></Grid>
                ]
            }
            else {
                const prevChar = sortedsubcategories[i - 1]['subcategory'].charAt(0)


                if (prevChar === currentChar) {

                    return <Grid key={subcategory} item sx={{ margin: 1 }}> <Chip key={i} onClick={()=>selectSubcategory(subcategory,total)} label={subcategory} id={subcategory} /></Grid>
                } else {

                    return [<Grid key={currentChar} sx={{ margin: 2 }} item xs={12}> <Avatar sx={{ width: 24, height: 24 }} key={i} onClick={() => { }}  >{subcategory.charAt(0).toUpperCase()}</Avatar></Grid>,
                    <Grid key={subcategory} item sx={{ margin: 1 }}> <Chip key={i} onClick={()=>selectSubcategory(subcategory,total)} label={subcategory} id={subcategory} /></Grid>]
                }
            }
        })
        }
    </Grid>


}