
import Tabs from '@mui/material/Tabs'
import Tab  from '@mui/material/Tab'
import { actions } from '../store/mainSlice'
import { useDispatch,useSelector } from 'react-redux'
export default function TabContainer(){
    const dispatch =useDispatch()
    const selectedTab = useSelector(state=>state.main.selectedTab)

    return (<Tabs value={selectedTab} onChange={(event,newValue)=>{
        dispatch(actions.setTab(newValue))
        debugger 
}}>
        <Tab color='inherit' value={0} label="collected"  />
        <Tab color='inherit' value={1} label="updated"/>
        <Tab color='inherit' value={2} label="deleted"/>
        <Tab color='inherit' value={3} label="newdata"/>
    </Tabs>)
}