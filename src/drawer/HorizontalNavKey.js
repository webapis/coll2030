
import React from 'react';
import { useRef, useEffect } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import Chip from '@mui/material/Chip';
import Fab from '@mui/material/Fab';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { AppContext } from '../App';
import Link from '@mui/material/Link';
import placeholders from './imageComponent/placeholders.json';
function HorizontalNavKey({ selectSubcategory }) {

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
    <AppContext.Consumer>{({ navKeywords, subcatTitle, setSelectedNavIndex, indexTabName,productImgIndexes }) => {
      
      return navKeywords.filter(g => {
        return g.groupName === indexTabName
      }).map((m, a) => {
        const { groupName, keywords } = m

debugger
 
        
        return <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {keywords && keywords.sort((a, b) => b[0] - a[0]).map((m, id) => {
            const keyword = m[2]
            const index = m[1]
            const total = m[0]
            const {  imageUrl: {  src: imageSrc, marka } } = productImgIndexes[m[1]]
            
            const imageSource =placeholders[marka].imagePrefix.trim() + placeholders[marka].imageHost.trim() + imageSrc + placeholders[marka].imgPostFix
    
            return <Card
            groupName={groupName}
              subcatTitle={subcatTitle}
              itemId={id} // NOTE: itemId is required for track items
              title={keyword}
              keyword={keyword}
              total={total}
              key={id}
              onClick={handleClick(id)}
              selected={isItemSelected(id)}
              index={index}
              imageSource={imageSource}
              setSelectedNavIndex={setSelectedNavIndex}
            />

          })}

        </ScrollMenu>
      })
    }}</AppContext.Consumer>
  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      <Fab size="small" color="secondary" disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
        <ChevronLeftIcon />
      </Fab>
    </div>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      <Fab size="small" color="secondary" disabled={isLastItemVisible} onClick={() => scrollNext()}>
        <ChevronRightIcon />
      </Fab>
    </div>
  );
}



function Card({ onClick, title, itemId, subcatTitle, total, setSelectedNavIndex, index, keyword,groupName ,imageSource}) {

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

  }, [visibility, itemId]);
//`https://res.cloudinary.com/codergihub/image/upload/h_400/keywords/${subcatTitle}/${groupName.replace('ç','c')}/${title}.jpg`
  return (
    <Box sx={{ width: { xs: 83, sm: 100, md: 100 } }} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}

      onClick={() => onClick(visibility)}

      tabIndex={0}
    >
      <img alt={title} ref={imageElement} src={window.dataURL} data-src={imageSource} onClick={() => setSelectedNavIndex({ index, keyword })} style={{ borderRadius: 6, marginRight: 4 }} />
      <Typography sx={{ fontSize: { xs: 8, sm: 8, md: 12 } }} variant="h4"><Box sx={{ opacity: 0.8, textAlign: 'center', padding: 0, display: 'flex', alignContent: 'center', justifyContent: 'space-around', flexDirection: 'column' }}><Link onClick={() => setSelectedNavIndex({ index, keyword })} >{title}</Link><Chip sx={{ fontSize: { xs: 8, sm: 8, md: 12 } }} style={{ opacity: 0.6, backgroundColor: '#f1f1f1' }} size="small" label={new Intl.NumberFormat().format(total) + ' türü'} /> </Box></Typography> </Box>

  );
}

export default HorizontalNavKey;