
import { AppContext } from "../App";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard, Scrollbar } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle'
import './carouselstyle.css'
import placeholders from "./imageComponent/placeholders";
import { Typography } from "@mui/material";
export default function CarouselContainer(props) {

    const { navKeywords } = props
    const fattened = navKeywords.map(m => m.keywords).flat().filter(f => f.count > 300)
    
    return <Swiper
        modules={[Navigation, Pagination, Scrollbar, Mousewheel]}



        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}



        breakpoints={{
            300: {
                loopFillGroupWithBlank: true,
                slidesPerGroup: 3,
                slidesPerView: 3,
                spaceBetween: 5,
            },
            768: {
                loopFillGroupWithBlank: true,
                slidesPerGroup: 4,
                slidesPerView: 4,
                spaceBetween: 5,
            },
            1024: {
                loopFillGroupWithBlank: true,
                slidesPerGroup: 5,
                slidesPerView: 5,
                spaceBetween: 5,
            },
        }}
        onSlideChange={() => console.log('slide chang')}
        onSwiper={(swiper) => console.log(swiper)}
    >
        {fattened.map((m) => {
            const imageUrl = placeholders[m.marka].imageHost + m.imageUrl
            
            return <SwiperSlide style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                <div><img src={imageUrl} width="px" height="50px" /> </div>
                <div>
                    <Typography>{m.keyword}</Typography>
                </div>
                </div>
        

            </SwiperSlide>
        })}


    </Swiper>



}