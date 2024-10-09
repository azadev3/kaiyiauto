import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useTranslates } from "../../../hooks/useTranslates";
import { base, useRequests } from "../../../hooks/useRequests";
import { HeroType } from "../../../types/ApiTypes";

const MobileHero: React.FC = () => {
  const { translations } = useTranslates();

  const { HeroData } = useRequests();

  //CUSTOM PREV AND NEXT BUTTONS ON SWIPER
  const swiperRef = React.useRef<any>();

  const getPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const getNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="mobile-hero">
      <Swiper
        ref={swiperRef}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper">
        {HeroData &&
          HeroData?.map((items: HeroType) => (
            <SwiperSlide key={items?._id}>
              <img
                src={`${base}${items?.image}`}
                alt={`${items?._id}-heroimage`}
                title={items?.title}
                className="background-image"
              />
              <div className="description-wrapper">
                <div className="description">
                  <h1>{items?.title}</h1>
                  <h2>{items?.description}</h2>
                  <img
                    src={`${base}${items?.miniImage}`}
                    className="mini-logo"
                    alt="mini-logo"
                    title={items?.miniImage}
                  />
                  <Link to="/new-cars" className="for-more-btn">
                    {translations["daha_cox_buttons"]}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="buttons">
        <img onClick={getPrev} src="/btnleft.svg" className="prev" alt="previous" title="Əvvəlki" />
        <img onClick={getNext} src="/btnright.svg" className="next" alt="next" title="Sonrakı" />
      </div>
    </div>
  );
};

export default MobileHero;
