import React, { ChangeEvent, FormEvent, SetStateAction } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import PhoneInput from "react-phone-input-2";
import { Link } from "react-router-dom";
import Select from "react-select";
import { api, useRequests } from "../../../hooks/useRequests";
import { AddDealerData, Cities, ModelsType } from "../../../types/ApiTypes";
import { useTranslates } from "../../../hooks/useTranslates";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";

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

const SelectServiceModal: React.FC<{ setServiceModal: React.Dispatch<SetStateAction<boolean>> }> = ({
  setServiceModal,
}) => {
  const { translations } = useTranslates();

  const [selectedService, setSelectedService] = React.useState<string>("");
  const [selectedCity, setSelectedCity] = React.useState<string>("");
  const [selectedDealer, setSelectedDealer] = React.useState<string>("");
  const [selectedAutomobile, setSelectedAutomobile] = React.useState<string>("");
  const [tel, setTel] = React.useState<string>("");
  const [namesurname, setNameSurname] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

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
  const { FindDealerData, AddDealerData, ModelsData } = useRequests();
  //control has data
  const hasDealerData = FindDealerData && FindDealerData?.length > 0;

  //get servicesOptions in FindDealerData and manipulate according React Select props
  const servicesOptions = hasDealerData
  ? FindDealerData?.flatMap((data: Cities) =>
      data?.otherServices?.map((serv: any) => ({
        value: serv?.serviceName,
        label: serv?.serviceName,
      }))
    )
  : [];

    console.log(FindDealerData, 'finddeall')

  const optionsCity =
    hasDealerData &&
    FindDealerData?.map((data: Cities) => ({
      value: data?.cityName,
      label: data?.cityName,
    }));


  const optionsDealer =
    AddDealerData &&
    AddDealerData?.map((data: AddDealerData) => ({
      value: data?.dealerName,
      label: data?.dealerName,
    }));

  const optionsModel =
    ModelsData &&
    ModelsData?.map((data: ModelsType) => ({
      value: data?.title,
      label: data?.title,
    }));

  const [loading, setLoading] = React.useState<boolean>(false);
  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const createdAt = moment().format("DD.MM.YYYY");
    const hours = moment().format("HH:mm");

    try {
      const data = {
        serviceName: selectedService,
        cityName: selectedCity,
        dealerCenter: selectedDealer,
        automobile: selectedAutomobile,
        name: namesurname,
        telephone: tel,
        email: email,
        created_at: createdAt,
        hours: hours,
      }

      const res = await axios.post(`${api}/dealer-contacts-service`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.data) {
        toast.success("Əlaqə istəyiniz müvəffəqiyyətlə göndərilmişdir.", {
          position: "top-center",
        });
        setSelectedService("");
        setSelectedCity("");
        setSelectedDealer("");
        setSelectedAutomobile("");
        setNameSurname("");
        setTel("");
        setEmail("");
      } else {
        toast.error("Əlaqə istəyiniz göndərilmədi.", {
          position: "top-center",
        });
        console.log(res.status);
      }

    } catch (error) {
      toast.error("Əlaqə istəyiniz göndərilmədi. Serverlə əlaqə saxlayın..", {
        position: "top-center",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div ref={serviceModalRef} className="select-service-modal-inner">
      <IoIosCloseCircleOutline className="close-modal" onClick={() => setServiceModal(false)} />
      <section className="top-titles">
        <h2>{translations['bir_servis_secin']}</h2>
        <p>{translations['select_service_title']}</p>
      </section>

      <form onSubmit={submitForm} acceptCharset="UTF-8" className="service-form">
        {/* select service */}
        <div className="field">
          <label>{translations['service_title']}</label>
          <Select
            name="serviceName"
            placeholder={`${translations['servis_sec_placeholder']}`}
            styles={Styles}
            required
            onChange={(value: any) => {
              setSelectedService(value.label);
            }}
            options={servicesOptions ? servicesOptions : []}
          />
        </div>
        {/* select city */}
        <div className="field">
          <label>{translations['city_title']}</label>
          <Select
            name="cityName"
            placeholder={`${translations['seher_sec_placeholder']}`}
            styles={Styles}
            required
            onChange={(value: any) => {
              setSelectedCity(value.label);
            }}
            options={optionsCity ? optionsCity : []}
          />
        </div>

        {/* select dealer center */}
        <div className="field">
          <label>{translations['diler_merkezi_sec_placeholder']}</label>
          <Select
            placeholder={`${translations['diler_merkezi_sec_placeholder']}`}
            styles={Styles}
            name="dealerCenter"
            required
            onChange={(value: any) => {
              setSelectedDealer(value.label);
            }}
            options={optionsDealer ? optionsDealer : []}
          />
        </div>

        {/* select automobile */}
        <div className="field">
          <label>{translations['avtomobil_title']}</label>
          <Select
            placeholder="Model*"
            styles={Styles}
            name="automobile"
            required
            onChange={(value: any) => {
              setSelectedAutomobile(value.label);
            }}
            options={optionsModel ? optionsModel : []}
          />
        </div>

        {/* name surname */}
        <div className="field">
          <label>{translations['ad_soyad_placeholder']}</label>
          <input
            className="nameinput"
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNameSurname(e.target.value)}
            placeholder={`${translations['ad_soyad_placeholder']}`}
            name="name"
            id="name_surname"
            required
          />
        </div>

        {/* telephone */}
        <div className="field">
          <label>{translations['telephone_placeholder']}</label>
          <PhoneInput
            value={tel}
            onChange={(value: string | undefined) => setTel(value || '')}
            placeholder={`${translations['telephone_placeholder']}`} country={"az"} onlyCountries={["az", "tr", "us", "de", "ru", "uz"]} />
        </div>
        {/* email */}
        <div className="field">
          <label>{translations['email_placeholder']}</label>
          <input
            className="emailinput"
            type="email"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder={`${translations['email_placeholder']}`}
            name="email"
            id="email"
          />
        </div>

        <div className="rules">
          <input required name="d" type="checkbox" />
          <Link to="">{translations['sexsi_melumatlarin_emali_ile_raziyam']}</Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            pointerEvents: loading ? 'none' : 'all',
            backgroundColor: loading ? '#eee' : '',
            border: loading ? '1px solid #303030' : '',
            color: loading ? '#404040' : '',
          }}>{translations["gonder_button"]}</button>
      </form>
    </div>
  );
};

export default SelectServiceModal;
