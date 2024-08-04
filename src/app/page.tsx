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
        console.log("user select room index:", swiper.activeIndex);
        useGlobalStore.setState({ currentIndex: parseInt(swiper.activeIndex) });
        const music =
          userStreamerData?.[parseInt(swiper.activeIndex)].backgroundMusic;
        const audio: HTMLMediaElement = document.getElementById(
          "myAudio"
        ) as HTMLMediaElement;
        audio.src = music!;
      }}
    >
      {userStreamerData?.map((x, i) => {
        return (
          <SwiperSlide
            key={i}
            style={{
              height: window.innerHeight,
            }}
          >
            <ChatRoom data={x}>
              <Taptaptap data={x} />
            </ChatRoom>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Home;
