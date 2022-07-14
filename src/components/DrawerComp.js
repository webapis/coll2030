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
import catNav from './categoryMenu/category-nav.json'
import CategoryIcon from '@mui/icons-material/Category';
import MarkaNav from './MarkaMenu/marka-nav.json'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { actions } from '../store/breadcrumbSlice'
import { useDispatch, useSelector } from "react-redux";
import { ListItem } from "@mui/material";
import placeholders from "./imageComponent/placeholders";

const {markas,totalByMarka} = MarkaNav[0]['nav']


const { categories, totalByCategory } = catNav[0]['nav']

export default function DrawerComp() {
    const drawerOpen = useSelector(state => state.breadcrumb.drawerOpen)
    const dispatch = useDispatch()
    function handleOnclose() {
        dispatch(actions.toggleDrawer())
    }
    return (
        <Drawer open={drawerOpen} onClose={handleOnclose} sx={{ zIndex: 20001 }}>
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
                <CategoryMenu categories={categories} />
                <MarkaMenu render={({ markas, open }) => <MarkasList markas={markas} open={open} />} />
            </List>
        </Drawer>
    )
}

function CategoryMenu(props) {
    const dispatch = useDispatch()
    const categoryTabSelected = useSelector(state => state.breadcrumb.categoryTabSelected)
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
                <ListItemText >ÜRÜNLER ({totalByCategory})</ListItemText>
                {categoryTabSelected ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <CategoryList categories={categories} open={categoryTabSelected} />
        </List>
    )


}

function MarkaMenu(props) {
    const { render } = props
    const markaTabSelected = useSelector(state => state.breadcrumb.markaTabSelected)
    const dispatch = useDispatch()

  
    function toggle() {

        dispatch(actions.selectMarkaTab())
    }
    return (
        <List>
            <ListItemButton onClick={toggle}>
                <ListItemIcon>
                    <CategoryIcon />
                </ListItemIcon>
                <ListItemText >MARKA ({totalByMarka})</ListItemText>
                {markaTabSelected ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {render({ markas, open: markaTabSelected })}
        </List>
    )
}



function MarkasList({markas,open }) {

 

    return (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {Object.entries(markas).map((m, i) => {
                    const  marka= m[0]
                    
                    
                    const  totalByCatory= m[1]['totalByCatory']
                    const categories=m[1]['categories']
                    
                
                    return {
                        marka,
                        totalByCatory,
                        categories
                    }
                }).sort(function (a, b) {
                    var textA = a.marka.toUpperCase();
                    var textB = b.marka.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                }).map((n, i) => {
                    const { marka, totalByCatory, categories } = n
                    

                 
                    return <MarkaListItem key={i} id={marka} markaTotal={totalByCatory} title={marka} categories={categories} render={({ open, categories }) => <CategoryList open={open} categories={categories} />} />
                })}
            </List>
        </Collapse>
    )
}

function MarkaListItem(props) {
    const [open, setOpen] = React.useState(false);
    const selectedMarka = useSelector(state => state.breadcrumb.selectedMarka)

    const dispatch = useDispatch()
    const { render, categories } = props
    const { title, markaTotal } = props
    const markaIconUrl =placeholders[title].logo
    function toggle() {
        setOpen(!open);
        dispatch(actions.selectMarka({ selectedMarka: title }))
    }
    return (
        <>
            <ListItem disablePadding secondaryAction={<ListItemText >{markaTotal}</ListItemText>}>
                <ListItemButton onClick={() => toggle()} id={title} selected={selectedMarka === title}>
                    <ListItemIcon>
                        {!selectedMarka === title ? <ChevronRightIcon /> : <ExpandMore />}
                    </ListItemIcon>
                   
                 <img src={markaIconUrl.image} width={markaIconUrl.width} height={markaIconUrl.heigth}/>
                </ListItemButton>
            </ListItem>
            {render({ open: selectedMarka === title, categories })}
        </>
    )
}


function CategoryList({ categories, open }) {


    const dispatch = useDispatch()
    const selectedCategory = useSelector(state => state.breadcrumb.selectedCategory)
    function handleCategoryClick(category, subcategories) {
        dispatch(actions.selectCategory({ subcategories, selectedCategory: category }))
    }
    return (<Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            {Object.entries(categories).map((m, i) => {
                
                const category = m[0]
                const totalByCategory = m[1]['totalBySubcategory']
                const subcategories = m[1]['subcategories']
                
                return {
                    category,
                    totalByCategory,
                    subcategories
                }
            }).sort(function (a, b) {
           
                var textA = a.category.toUpperCase();
                var textB = b.category.toUpperCase();
            
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }).map((n, i) => {

                const { category, totalByCategory, subcategories } = n
                
                return (<ListItem key={i} disablePadding secondaryAction={<span style={{ color: "#9e9e9e" }}>{totalByCategory}</span>}>
                    <ListItemButton selected={selectedCategory === category} onClick={() => handleCategoryClick(category, subcategories)} id={category}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText style={{ textTransform: 'capitalize' }}>{category}</ListItemText>
                    </ListItemButton>
                </ListItem>
                )
            })}
        </List>
    </Collapse>)
}


