"use client";
import React from "react";
import ChatRoom from "../components/stream/ChatRoom";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Taptaptap from "@/components/common/Taptaptap";
import useGlobalStore from "@/store/useGlobalStore";

const Home = () => {
  // const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);
  const userStreamerData: StreamerData[] | undefined = useGlobalStore(
    (x) => x.userStreamerData
  );
  return (
    <Swiper
      // onSwiper={setSwiperRef}
      direction="vertical"
      slidesPerView={1}
      spaceBetween={0}
      height={window.innerHeight}
      centeredSlides={true}
      className="h-full w-full"
      onActiveIndexChange={(swiper: SwiperClass) => {
        console.log(
          "user select weapons index(include buy):",
          swiper.activeIndex
        );
      }}
    >
      {userStreamerData?.map((x) => {
        return (
          <SwiperSlide
            style={{
              height: window.innerHeight,
            }}
          >
            <ChatRoom>
              <Taptaptap />
            </ChatRoom>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Home;
