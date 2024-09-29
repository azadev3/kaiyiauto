import React, { ChangeEvent, SetStateAction } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import PhoneInput from "react-phone-input-2";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useRequests } from "../../../hooks/useRequests";
import { Cities } from "../../../types/ApiTypes";

const Styles = {
  control: (baseStyle: any, state: any) => ({
    ...baseStyle,
    backgroundColor: "#FFFFFF",
    border: state.isFocused ? "1px solid black" : "1px solid #DFDFDF",
    boxShadow: state.isFocused ? "none" : "none",
    maxWidth: "100%",
    minWidth: "648px",
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


const optionsDealerCenter = [
  { value: "a", label: "City" },
  { value: "a2", label: "City2" },
  { value: "a3", label: "City3" },
];

const optionsAutomobile = [
  { value: "a", label: "City" },
  { value: "a2", label: "City2" },
  { value: "a3", label: "City3" },
];

const SelectServiceModal: React.FC<{ setServiceModal: React.Dispatch<SetStateAction<boolean>> }> = ({
  setServiceModal,
}) => {
  const [selectedService, setSelectedService] = React.useState<any>(null);
  const [selectedCity, setSelectedCity] = React.useState<any>(null);
  const [selectedDealer, setSelectedDealer] = React.useState<any>(null);
  const [selectedAutomobile, setSelectedAutomobile] = React.useState<any>(null);
  const [__, setNameSurname] = React.useState<string>("");
  const [_, setEmail] = React.useState<string>("");

  const serviceModalRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (serviceModalRef?.current && !serviceModalRef?.current?.contains(e.target as Node)) {
        setServiceModal(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  //get dynamic Servis names, cities, dilers and more.. options
  const { FindDealerData } = useRequests();

  //control has data
  const hasDealerData = FindDealerData && FindDealerData?.length > 0;

  //get servicesOptions in FindDealerData and manipulate according React Select props
  const servicesOptions =
    hasDealerData &&
    FindDealerData?.map((data: Cities) =>
      data?.otherServices?.map((serv: any) => ({
        value: serv?._id,
        label: serv?.serviceName,
      }))
    );

  const optionsCity = hasDealerData && FindDealerData?.map((data: Cities) => ({
    value: data?._id,
    label: data?.cityName,
  }));

  return (
    <div ref={serviceModalRef} className="select-service-modal-inner">
      <IoIosCloseCircleOutline className="close-modal" onClick={() => setServiceModal(false)} />
      <section className="top-titles">
        <h2>Bir servis seçin</h2>
        <p>Bir sorğu buraxın və diler sizinlə əlaqə saxlasın</p>
      </section>

      <form action="" acceptCharset="UTF-8" className="service-form">
        {/* select service */}
        <div className="field">
          <label>Service</label>
          <Select
            placeholder="Servis seç*"
            styles={Styles}
            defaultValue={selectedService}
            onChange={setSelectedService}
            options={servicesOptions ? servicesOptions?.flat() : []}
          />
        </div>
        {/* select city */}
        <div className="field">
          <label>City</label>
          <Select
            placeholder="Şəhər seç*"
            styles={Styles}
            defaultValue={selectedCity}
            onChange={setSelectedCity}
            options={optionsCity ? optionsCity : []}
          />
        </div>

        {/* select dealer center */}
        <div className="field">
          <label>Diler mərkəzi</label>
          <Select
            placeholder="Diler mərkəzi seç*"
            styles={Styles}
            defaultValue={selectedDealer}
            onChange={setSelectedDealer}
            options={optionsDealerCenter}
          />
        </div>

        {/* select automobile */}
        <div className="field">
          <label>Avtomobil</label>
          <Select
            placeholder="Model*"
            styles={Styles}
            defaultValue={selectedAutomobile}
            onChange={setSelectedAutomobile}
            options={optionsAutomobile}
          />
        </div>

        {/* name surname */}
        <div className="field">
          <label>Ad və soyad</label>
          <input
            className="nameinput"
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNameSurname(e.target.value)}
            placeholder="Ad & Soyad*"
            name="name_surname"
            id="name_surname"
          />
        </div>

        {/* telephone */}
        <div className="field">
          <label>Telefon</label>
          <PhoneInput placeholder="Telefon*" country={"az"} onlyCountries={["az", "tr", "us", "de", "ru", "uz"]} />
        </div>
        {/* email */}
        <div className="field">
          <label>Email</label>
          <input
            className="emailinput"
            type="email"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="Email*"
            name="email"
            id="email"
          />
        </div>

        <div className="rules">
          <input type="checkbox" />
          <Link to="">Şəxsi məlumatların emalı ilə razıyam</Link>
        </div>

        <button type="submit">İstək göndər</button>
      </form>
    </div>
  );
};

export default SelectServiceModal;
