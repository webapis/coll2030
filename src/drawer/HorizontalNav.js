
import React from 'react';
import { useRef,useEffect } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import Chip from '@mui/material/Chip';
import Fab from '@mui/material/Fab';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Link from '@mui/material/Link';

function HorizontalNav({navitems,selectSubcategory}) {
  const [items] = React.useState(navitems);
  const [selected, setSelected] = React.useState([]);


  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleClick =
    (id) =>
    () => {
      const itemSelected = isItemSelected(id);

      setSelected((currentSelected) =>
        itemSelected
          ? currentSelected.filter((el) => el !== id)
          : currentSelected.concat(id)
      );
    };

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>

      {items.map((m,id) => {

       return <Card
          
          itemId={id} // NOTE: itemId is required for track items
          title={m.title}
          key={id}
          onClick={handleClick(id)}
          selected={isItemSelected(id)}
          m={m}
          selectSubcategory={selectSubcategory}
        />
   
})}

    </ScrollMenu>
  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <div style={{height:'100%', display:'flex',alignItems:'center'}}>
    <Fab  size="small" color="secondary"  disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      <ChevronLeftIcon/>
    </Fab>
    </div>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <div style={{height:'100%', display:'flex',alignItems:'center'}}>
    <Fab  size="small" color="secondary"  disabled={isLastItemVisible} onClick={() => scrollNext()}>
      <ChevronRightIcon/>
    </Fab>
    </div>
  );
}



function Card({ onClick, title,m,selectSubcategory,itemId }) {
  const visibility = React.useContext(VisibilityContext);
  const imageElement = useRef(null);
  useEffect(() => {

      if (window.IntersectionObserver && visibility.isItemVisible(itemId)) {

          let observer = new IntersectionObserver((entries, observer) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {

                      entry.target.src = entry.target.dataset.src;
                      observer.unobserve(entry.target);
                  }
              });
          }, { threshold: 0.1 });
          window.obze = observer
          window.obze.observe(imageElement.current)
      }




  }, [visibility,itemId]);
  
  return (
    <Box sx={{width:{xs:83,sm:120,md:176 }}} style={{height:'100%', display: 'flex', flexDirection:'column',justifyContent:'space-between' }}

      onClick={() => onClick(visibility)}

      tabIndex={0}
    >
      <img alt={title}  ref={imageElement} src={window.dataURL}    data-src={`https://res.cloudinary.com/codergihub/image/upload/h_400/categories/${title}.jpg`} onClick={() => selectSubcategory({ functionName: m.functionName, index: m.index, groupName: m.groupName, keywordType: m.keywordType ? m.keywordType : 'category' })} style={{ borderRadius: 6, marginRight: 4 }}  />
      <Typography sx={{fontSize:{xs:8,sm:14,md:16}}} variant="h4"><Box sx={{opacity:0.8 ,textAlign:'center',padding:0,display:'flex',alignContent:'center',justifyContent:'space-around', flexDirection:{xs:'column',sm:'column',md:'row'}}}><Link onClick={() => selectSubcategory({ functionName: m.functionName, index: m.index, groupName: m.groupName, keywordType: m.keywordType ? m.keywordType : 'category' })} >{title}</Link><Chip sx={{fontSize:{xs:8,sm:14,md:16} }} style={{opacity:0.6, backgroundColor:'#f1f1f1'}} size="small"  label={new Intl.NumberFormat().format(m.count)+' türü'}/> </Box></Typography> </Box>

  );
}

export default HorizontalNav;