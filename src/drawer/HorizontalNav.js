import { useRef,useEffect } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import Chip from '@mui/material/Chip';
import Fab from '@mui/material/Fab';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React from 'react';

const dataURL ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAADIBAMAAAD4qwVWAAAAG1BMVEXMzMyWlpacnJyqqqqjo6O3t7fFxcWxsbG+vr6ayVztAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABKUlEQVRoge3SMU/CQByG8beFtitCBcc71OgIie5cPwG4uNKgO0ys8M29nkJijMPVmjA8v6H5t0mfXK8nAQAAAAAAAAAAAMA/s9/uEpOYy2zl7VM/Wn9I+VZvOpMK+yBtytqkg3Ts7qU3P8e33LSUdrd2K1vNm9bw2R5yW7n4VjbSfCm7rhfZRK5pjXRcFM0c3eqPVS+0V238tGpaN0qa+RjfSgf+VeWvfklGYb+aB2GObvlQOsjdcG78lJxaYW63rv5kHdZybvlLi3WF/UrM536dv7HdfoX/mI61M9m1v3y1/FMX3wrnqxg+VRPZvT215CrbohXO/Uv5XmozPZ5bPT/Htn7nT103iketZh21slFuDx21ZK/KrlLa3G07awEAAAAAAAAAAFyYD/jJJjwPERThAAAAAElFTkSuQmCC"
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
    <div
      onClick={() => onClick(visibility)}

      tabIndex={0}
    >
      <div  style={{ display: 'flex', flexDirection:'column' }}>
 
                <img alt={title}  ref={imageElement} src={dataURL}  height={200} data-src={`https://res.cloudinary.com/codergihub/image/upload/h_300/categories/${title}.jpg`} onClick={() => selectSubcategory({ functionName: m.functionName, index: m.index, groupName: m.groupName, keywordType: m.keywordType ? m.keywordType : 'category' })} style={{ borderRadius: 6, marginRight: 4 }}  />
                <span style={{ fontSize: 14,opacity:0.8 ,textAlign:'center',padding:3,display:'flex',justifyContent:'space-around'}}><span>{title}</span><Chip style={{opacity:0.6,fontSize:12}} size="small"  label={new Intl.NumberFormat().format(m.count)}/> </span></div>

    </div>
  );
}

export default HorizontalNav;