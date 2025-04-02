import React, { ChangeEvent, FormEvent } from "react";
import PhoneInput from "react-phone-input-2";
import { Link } from "react-router-dom";
import { api, base, SeoInterface, useRequests } from "../../hooks/useRequests";
import { KaiyiHistoryContactHero } from "../../types/ApiTypes";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslates } from "../../hooks/useTranslates";
import { SelectedLanguageState } from "../../recoil/Atom";
import { useRecoilValue } from "recoil";
import { Helmet } from "react-helmet-async";

const Contact: React.FC = () => {

  const { translations } = useTranslates();

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


  const lang = useRecoilValue(SelectedLanguageState);
  const [seoData, setSeoData] = React.useState<SeoInterface>();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/contact-seo-front`, {
          headers: {
            "Accept-Language": lang
          }
        });
        if (response.data) {
          setSeoData(response.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [lang]);

  return (
    <main className="contact-wrapper">
      <Helmet>
        <title>{seoData?.meta_title}</title>
        <meta name="description" content={seoData?.meta_description} />
      </Helmet>
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
          <h2>{translations['feedback_title']}</h2>
          <form acceptCharset="UTF-8" onSubmit={handleSubmitForm}>
            <div className="field-area">
              <label>{translations['sexsi_melumatlar_title']}</label>
              <input
                name="name"
                value={name}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                type="text"
                placeholder={`${translations['ad_placeholder']}`}
              />
            </div>
            <div className="field-area">
              <label>{translations['elaqe_melumatlari']}</label>
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
                  <Link to="">{translations['sexsi_melumatlarin_emali_ile_raziyam']}</Link>
                </div>
                <div className="rule">
                  <input type="checkbox" />
                  <Link to="">{translations['daha_cox_elaqe_title']}</Link>
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? `${translations['gonderilir_title']}` : `${translations['gonder_button']}`}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contact;
