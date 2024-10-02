import React, { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { api } from "../../../hooks/useRequests";
import { toast } from "react-toastify";
import Loader from "../../../ui/Loader";
import moment from "moment";
import { useTranslates } from "../../../hooks/useTranslates";

const SubscribeSection: React.FC = () => {
 
  const { translations } = useTranslates();

  const [loading, setLoading] = React.useState<boolean>(false);

  const [email, setEmail] = React.useState<string>("");

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        email: email,
        created_at: moment().format("DD.MM.YYYY HH:mm"),
      };

      const response = await axios.post(`${api}/subscribeNews`, data);
      if (response.data) {
        toast.success("Məlumat göndərildi!", {
          position: "top-center",
        });
        setEmail("");
      } else {
        toast.error("Göndərilən məlumatın düzgünlüyünü yoxlayın, yenidən cəhd edin.", {
          position: "top-center",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast.warning("Lütfən mövcud emailinizi daxil edin", {
            position: "top-center",
          });
        }
      } else {
        toast.error("Serverlə bağlı bir problem oldu, zəhmət olmasa yenidən cəhd edin.", {
          position: "top-center",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="subscribe-on-news-wrapper">
      <div className="subscribe-on-news">
        <h2>{translations['xeberlere_abone_ol']}</h2>

        <form acceptCharset="UTF-8" onSubmit={submitForm}>
          <div className="subscribe-input">
            <input
              value={email || ""}
              type="email"
              placeholder={`${translations['email_placeholder']}`}
              required
              name="email"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            <button disabled={loading} className="submit-btn" type="submit">
              {loading ? <Loader /> : `${translations['gonder_button']}`}
            </button>
          </div>
          <div className="checkbox-agree">
            <input required type="checkbox" id="rules" name="rules" />
            <span>{translations['sexsi_melumatlarin_emali_ile_raziyam']}</span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SubscribeSection;
