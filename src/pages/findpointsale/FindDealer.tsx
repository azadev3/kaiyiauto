import React, { ChangeEvent, FormEvent } from "react";
import { SlSizeFullscreen } from "react-icons/sl";
import { MdWindow } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import SelectServiceModal from "./uitils/SelectServiceModal";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import { api, base, useRequests } from "../../hooks/useRequests";
import { AddDealerData, Cities } from "../../types/ApiTypes";
import moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";

const Styles = {
  control: (baseStyle: any, state: any) => ({
    ...baseStyle,
    backgroundColor: "#FFFFFF",
    border: state.isFocused ? "1px solid #DFDFDF" : "1px solid #DFDFDF",
    boxShadow: state.isFocused ? "none" : "none",
    height: "52px",
    borderRadius: "0",
    outline: state.isFocused ? "1px solid black" : "1px solid #DFDFDF",
  }),
  option: (baseStyle: any, state: any) => ({
    ...baseStyle,
    backgroundColor: state.isFocused ? "#f0f0f0" : "#FFFFFF",
    color: "#333",
    padding: 10,
    cursor: "pointer",
    ":active": {
      backgroundColor: "#ddd",
    },
  }),
};

type SortedType = {
  id: number;
  icon: any;
};

const SortedData: SortedType[] = [
  {
    id: 1,
    icon: <SlSizeFullscreen className="icon" />,
  },
  {
    id: 2,
    icon: <MdWindow className="icon" />,
  },
  {
    id: 3,
    icon: <CiBoxList className="icon" />,
  },
];

const FindDealer: React.FC = () => {
  const { FindDealerData, AddDealerData } = useRequests();

  //if FindDealerData is accepted
  const hasData = FindDealerData && FindDealerData?.length > 0;

  const hasDataDealer = AddDealerData && AddDealerData?.length > 0;

  const optionsCity =
    hasData &&
    FindDealerData?.map((data: Cities) => ({
      value: data?._id,
      label: data?.cityName,
    }));

  const optionsDealerCenter =
    hasDataDealer &&
    AddDealerData?.map((data: AddDealerData) => ({
      value: data?._id,
      label: data?.dealerName,
    }));

  //if FindDealerData > informations
  const hasDataInformations =
    FindDealerData &&
    FindDealerData?.length > 0 &&
    FindDealerData?.some((data: Cities) => {
      return data?.informations && data?.informations?.length > 0;
    });

  //if FindDealerData > otherServices
  const hasDataOtherServices =
    FindDealerData &&
    FindDealerData?.length > 0 &&
    FindDealerData?.some((data: Cities) => {
      return data?.otherServices && data?.otherServices?.length > 0;
    });

  const containerStyle = { width: "100%", height: "100%" };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA9gkthu4VcxNOKAFumozbGGqwcWHhRtl4",
  });

  const mapRef = React.useRef<google.maps.Map | null>(null);
  const onLoad = React.useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);
  const onUnmount = React.useCallback(() => {
    mapRef.current = null;
  }, []);

  const [selectedSort, setSelectedSort] = React.useState<number>(2); //left city results
  const [mapWidthFull, setMapWidthFull] = React.useState<boolean>(false); //full screen map
  const [sortWidthFull, setSortWidthFull] = React.useState<boolean>(false); //full screen left results
  const [center, setCenterMap] = React.useState({ lat: 43.43668501090926, lng: 44.824601547178226 }); //google map center
  const [_, setMarkerPosition] = React.useState(center); //marker positions

  // clicked city coordinates and set map
  const [activeCity, setActiveCity] = React.useState<string | null>(null);

  const handleCityClick = (city: Cities) => {
    if (city?.coordinates) {
      setCenterMap(city.coordinates);
      setMarkerPosition(city.coordinates);
      setActiveCity(city?._id);

      // Open the marker modal
      setMarkerModal(city?._id);
    }
  };

  //return accord to selectedSort map width or sort width
  React.useEffect(() => {
    if (selectedSort === 1) {
      setMapWidthFull(true);
      setSortWidthFull(false);
    } else if (selectedSort === 3) {
      setMapWidthFull(false);
      setSortWidthFull(true);
    } else if (selectedSort === 2) {
      setMapWidthFull(false);
      setSortWidthFull(false);
    }
  }, [selectedSort]);

  const handleSort = (id: number) => {
    setSelectedSort(id);
  };

  const customIcon = {
    url: "/customlocationicon.svg",
    scaledSize: isLoaded ? new window.google.maps.Size(60, 60) : undefined,
  };

  const [markerModal, setMarkerModal] = React.useState<string | null>(null);
  const handleClickMarkerModal = (id: string) => {
    setMarkerModal((prev) => (prev === id ? null : id));
  };

  const cityRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  React.useEffect(() => {
    if (activeCity !== null && cityRefs.current[activeCity]) {
      cityRefs.current[activeCity]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeCity]);

  //Select service modal
  const [serviceModal, setServiceModal] = React.useState<boolean>(false);

  const handleSelectServiceModal = () => {
    setServiceModal(true);
  };

  //Get contact with Dealer
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedCity, setSelectedCity] = React.useState<any>(null);
  const [selectedDealer, setSelectedDealer] = React.useState<any>(null);
  const [name, setName] = React.useState<string>("");
  const [surname, setSurname] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [telephone, setTelephone] = React.useState<string>("");

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const dataDealerContacts = {
        name: name,
        surname: surname,
        dealerCenter: selectedDealer?.label || "",
        city: selectedCity?.label || "",
        telephone: telephone,
        email: email,
        created_at: moment().format("DD.MM.YYYY"),
        hours: moment().format("HH:mm"),
      };

      const response = await axios.post(`${api}/dealer-contacts`, dataDealerContacts);

      if (response.data) {
        setName("");
        setSurname("");
        setSelectedCity("");
        setSelectedDealer("");
        setEmail("");
        setTelephone("");
        toast.success("Əlaqə istəyiniz müvəffəqiyyətlə göndərilmişdir.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="dealer-page-wrapper">
      <div className="dealer-page">
        <article className="top-title">
          <h1>satış nöqtəsi tap</h1>
        </article>

        <div className="container-for-map">
          <div className="map-header">
            <section className="left-sorted-and-button">
              <div className="sorteds">
                {SortedData.map((data: SortedType) => (
                  <div
                    onClick={() => handleSort(data.id)}
                    key={data.id}
                    className={`icons ${selectedSort === data.id ? "active" : ""}`}>
                    {data.icon}
                  </div>
                ))}
              </div>
              <button className="select-a-service" onClick={handleSelectServiceModal}>
                servis seç
              </button>
            </section>
          </div>
          <div className="map-body">
            <div
              className={`container-left-results ${
                mapWidthFull ? "hidden" : sortWidthFull ? "expanded" : "no-expanded"
              }`}>
              {hasData &&
                FindDealerData?.map((city: Cities) => (
                  <div
                    ref={(el) => (cityRefs.current[city._id] = el)}
                    className={`city-container ${activeCity === city._id ? "actived" : ""}`}
                    key={city._id}
                    onClick={() => handleCityClick(city)}>
                    <Link target="_blank" to={city?.websiteLink || ""} className="get-a-website">
                      <img src="/earth.svg" alt="earth" title="Website-a get" />
                      <span>Website-a get</span>
                    </Link>
                    <section className="city-content-container">
                      <article className="top-information">
                        <h3>{city.cityName}</h3>
                        <div className="adress-and-more">
                          {hasDataInformations &&
                            city?.informations?.map((info: any) => (
                              <div className="spec-line" key={info?._id || ""}>
                                <span>{info?.title || ""}</span>
                                <strong>{info?.value || ""}</strong>
                              </div>
                            ))}
                        </div>
                      </article>
                      <article className="other-services">
                        <h4>Digər xidmətlər</h4>
                        <div className="service-grid">
                          {hasDataOtherServices &&
                            city?.otherServices?.map((serv: any) => (
                              <div key={serv?._id || ""} className="service-item">
                                <div className="icon-wrap">
                                  <img
                                    src={`${base}${serv?.serviceIcon}` || ""}
                                    alt={`${serv?._id}`}
                                    title={serv?.serviceName || ""}
                                  />
                                </div>
                                <p>{serv?.serviceName || ""}</p>
                              </div>
                            ))}
                        </div>
                      </article>
                      <article className="button">
                        <button className="for-more" onClick={() => setServiceModal(true)}>
                          <span>Daha çox</span>
                          <FaAngleRight className="iconright" />
                        </button>
                      </article>
                    </section>
                  </div>
                ))}
            </div>
            <div className="map">
              {isLoaded ? (
                <GoogleMap
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  zoom={4}
                  center={center}
                  mapContainerStyle={containerStyle}>
                  {hasData &&
                    FindDealerData?.map((city: Cities) => (
                      <Marker
                        key={city._id}
                        position={city.coordinates}
                        icon={customIcon}
                        onClick={() => {
                          setCenterMap(city.coordinates);
                          handleClickMarkerModal(city._id);
                        }}>
                        {markerModal === city._id && (
                          <InfoWindow onCloseClick={() => handleClickMarkerModal(city._id)}>
                            <div className="info-window-modal">
                              <Link target="_blank" to={city?.websiteLink || ""} className="get-a-website">
                                <img src="/earth.svg" alt="earth" title="Website-a get" />
                                <span>Website-a get</span>
                              </Link>

                              <section className="city-content-container">
                                <article className="top-information">
                                  <h3>{city?.cityName}</h3>
                                  <div className="adress-and-more">
                                    {hasDataInformations &&
                                      city?.informations?.map((info: any) => (
                                        <div className="spec-line" key={info?._id}>
                                          <span>{info?.title || ""}</span>
                                          <strong>{info?.value || ""}</strong>
                                        </div>
                                      ))}
                                  </div>
                                </article>
                                <article className="other-services">
                                  <h4>Digər xidmətlər</h4>
                                  <div className="service-grid">
                                    {hasDataOtherServices &&
                                      city?.otherServices?.map((serv: any) => (
                                        <div key={serv?._id || ""} className="service-item">
                                          <div className="icon-wrap">
                                            <img
                                              src={`${base}${serv?.serviceIcon}` || ""}
                                              alt={`${serv?._id || ""}`}
                                              title={serv?.serviceName || ""}
                                            />
                                          </div>
                                          <p>{serv?.serviceName || ""}</p>
                                        </div>
                                      ))}
                                  </div>
                                </article>
                                <article className="button">
                                  <button className="for-more" onClick={() => setServiceModal(true)}>
                                    <span>Daha çox</span>
                                    <FaAngleRight className="iconright" />
                                  </button>
                                </article>
                              </section>
                            </div>
                          </InfoWindow>
                        )}
                      </Marker>
                    ))}
                </GoogleMap>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="contact-with-dealer">
          <form acceptCharset="UTF-8" className="form-with-dealer" onSubmit={handleSubmitForm}>
            <h2>dilerlə əlaqə</h2>
            <div className="select-inputs">
              {/* select city */}
              <div className="field">
                <Select
                  placeholder="Şəhər seç*"
                  styles={Styles}
                  required
                  name="city"
                  defaultValue={selectedCity}
                  onChange={setSelectedCity}
                  options={optionsCity ? optionsCity : []}
                />
              </div>

              {/* select dealer center */}
              <div className="field">
                <Select
                  placeholder="Diler mərkəzi seç*"
                  styles={Styles}
                  required
                  name="dealerCenter"
                  defaultValue={selectedDealer}
                  onChange={setSelectedDealer}
                  options={optionsDealerCenter ? optionsDealerCenter : []}
                />
              </div>
            </div>

            <div className="perconal-data">
              <h4>Personal data</h4>
              <div className="field">
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  type="text"
                  required
                  value={name}
                  name="name"
                  className="nameinput"
                  placeholder="Ad*"
                />
              </div>
              <div className="field">
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)}
                  type="text"
                  name="surname"
                  value={surname}
                  required
                  className="nameinput"
                  placeholder="Soyad*"
                />
              </div>
            </div>

            <div className="info-data">
              <h4>Əlaqə məlumatları</h4>
              {/* email */}
              <div className="field">
                <input
                  className="emailinput"
                  type="email"
                  required
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="Email*"
                  name="email"
                  id="email"
                />
              </div>
              {/* telephone */}
              <div className="field">
                <PhoneInput
                  value={telephone}
                  onChange={(value: string) => setTelephone(value)}
                  placeholder="Telefon*"
                  country={"az"}
                  onlyCountries={["az", "tr", "us", "de", "ru", "uz"]}
                />
              </div>
            </div>

            <div className="rules-contain">
              <div className="rule">
                <input type="checkbox" required />
                <Link to="">Şəxsi məlumatların emalı ilə razıyam</Link>
              </div>
              <div className="rule">
                <input type="checkbox" />
                <Link to="">Daha çox əlaqə</Link>
              </div>
            </div>

            <div className="button-for-submit">
              <button type="submit" disabled={loading} className="submit-dealer">
                {loading ? "Göndərilir..." : "Göndər"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* select service modal */}
      <div className={`select-service-modal-overlay ${serviceModal ? "active-overlay" : ""}`}>
        <div className={`select-service-modal ${serviceModal ? "active" : ""}`}>
          <SelectServiceModal setServiceModal={setServiceModal} />
        </div>
      </div>
    </main>
  );
};

export default FindDealer;
