import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// Import Swiper styles
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../../../../recoil/Atom";
import axios from "axios";
import { api, base, useRequests } from "../../../../../hooks/useRequests";
import Loader from "../../../../../ui/Loader";
import { useParams } from "react-router-dom";
import { ModelsType } from "../../../../../types/ApiTypes";
import NoContentMsg from "../../../../../ui/NoContentMsg";

interface ModelInnerInterierDataType {
  _id: string;
  modelTitle: string;
  title: string;
  image: string;
  status: string;
  selected_model: string;
}

const InterierTab: React.FC = () => {
  const selectedLanguage = useRecoilValue(SelectedLanguageState);
  const { slugmodel } = useParams();
  const { ModelsData } = useRequests();
  const { data: interierTabData, isLoading } = useQuery<ModelInnerInterierDataType[]>({
    queryKey: ["interierTabDataKey", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(`${api}/modelinteriertabfront`, {
        headers: {
          "Accept-Language": selectedLanguage,
        },
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 60,
  });
  // Find the selected model ID from URL
  const selectedID = ModelsData?.find((model: ModelsType) => model?._id === slugmodel)?.["_id"];

  // Get all items that match the selected model
  const extractEqualItems = interierTabData?.filter((item: ModelInnerInterierDataType) => {
    return item.selected_model === selectedID;
  });

  const hasData = interierTabData && interierTabData?.length > 0;

  //custom swiper buttons
  const swiperRef = React.useRef<any>(null);

  const handlePrev = () => {
    if (swiperRef?.current) {
      swiperRef?.current?.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef?.current) {
      swiperRef?.current?.slideNext();
    }
  };

  const [open, setOpen] = React.useState<string | null>(null);

  //manipulate carousel data only images
  const filterDataImages =
    hasData &&
    extractEqualItems?.map((data: ModelInnerInterierDataType) => {
      return data?.image;
    });

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader />
      ) : extractEqualItems ? (
        <div className="interier-tab">
          {extractEqualItems && extractEqualItems?.length > 0 ? (
            <>
              <Lightbox
                styles={{
                  container: {
                    width: "100%",
                    background: "rgba(0, 0, 0, 0.775)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  },
                }}
                carousel={{ imageFit: "cover", padding: 24 }}
                open={open !== null}
                controller={{
                  closeOnBackdropClick: true,
                  closeOnPullDown: true,
                  closeOnPullUp: true,
                  preventDefaultWheelX: true,
                  preventDefaultWheelY: true,
                }}
                close={() => setOpen(null)}
                slides={
                  hasData && filterDataImages
                    ? filterDataImages.map((image) => ({ src: `${base}${image}`, width: 1200, height: 600 }))
                    : []
                }
              />

              <div className="top-title">
                <h2>{extractEqualItems ? extractEqualItems[0]?.title : ""}</h2>
              </div>

              <div className="carousel-area">
                <Swiper
                  ref={swiperRef}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  breakpoints={{
                    768: {
                      slidesPerView: 3,
                    },
                    568: {
                      slidesPerView: 2,
                    },
                    468: {
                      slidesPerView: 1,
                    },
                  }}
                  spaceBetween={24}
                  className="mySwiper">
                  {hasData &&
                    extractEqualItems?.map((data: ModelInnerInterierDataType) => (
                      <SwiperSlide key={data?._id}>
                        <div className="image" onClick={() => setOpen(data?._id)}>
                          <img src={`${base}${data?.image}` || ""} alt={`${data?._id}`} title={data?.title} />
                        </div>
                        <article className="desc">
                          <span>{data?.title}</span>
                          <p>{data?.modelTitle}</p>
                        </article>
                      </SwiperSlide>
                    ))}
                </Swiper>
                <div className="buttons-swiper">
                  <button onClick={handlePrev}>
                    <GrFormPrevious className="prev" />
                  </button>
                  <button onClick={handleNext}>
                    <GrFormNext className="next" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <NoContentMsg />
          )}
        </div>
      ) : ""}
    </React.Fragment>
  );
};

export default InterierTab;
