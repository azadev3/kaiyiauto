import React, { ChangeEvent, FormEvent } from "react";
import PhoneInput from "react-phone-input-2";
import { Link } from "react-router-dom";
import { api, base, useRequests } from "../../hooks/useRequests";
import { KaiyiHistoryContactHero } from "../../types/ApiTypes";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";

const Contact: React.FC = () => {
  const { KaiyiHistoryContactHero } = useRequests();

  const hasContactHero = KaiyiHistoryContactHero && KaiyiHistoryContactHero?.length > 0;

  //Send request for feedback
  const [loading, setLoading] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const [telephone, setTelephone] = React.useState<string>("");

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const dataFeedbacks = {
        name: name,
        telephone: telephone,
        created_at: moment().format("DD.MM.YYYY"),
        hours: moment().format("HH:mm"),
      };

      const response = await axios.post(`${api}/contact-feedbacks`, dataFeedbacks);

      if (response.data) {
        setName("");
        setTelephone("");
        toast.success("Geri dönüşünüz müvəffəqiyyətlə göndərilmişdir.", {
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
    <main className="contact-wrapper">
      <div className="contact-page">
        {hasContactHero &&
          KaiyiHistoryContactHero?.map((data: KaiyiHistoryContactHero) => (
            <React.Fragment key={data?._id}>
              <div className="image-contain" style={{ backgroundImage: `url(${base}${data?.image || ""})` }}>
                <div className="wrapper">
                  <h1>{data?.title || ""}</h1>
                </div>
              </div>

              <div className="description-contact">{data?.description || ""}</div>
            </React.Fragment>
          ))}
        <div className="feedback-contain">
          <h2>feedback</h2>
          <form acceptCharset="UTF-8" onSubmit={handleSubmitForm}>
            <div className="field-area">
              <label>Şəxsi məlumatlar</label>
              <input
                name="name"
                value={name}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                type="text"
                placeholder="Ad*"
              />
            </div>
            <div className="field-area">
              <label>Əlaqə məlumatları</label>
              <PhoneInput
                country={"az"}
                value={telephone}
                onChange={(value: string) => setTelephone(value)}
                onlyCountries={["az", "tr", "us", "de", "ru", "uz"]}
                placeholder="Nömrə*"
              />
              <div className="rules">
                <div className="rule">
                  <input required type="checkbox" />
                  <Link to="">Şəxsi məlumatların emalı ilə razıyam</Link>
                </div>
                <div className="rule">
                  <input type="checkbox" />
                  <Link to="">Daha çox əlaqə</Link>
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Göndərilir..." : "Göndər"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contact;
