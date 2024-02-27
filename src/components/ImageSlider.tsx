"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";

interface ImageSliderProps {
  urls: string[];
}

const ImageSlider = ({ urls }: ImageSliderProps) => {
  return (
    <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl">
      <Swiper
        spaceBetween={50}
        modules={[Pagination, Navigation]}
        slidesPerView={1}
        pagination={{
          renderBullet: (_, className) => {
            return `<span class="rounded-full transition ${className}"></span>`;
          },
        }}
        className="h-full w-full"
        navigation={true}
      >
        {urls.map((url, i) => (
          <SwiperSlide key={i} className="relative h-full w-full">
            <Image
              fill
              loading="eager"
              className="h-full w-full object-cover object-center"
              src={url}
              alt="Product image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
