import React from "react";
import { useParams } from "react-router-dom";
import { base, useRequests } from "../../../../hooks/useRequests";
import { ModelPdf, ModelsType } from "../../../../types/ApiTypes";
import VideoTab from "./ModelsInnerTabs/VideoTab";
import DesignTab from "./ModelsInnerTabs/DesignTab";
import InterierTab from "./ModelsInnerTabs/InterierTab";
import KomfortTab from "./ModelsInnerTabs/KomfortTab";
import SecurityTab from "./ModelsInnerTabs/SecurityTab";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

//Tab navigator for models inner
const TabNavigatorForModelsInner: React.FC = () => {
  const { slugmodel } = useParams();

  //get pdf on the model inner
  const { ModelPdfData, ModelsData } = useRequests();

  const hasPdf = ModelPdfData && ModelPdfData?.length > 0;
  const hasModels = ModelsData && ModelsData?.length > 0;

  // Find the selected model ID from URL
  const selectedID = hasModels && ModelsData?.find((model: ModelsType) => model?._id === slugmodel)?.["_id"];

  // Get all items that match the selected model
  const findedPdf =
    hasPdf &&
    ModelPdfData?.find((item: ModelPdf) => {
      return item.selected_model === selectedID;
    })?.pdf;

  //mobile navigator
  const [mobileNavigator, setMobileNavigator] = React.useState<boolean>(false);

  React.useEffect(() => {
    const controlWindow = () => {
      if (window.innerWidth <= 1000) {
        setMobileNavigator(true);
      } else {
        setMobileNavigator(false);
      }
    };

    controlWindow();

    window.addEventListener("resize", controlWindow);
    return () => window.removeEventListener("resize", controlWindow);
  }, []);

  //ACTIVE - DEACTIVE TAB CONTROLS
  const [activeTab, setActiveTab] = React.useState<number | null>(null);

  //SECTIONS
  const sections = React.useRef<(HTMLElement | null)[]>([]);

  //TAB AND HER COMPONENT ITEMS
  const TabNavigatorItems = [
    { id: 1, title: "video", ref: React.useRef<HTMLElement>(null), component: <VideoTab /> },
    { id: 2, title: "dizayn", ref: React.useRef<HTMLElement>(null), component: <DesignTab /> },
    { id: 3, title: "interyer", ref: React.useRef<HTMLElement>(null), component: <InterierTab /> },
    { id: 4, title: "komfort", ref: React.useRef<HTMLElement>(null), component: <KomfortTab /> },
    { id: 5, title: "təhlükəsizlik", ref: React.useRef<HTMLElement>(null), component: <SecurityTab /> },
    // { id: 6, title: "Avadanlıqlar və Qiymətlər", ref: React.useRef<HTMLElement>(null), component: <EquipmentTab /> },
  ];

  //CREATE INTERSECTION OBSERVE
  React.useEffect(() => {
    sections.current = TabNavigatorItems.map((item) => item.ref.current);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.current.indexOf(entry.target as HTMLElement);
            setActiveTab(TabNavigatorItems[index].id);
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [TabNavigatorItems]);

  //IF CLICKED TAB
  const handleTabClick = (index: number) => {
    sections.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  //Download pdf
  const handleDownload = () => {
    if (findedPdf) {
      const link = document.createElement("a");

      link.href = findedPdf;

      const fileExt = findedPdf?.split(".").pop();

      link.download = `istifadeci_telimatlari.${fileExt}`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } else {
      console.error("File not found.");
    }
  };

  return (
    <React.Fragment>
      <section className="tab-navigator-wrapper">
        {/* tabs */}

        {mobileNavigator ? (
          <Swiper
            breakpoints={{
              568: {
                slidesPerView: 3,
              },
              468: {
                slidesPerView: 2.2,
              },
              368: {
                slidesPerView: 1.6,
              },
            }}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper">
            {TabNavigatorItems.map((item, index) => (
              <SwiperSlide key={item?.id}>
                <button
                  key={item.id}
                  className={`items-nav ${activeTab === item.id ? "active" : ""}`}
                  onClick={() => handleTabClick(index)}>
                  {item.title}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="tab-navigator">
            <nav className="left-navigator">
              {TabNavigatorItems.map((item, index) => (
                <button
                  key={item.id}
                  className={`items-nav ${activeTab === item.id ? "active" : ""}`}
                  onClick={() => handleTabClick(index)}>
                  {item.title}
                </button>
              ))}
            </nav>
            <button className="user-in" onClick={handleDownload}>
              İstifadəçi təlimatları
            </button>
          </div>
        )}
      </section>
      {/* tab contents */}
      <div className="tab-content">
        {TabNavigatorItems.map((item) => (
          <main key={item.id} ref={item.ref} id={`section-${item.id}`} className="tab-section">
            {item?.component}
          </main>
        ))}
      </div>
    </React.Fragment>
  );
};

const ModelDetails: React.FC = () => {
  const { slugmodel } = useParams<{ slugmodel: string }>();

  const { ModelsData } = useRequests();

  const findModel =
    ModelsData &&
    ModelsData?.find((data: ModelsType) => {
      return slugmodel === data?._id;
    });

  return (
    <div className="models-inner-container">
      <section className="hero-models-section">
        <div className="description-wrapper">
          <article className="description">
            <h1>{findModel?.title}</h1>
            <p>{findModel?.slogan}</p>
          </article>
        </div>
        {findModel?.video ? (
          <video
            autoPlay={true}
            loop={true}
            controls={false}
            muted={true}
            disablePictureInPicture
            src={`${base}${findModel?.video}` || ""}></video>
        ) : findModel?.image ? (
          <img src={`${base}${findModel?.image}` || ""} alt="" />
        ) : (
          <img src={`${base}${findModel?.image}` || ""} alt="" />
        )}
      </section>

      <TabNavigatorForModelsInner />
    </div>
  );
};

export default ModelDetails;
