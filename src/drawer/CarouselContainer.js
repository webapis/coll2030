
import { AppContext } from "../App";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard, Scrollbar } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle'
import './carouselstyle.css'

export default function CarouselContainer() {


    return <Swiper 
        modules={[Navigation, Pagination, Scrollbar,Mousewheel]}
       
        loop={true}
    
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
  
  

        breakpoints={{
            300: {
                loopFillGroupWithBlank:true,
                slidesPerGroup:3,
              slidesPerView: 3,
              spaceBetween: 5,
            },
            768: {
                loopFillGroupWithBlank:true,
                slidesPerGroup:4,
              slidesPerView: 4,
              spaceBetween: 5,
            },
            1024: {
                loopFillGroupWithBlank:true,
                slidesPerGroup:5,
              slidesPerView: 5,
              spaceBetween: 5,
            },
          }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
    >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>

        <SwiperSlide>Slide 10</SwiperSlide>


    </Swiper>



}