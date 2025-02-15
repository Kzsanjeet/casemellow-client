// "use client";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";

// export default function Carousel() {
//   return (
//     <div className="w-full flex justify-center items-center">
//       <Swiper
//         spaceBetween={10}
//         centeredSlides={true}
//         autoplay={{
//           delay: 2500,
//           disableOnInteraction: false,
//         }}
//         pagination={{
//           clickable: true,
//         }}
//         navigation={true}
//         modules={[Autoplay, Pagination, Navigation]}
//         className="w-[100vw] h-[72vh] max-w-[1770px]"
//       >
//          <SwiperSlide>
//           <img
//             src="/image/Slider1.png"
//             alt="Slider1 Photo"
//             className="w-full h-full object-cover rounded-lg"  // object-cover makes the image fit 
//           />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img
//             src="/image/Slider2.png"
//             alt="Slider2 Photo"
//             className="w-full h-full object-cover rounded-lg"
//           />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img
//             src="/image/Slider3.png"
//             alt="Slider3 Photo"
//             className="w-full h-full object-cover rounded-lg"
//           />
//         </SwiperSlide>
//       </Swiper>
//     </div>
//   );
// }


"use client"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Autoplay, Pagination, Navigation } from "swiper/modules"

const slides = [
  { src: "/image/Slider1.png", alt: "Slider1 Photo" },
  { src: "/image/Slider2.png", alt: "Slider2 Photo" },
  { src: "/image/Slider3.png", alt: "Slider3 Photo" },
]

export default function Carousel() {
  return (
    <div className="w-full flex justify-center items-center">
      <Swiper
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[72vh] max-w-[1770px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={slide.src || "/placeholder.svg"}
                alt={slide.alt}
                fill
                className="object-cover object-center rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority={true} 
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}


