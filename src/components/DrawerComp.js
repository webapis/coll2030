import React from "react";
import Drawer from "@mui/material/Drawer";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import catNav from '../components/categoryMenu/category-nav.json'
import CategoryIcon from '@mui/icons-material/Category';
import MarkaNav from '../components/markaMenu/marka-nav.json'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { actions } from '../store/breadcrumbSlice'
import { useDispatch, useSelector } from "react-redux";
import { ListItem } from "@mui/material";
const { tree: mnavs, mtotal } = MarkaNav[0]['nav']
const { tree: navs, total } = catNav[0]['nav']

export default function DrawerComp() {
    const drawerOpen = useSelector(state => state.breadcrumb.drawerOpen)
    const dispatch = useDispatch()
    function handleOnclose() {
        dispatch(actions.toggleDrawer())
    }
    return (
        <Drawer open={drawerOpen} onClose={handleOnclose} sx={{zIndex: 20001}}>
            <List
                sx={{ width: 300, maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        MENÜ
                    </ListSubheader>
                }
            >
                <CategoryMenu categories={navs} />
                <MarkaMenu render={({ markas, open }) => <MarkasList markas={markas} open={open} />} />
            </List>
        </Drawer>
    )
}

function CategoryMenu(props) {
    const dispatch =useDispatch()
    const categoryTabSelected =useSelector(state=>state.breadcrumb.categoryTabSelected)
    const [open, setOpen] = React.useState(false);
    const { categories } = props

    function toggle() {
  
    dispatch(actions.selectCategoryTab())
    }

    return (
        <List>
            <ListItemButton onClick={toggle}>
                <ListItemIcon>
                    <CategoryIcon />
                </ListItemIcon>
                <ListItemText >ÜRÜNLER</ListItemText>
                {categoryTabSelected ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <CategoryList categories={Object.entries(categories)} open={categoryTabSelected} />
        </List>
    )


}

function MarkaMenu(props) {
    const { render } = props
    const markaTabSelected =useSelector(state=> state.breadcrumb.markaTabSelected)
    const dispatch=useDispatch()
 


    function toggle() {

        dispatch(actions.selectMarkaTab())
    }
    return (
        <List>
            <ListItemButton onClick={toggle}>
                <ListItemIcon>
                    <CategoryIcon />
                </ListItemIcon>
                <ListItemText >MARKALAR</ListItemText>
                {markaTabSelected ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {render({ markas: mnavs, open:markaTabSelected })}
        </List>
    )
}



function MarkasList({ markas, open }) {

  
    return (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {Object.entries(mnavs).map((n, i) => {
                    const marka = n[0]
                    const markaTotal = n[1]['total']
                    const categories = Object.entries(n[1])
                    return <MarkaListItem key={i} id={marka}  markaTotal={markaTotal} title={marka} categories={categories} render={({ open, categories }) => <CategoryList open={open} categories={categories} />} />
                })}
            </List>
        </Collapse>
    )
}

function MarkaListItem(props) {
    const [open, setOpen] = React.useState(false);
    const selectedMarka =useSelector(state=>state.breadcrumb.selectedMarka)
    debugger;
    const dispatch =useDispatch()
    const { render, categories } = props
    const { title, markaTotal } = props
    function toggle() {
 
        setOpen(!open);
        dispatch(actions.selectMarka({selectedMarka:title}))
    }
    return (
        <>
            <ListItem disablePadding secondaryAction={<ListItemText >{markaTotal}</ListItemText>}>
                <ListItemButton onClick={() => toggle()} id={title} selected={selectedMarka===title}>
                    <ListItemIcon>
                        {!selectedMarka===title ? <ChevronRightIcon /> : <ExpandMore />}
                    </ListItemIcon>
                    <ListItemText sx={{ textTransform: 'uppercase' }}>{title}</ListItemText>
                </ListItemButton>
            </ListItem>
            {render({ open:selectedMarka===title, categories })}
        </>
    )
}


function CategoryList({ categories, open }) {
    const dispatch = useDispatch()
    const selectedCategory =useSelector(state=>state.breadcrumb.selectedCategory)
    function handleCategoryClick(category, subcategories) {
        dispatch(actions.selectCategory({ subcategories, selectedCategory: category }))
    }
    return (<Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            {Object.entries(categories).filter((f, i) => i > 0).map((n, i) => {
                const category = n[1][0]
                const categoryTotal = n[1][1]['total']
                const subcategories = n[1][1]
                return (<ListItem key={i} disablePadding secondaryAction={<span style={{ color: "#9e9e9e" }}>{categoryTotal}</span>}>
                    <ListItemButton selected={selectedCategory===category} onClick={() => handleCategoryClick(category, subcategories)} id={category}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText style={{ textTransform: 'capitalize' }}>{category.replace('-', ' ')}</ListItemText>
                    </ListItemButton>
                </ListItem>
                )
            })}
        </List>
    </Collapse>)
}


