import React, { ChangeEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { api, base, useRequests } from "../../hooks/useRequests";
import { CarsType } from "../../types/ApiTypes";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { useTranslates } from "../../hooks/useTranslates";

interface SpecificationsNav {
  id: number;
  navName: string;
}

interface Accordion {
  id: number;
  title: string;
  description: string;
}

const Nav: SpecificationsNav[] = [
  {
    id: 1,
    navName: "standart avadanlıq",
  },
  {
    id: 2,
    navName: "texniki spesifikasiya",
  },
];

const AccordionData: Accordion[] = [
  {
    id: 1,
    description: "Lorem ipsum dolor kcomefkwewo eowfewkofew",
    title: "Optics",
  },
  {
    id: 2,
    description: "Lorem ipsum dolor kcomefkwewo eowfewkofew",
    title: "Eksteryer",
  },
  {
    id: 3,
    description: "Lorem ipsum dolor kcomefkwewo eowfewkofew",
    title: "Optics",
  },
  {
    id: 4,
    description: "Lorem ipsum dolor kcomefkwewo eowfewkofew",
    title: "Eksteryer",
  },
  {
    id: 5,
    description: "Lorem ipsum dolor kcomefkwewo eowfewkofew",
    title: "Optics",
  },
  {
    id: 6,
    description: "Lorem ipsum dolor kcomefkwewo eowfewkofew",
    title: "Eksteryer",
  },
];

const InnerCar: React.FC = () => {

  const { translations } = useTranslates();

  const { carid } = useParams();

  const { KaiyiCarsData } = useRequests();

  const innerCarData =
    KaiyiCarsData &&
    KaiyiCarsData?.find((data: CarsType) => {
      return carid === data?._id;
    });

  //hover show info modal on the card item
  const [infoModal, setInfoModal] = React.useState<string | null>(null);

  const handleInfoModal = (id: string | null) => {
    setInfoModal(id);
  };

  //Select navigator technic or spec or more
  const [selectedNav, setSelectedNav] = React.useState<number>(1);

  const handleNav = (id: number) => {
    setSelectedNav(id);
  };

  //CUSTOM SWIPER BUTTONS
  const swiperRef = React.useRef<any>(null);

  const handlePrev = () => swiperRef?.current?.slidePrev();

  const handleNext = () => swiperRef?.current?.slideNext();

  //Standar spec
  const StandartSpecificationsNav = () => {
    // accordion open - close
    const [accordion, setAccordion] = React.useState<number | null>(null);

    const handleAccordion = (id: number | null) => {
      setAccordion((prev) => (prev === id ? null : id));
    };

    return (
      <div className="standart-nav">
        {AccordionData?.map((data: Accordion) => (
          <div className="container-accordion" key={data?.id}>
            <div className="item-head" onClick={() => handleAccordion(data?.id)}>
              <h2>{data?.title}</h2>
              <FaAngleDown className={`chevron-left ${accordion === data?.id ? "rotated" : ""}`} />
            </div>
            <div className={`description-accordion ${accordion === data?.id ? "expanded" : ""}`}>
              <p>{data?.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  //Technic spec
  const TechnicSpecificationsNav = () => {
    return (
      <div className="technic-nav">
        <div className="description-technic">
          <p>Description technic</p>
        </div>
      </div>
    );
  };

  const navigate = useNavigate();

  //Submit form for manager contacts
  const [name, setName] = React.useState<string>("");
  const [surname, setSurname] = React.useState<string>("");
  const [telephone, setTelephone] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const dataForManagerContact = {
        name: name,
        surname: surname,
        telephone: telephone,
        created_at: moment().format("DD.MM.YYYY"),
        hours: moment().format("HH:mm"),
      };
      const response = await axios.post(`${api}/contact-manager`, dataForManagerContact);

      if (response.data) {
        toast.success("Məlumatlarınız müvəffəqiyyətlə Menecerə göndərildi!", {
          position: "top-center",
        });
        setName("");
        setSurname("");
        setTelephone("");
      } else {
        toast.error("Bir problem oldu, xahiş edirik biraz gözləyin və yenidən yoxlayın...", {
          position: "top-center",
        });
        console.log(response.status);
      }
    } catch (error) {
      toast.error("Bir problem oldu, xahiş edirik biraz gözləyin və yenidən yoxlayın...", {
        position: "top-center",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="inner-car-page-wrapper">
      <div className="inner-car-page">
        <div className="title">
          <h1>{innerCarData?.title || ""}</h1>
        </div>

        <div className="container-bottom">
          <section className="get-back">
            <Link to="/new-cars" className="button-back">
              <FaChevronLeft className="iconleft" />
              <span>{translations['masinlarin_siyahisi_title']}</span>
            </Link>
          </section>

          <section className="top-content">
            <div className="left-image">
              <img src={`${base}${innerCarData?.carImage}` || ""} alt={innerCarData?.title || ""} />
            </div>
            <div className="right-card">
              <article className="top">
                <h2>{innerCarData?.title || ""}</h2>
                <div className="description">
                  <div className="vin-and-year">
                    <span>{innerCarData?.year || ""}</span>
                    <span>{innerCarData?.vin || ""}</span>
                  </div>
                </div>
              </article>
              <div className="price-and-more-btn">
                <div className="price-and-title">
                  <span>{innerCarData?.price || ""}</span>
                  <div className="icon">
                    <img
                      src="/infoimg.svg"
                      alt="infoimg"
                      onMouseEnter={() => handleInfoModal(innerCarData?._id || "")}
                      onMouseLeave={() => setInfoModal(null)}
                    />
                    <span>{translations['more_about_the_price']}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    window.scrollTo({ top: 1150 - 457, behavior: "smooth" });
                  }}>
                  {translations['daha_cox_buttons']}
                </button>

                <div className="bottom">
                  <div className="autogerm">
                    <img src="/cursor.svg" alt="cursor" title={innerCarData?.companyTitle || ""} />
                    <strong>{innerCarData?.companyTitle || ""}</strong>
                  </div>
                  <section className="in-stock">
                    <span className="title-stock">{innerCarData?.inStock || ""}</span>
                  </section>
                </div>

                <div
                  className={`modal-information ${
                    infoModal === innerCarData?._id && innerCarData?.miniDesc ? "active" : ""
                  }`}>
                  <p>{innerCarData?.miniDesc || ""}</p>
                </div>
              </div>
            </div>
          </section>
{/* 
          <section className="specifications">
            <div className="navigators">
              {Nav?.map((nav: SpecificationsNav) => (
                <span
                  onClick={() => handleNav(nav?.id)}
                  className={`spec-item ${selectedNav === nav?.id ? "active" : ""}`}
                  key={nav?.id}>
                  {nav?.navName}
                </span>
              ))}
            </div>
            <div className="rendered-item-accord-nav">
              {Nav?.map((v: SpecificationsNav, i: number) => {
                if (selectedNav === v?.id && i === 0) {
                  return <StandartSpecificationsNav />;
                } else if (selectedNav === v?.id && i === 1) {
                  return <TechnicSpecificationsNav />;
                }
              })}
            </div>
          </section> */}

          <section className="contact-with-manager">
            <h2>{translations['contact_for_manager_title']}</h2>
            <form acceptCharset="UTF-8" className="form-manage" onSubmit={handleSubmitForm}>
              <input
                value={name}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
                placeholder={`${translations['ad_placeholder']}`}
              />
              <input
                value={surname}
                type="text"
                name="surname"
                id="surname"
                placeholder={`${translations['soyad_placeholder']}`}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)}
              />
              <PhoneInput
                value={telephone}
                country={"az"}
                onlyCountries={["az", "tr", "us", "de", "ru", "uz"]}
                onChange={(value: string) => setTelephone(value)}
              />
              <div className="rules">
                <input type="checkbox" required />
                <Link to="">{translations['sexsi_melumatlarin_emali_ile_raziyam']}</Link>
              </div>
              <div className="btn">
                <button type="submit" disabled={loading}>
                  {loading ? `${translations['gonderilir_title']}` : `${translations['gonder_button']}`}
                </button>
              </div>
            </form>
          </section>

          <section className="similiar-cars">
            <h2>{translations['oxsar_masinlar_title']}</h2>
            <div className="carousel-cars">
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                slidesPerView={4.4}
                spaceBetween={24}
                navigation={true}
                modules={[Navigation, Pagination]}
                className="mySwiper">
                {KaiyiCarsData &&
                  KaiyiCarsData?.map((data: CarsType) => (
                    <SwiperSlide
                      onClick={() => {
                        navigate(`/new-cars/${data?._id}`);
                      }}
                      key={data?._id}
                      className="card-item">
                      <div className="car-image">
                        <img src={`${base}${data?.carImage}`} alt={`${data?._id}`} title={data?.title} />
                      </div>
                      <div className="description-card">
                        <h1>{data?.title}</h1>
                        <div className="bottom">
                          <div className="vin-and-year">
                            <span>{data?.year}</span>
                            <span>{data?.vin}</span>
                          </div>
                          <section className="in-stock">
                            <span className="title-stock">{innerCarData?.inStock || ""}</span>
                          </section>
                        </div>
                      </div>
                      <div className="price-and-autogerm">
                        <div className="price">
                          <span>{data?.price}</span>
                          <img
                            src="/infoimg.svg"
                            alt="info"
                            onMouseEnter={() => handleInfoModal(data?._id)}
                            onMouseLeave={() => setInfoModal(null)}
                          />
                        </div>
                        <div className="bottom-title">
                          <img src="/cursor.svg" alt="cursor" title={data?.companyTitle} />
                          <strong>{data?.companyTitle}</strong>
                          <div
                            className={`modal-information ${
                              infoModal === data?._id && data?.miniDesc ? "active" : ""
                            }`}>
                            <p>{data?.miniDesc}</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>

            <div className="swiper-buttons">
              <span onClick={handlePrev}>
                <FaChevronLeft className="icon" />
              </span>
              <span onClick={handleNext}>
                <FaChevronRight className="icon" />
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InnerCar;
