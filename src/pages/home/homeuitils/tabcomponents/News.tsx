import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { base, useRequests } from "../../../../hooks/useRequests";
import { KaiyiHistoryNews } from "../../../../types/ApiTypes";
import { useTranslates } from "../../../../hooks/useTranslates";

const News: React.FC = () => {
  const { KaiyiHistoryNews } = useRequests();

  const { translations } = useTranslates();
 
  const hasNews = KaiyiHistoryNews && KaiyiHistoryNews?.length > 0;

  //CUSTOM SWIPER BUTTONS
  const swiperRef = React.useRef<any>(null);

  const handlePrev = () => swiperRef?.current?.slidePrev();

  const handleNext = () => swiperRef?.current?.slideNext();

  const navigate = useNavigate();

  return (
    <section className="news-component-wrapper">
      <div className="news-component">
        <h2>{translations['news_title']}</h2>

        <div className="carousel-news">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              968: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 2,
              },
              568: {
                slidesPerView: 1,
              },
            }}
            spaceBetween={24}
            navigation={true}
            pagination={window.innerWidth <= 768 ? true : false}
            modules={[Navigation, Pagination]}
            className="mySwiper">
            {hasNews &&
              KaiyiHistoryNews?.map((items: KaiyiHistoryNews) => (
                <SwiperSlide key={items?._id} className="blog-item"
                onClick={() => {
                  navigate(`/news/${items?._id}`)
                }}
                >
                  <div className="top">
                    <div className="image-blog">
                      <img src={`${base}${items?.image}`} alt={`${items?._id}-image`} title={items?.title} />
                    </div>
                    <div className="description">
                      <p>{items?.slogan}</p>
                    </div>
                  </div>
                  <div className="button-area">
                    <Link to={`/news/${items?.title}`} className="read-more-btn">
                      <span>{translations['read_more_button']}</span>
                      <FaChevronRight className="rightdown" />
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        <div className="swiper-buttons" style={{ display: KaiyiHistoryNews?.length <= 4 ? "none" : "" }}>
          <span onClick={handlePrev}>
            <FaChevronLeft className="icon" />
          </span>
          <span onClick={handleNext}>
            <FaChevronRight className="icon" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default News;
