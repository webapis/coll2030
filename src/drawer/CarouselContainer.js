
import { AppContext } from "../App";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard, Scrollbar } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle'
import './carouselstyle.css'

export default function CarouselContainer(props) {

    const { navKeywords } = props
    const fattened =navKeywords.map(m=>m.keywords).flat().filter(f=>f.count>300)
    debugger
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
    {fattened.map((m)=> <SwiperSlide>{m.keyword}</SwiperSlide>  )}


    </Swiper>



}