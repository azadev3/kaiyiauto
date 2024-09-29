import React from "react";
import { TabNavigatorTypes } from "../../../types/TabNavTypes";
import Design from "./tabcomponents/Design";
import Interier from "./tabcomponents/Interier";
import Security from "./tabcomponents/Security";
import View from "./tabcomponents/View";
import Comfortable from "./tabcomponents/Comfortable";
import Models from "./tabcomponents/Models";
import News from "./tabcomponents/News";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const TabNavigator: React.FC = () => {
  //ACTIVE - DEACTIVE TAB CONTROLS
  const [activeTab, setActiveTab] = React.useState<number | null>(null);

  //SECTIONS
  const sections = React.useRef<(HTMLElement | null)[]>([]);

  //TAB AND HER COMPONENT ITEMS
  const TabNavigatorItems: TabNavigatorTypes[] = [
    { id: 1, title: "dizayn", ref: React.useRef<HTMLElement>(null), component: <Design /> },
    { id: 2, title: "interyer", ref: React.useRef<HTMLElement>(null), component: <Interier /> },
    { id: 3, title: "təhlükəsizlik", ref: React.useRef<HTMLElement>(null), component: <Security /> },
    { id: 4, title: "baxış", ref: React.useRef<HTMLElement>(null), component: <View /> },
    { id: 5, title: "rahatlıq", ref: React.useRef<HTMLElement>(null), component: <Comfortable /> },
    { id: 6, title: "modellər", ref: React.useRef<HTMLElement>(null), component: <Models /> },
    { id: 7, title: "xəbərlər", ref: React.useRef<HTMLElement>(null), component: <News /> },
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

  return (
    <React.Fragment>
      <section className="tab-navigator-wrapper">
        {/* tabs */}
        {mobileNavigator ? (
          <Swiper
            breakpoints={{
              568: {
                slidesPerView: 6,
              },
              468: {
                slidesPerView: 4.5,
              },
              368: {
                slidesPerView: 2.5,
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

export default TabNavigator;
