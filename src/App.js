import AppBar from "./drawer/AppBar"
import TemporaryDrawer from "./drawer/TemporaryDrawer"
import KeywordsList from "./drawer/KeywordsList"
import {useSelector} from 'react-redux'
import {actions} from './store/accordionSlice'
import ProductList from './drawer/ProductList'
export default function App() {
    const {selectedSubcategory,parentKeyword,selectedKeyword} =useSelector(state=> state.accordion)

    return <>
        <AppBar />
        <TemporaryDrawer />
       {selectedSubcategory  && !parentKeyword &&<KeywordsList/> }
       {parentKeyword && selectedKeyword  && <ProductList/>}
    </>
}