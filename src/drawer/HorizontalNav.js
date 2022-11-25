import { useRef,useEffect } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import Fab from '@mui/material/Fab';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React from 'react';
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
      {items.map((m,id) => (
        <Card
      
          itemId={id} // NOTE: itemId is required for track items
          title={m.title}
          key={id}
          onClick={handleClick(id)}
          selected={isItemSelected(id)}
          m={m}
          selectSubcategory={selectSubcategory}
        />
      ))}
    </ScrollMenu>
  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <div style={{height:'100%', display:'flex',alignItems:'center'}}>
    <Fab size="small" color="secondary"  disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      <ChevronLeftIcon/>
    </Fab>
    </div>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <div style={{height:'100%', display:'flex',alignItems:'center'}}>
    <Fab size="small" color="secondary"  disabled={isLastItemVisible} onClick={() => scrollNext()}>
      <ChevronRightIcon/>
    </Fab>
    </div>
  );
}



function Card({ onClick, title,m,selectSubcategory }) {
  const visibility = React.useContext(VisibilityContext);
  const imageElement = useRef(null);
  useEffect(() => {


      if (window.IntersectionObserver) {

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




  }, []);
  return (
    <div
      onClick={() => onClick(visibility)}

      tabIndex={0}
    >
      <div  style={{ display: 'flex', flexDirection:'column' }}>
                <img alt={title}  ref={imageElement} src={`https://via.placeholder.com/150x200?Text=${title}`}  height={200} data-src={`https://res.cloudinary.com/codergihub/image/upload/h_300/categories/${title}.jpg`} onClick={() => selectSubcategory({ functionName: m.functionName, index: m.index, groupName: m.groupName, keywordType: m.keywordType ? m.keywordType : 'category' })} style={{ borderRadius: 6, marginRight: 4 }}  />
                <span style={{ fontSize: 14,opacity:0.7 ,textAlign:'center',padding:3}}>{title}</span></div>

    </div>
  );
}

export default HorizontalNav;