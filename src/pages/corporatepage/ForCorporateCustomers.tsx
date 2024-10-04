import React, { ChangeEvent } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PhoneInput from "react-phone-input-2";
import { Link } from "react-router-dom";
import { api, base, useRequests } from "../../hooks/useRequests";
import { ForCorporateCustomersType, OurAdvantagesType } from "../../types/ApiTypes";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import { useTranslates } from "../../hooks/useTranslates";

const ForCorporateCustomers: React.FC = () => {
  const { translations } = useTranslates();

  const { ForCorporateCustomersData, OurAdvantagesData } = useRequests();

  const hasData = ForCorporateCustomersData && ForCorporateCustomersData?.length > 0;

  const hasAdvantagesData = OurAdvantagesData && OurAdvantagesData?.length > 0;

  //active nav item
  const [active, setActive] = React.useState<string>("");
  const [animating, setAnimating] = React.useState<string>("enter");

  //set initial active
  React.useEffect(() => {
    if (hasAdvantagesData && OurAdvantagesData) {
      setActive(OurAdvantagesData[0]?._id);
    }
  }, [OurAdvantagesData]);

  const handleActive = (id: string) => {
    if (active !== id) {
      setAnimating("exit");
      setTimeout(() => {
        setActive(id);
        setAnimating("enter");
      }, 250);
    }
  };

  const showSelectedNavContent =
    hasAdvantagesData &&
    OurAdvantagesData?.length > 0 &&
    OurAdvantagesData?.find((nav: OurAdvantagesType) => {
      return active === nav?._id;
    });

  const hasSelectedNavContent =
    showSelectedNavContent && showSelectedNavContent?.content && showSelectedNavContent?.content?.length > 0;

  //send form request
  const [loading, setLoading] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const [surname, setSurname] = React.useState<string>("");
  const [telephone, setTelephone] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [companyName, setCompanyName] = React.useState<string>("");
  const [companyInn, setCompanyInn] = React.useState<string>("");
  const [comment, setComment] = React.useState<string>("");

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = {
        name: name,
        surname: surname,
        telephone: telephone,
        email: email,
        companyName: companyName,
        companyINN: companyInn,
        comment: comment || "",
        created_at: moment().format("DD.MM.YYYY"),
        hours: moment().format("HH:mm"),
      };

      const response = await axios.post(`${api}/sendrequest`, data);

      if (response.data) {
        toast.success("Sorğunuz müvəffəqiyyətlə göndərildi!", {
          position: "top-center",
        });
        setName("");
        setSurname("");
        setTelephone("");
        setCompanyName("");
        setCompanyInn("");
        setComment("");
        setEmail("");
      } else {
        toast.error("Sorğu zamanı problem oldu, zəhmət olmasa yenidən yoxlayın", {
          position: "top-center",
        });
        console.log(response.status);
      }
    } catch (error) {
      toast.error("Sorğu zamanı problem oldu, zəhmət olmasa yenidən yoxlayın", {
        position: "top-center",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="corporate-wrapper">
      <div className="corporate-page">
        {hasData &&
          ForCorporateCustomersData?.map((data: ForCorporateCustomersType) => (
            <div key={data?._id} className="image-contain" style={{ backgroundImage: `url(${base}${data?.image})` }}>
              <div className="wrapper">
                <h1>{data?.title}</h1>
                {data?.description ? <p className="corporate-description">{data?.description}</p> : ""}
                <button onClick={() => {
                  window.scrollTo({ top: 1611, behavior: "smooth" })
                }}>{translations['teklif_al']}</button>
              </div>
            </div>
          ))}
        <div className="container-area">
          <div className="description">
            <p>
              {translations['description_our_advantages']}
            </p>
          </div>

          <div className="our-preferences">
            <h2>{translations['ustunluklerimiz_title']}</h2>
            <section className="preferences-carousel">
              <div className="navigators-contain">
                {hasAdvantagesData &&
                  OurAdvantagesData?.map((nav: OurAdvantagesType) => (
                    <div
                      onClick={() => handleActive(nav?._id)}
                      className={`nav-item ${active === nav?._id ? "active" : ""}`}
                      key={nav?._id}>
                      <span>{nav?.navTitle}</span>
                    </div>
                  ))}
              </div>
              <div className={`swiper-contain ${animating}`}>
                <Swiper
                  breakpoints={{
                    968: {
                      slidesPerView: 4.4,
                    },
                    568: {
                      slidesPerView: 2.4,
                    },
                    468: {
                      slidesPerView: 1.4,
                    },
                  }}
                  spaceBetween={24}
                  className="mySwiper">
                  {hasSelectedNavContent &&
                    showSelectedNavContent?.content?.map(
                      (content: { title: string; icon: string; description: string }, index: number) => (
                        <SwiperSlide key={index}>
                          {/* <div className="icon-wrap">
                            <img
                              src={`${base}${content?.icon}` || ""}
                              alt={`${index + 5}-icon`}
                              title={content?.title}
                            />
                          </div> */}
                          <h4>{content?.title || ""}</h4>
                          <p>{content?.description || ""}</p>
                        </SwiperSlide>
                      )
                    )}
                </Swiper>
              </div>
            </section>
          </div>
        </div>

        <div className="create-request-wrapper">
          <div className="create-request">
            <div className="top-title">
              <h3>{translations['our_advantages_title_main']}</h3>
              <p className="description-mini">{translations['our_advantages_title_main_description']}</p>
            </div>

            <form acceptCharset="UTF-8" className="create-request-form" onSubmit={handleSubmitForm}>
              <h3>{translations['sorgu_yarat']}</h3>
              <div className="form-area">
                <div className="field-perconal-data">
                  <label>{translations['personal_data']}</label>
                  <input
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    required
                    className="nameinput"
                    name="name"
                    type="text"
                    placeholder={`${translations['ad_placeholder']}`}
                  />
                  <input
                    value={surname}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)}
                    required
                    className="surnameinput"
                    type="text"
                    name="surname"
                    placeholder={`${translations['soyad_placeholder']}`}
                  />
                </div>

                <div className="field-contact-area">
                  <label>{translations['elaqe_melumatlari']}</label>
                  <PhoneInput
                    value={telephone}
                    onChange={(value: string) => setTelephone(value)}
                    placeholder={`${translations['telephone_placeholder']}`}
                    country={"az"}
                    onlyCountries={["az", "tr", "us", "de", "ru", "uz"]}
                  />
                  <input
                    required
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="emailinput"
                    type="email"
                    name="email"
                    placeholder={`${translations['email_placeholder']}`}
                  />
                </div>

                <div className="field-company-info">
                  <label>{translations['sirket_melumatlari']}</label>
                  <input
                    className="nameinput"
                    required
                    value={companyName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
                    name="companyName"
                    type="text"
                    placeholder="Şirkət adı*"
                  />
                  <input
                    required
                    value={companyInn}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyInn(e.target.value)}
                    className="surnameinput"
                    type="text"
                    name="companyINN"
                    placeholder="Şirkət INN*"
                  />
                  <input
                    value={comment}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
                    className="surnameinput"
                    type="text"
                    name="comment"
                    placeholder="Rəy"
                  />
                  <div className="rules">
                    <div className="rule">
                      <input type="checkbox" required name="ruleone" />
                      <Link to="">{translations['sexsi_melumatlarin_emali_ile_raziyam']}</Link>
                    </div>
                    <div className="rule">
                      <input type="checkbox" />
                      <Link to="">{translations['daha_cox_elaqe_title']}</Link>
                    </div>
                  </div>
                </div>

                <div className="button-area">
                  <button type="submit">
                    {loading ? `${translations["gonderilir_title"]}` : `${translations["gonder_button"]}`}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForCorporateCustomers;
