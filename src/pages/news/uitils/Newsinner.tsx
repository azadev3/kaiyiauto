import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, base, useRequests } from "../../../hooks/useRequests";
import { KaiyiHistoryNews } from "../../../types/ApiTypes";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../../recoil/Atom";
import axios from "axios";
import DOMPurify from "dompurify";
import Loader from "../../../ui/Loader";

const Newsinner: React.FC = () => {
  const { slug, lang } = useParams<{ slug: string; lang: string }>();
  const navigate = useNavigate();
  const { KaiyiHistoryNews } = useRequests();

  const selectedLang = useRecoilValue(SelectedLanguageState);

  const [news, setNews] = React.useState<KaiyiHistoryNews[]>([]);

  const findedSlug =
    KaiyiHistoryNews &&
    KaiyiHistoryNews.find((news: KaiyiHistoryNews) => {
      return news?.slug;
    })?.slug;

  React.useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${api}/${selectedLang}/news/${findedSlug}`, {
          headers: {
            "Accept-Language": selectedLang,
          },
        });
        if (response.data) {
          setNews(response.data);
        } else {
          console.log(response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchNews();
  }, [selectedLang, findedSlug]);

  // update URL
  React.useEffect(() => {
    if (slug !== findedSlug || lang !== selectedLang) {
      navigate(`/${selectedLang}/news/${findedSlug}`, { replace: true });
    }
  }, [selectedLang, findedSlug, lang, navigate]);

  return (
    <main className="news-inner-page-wrapper">
      {news ? (
        news.map((news: KaiyiHistoryNews) => (
          <div className="news-inner-page" key={news?._id}>
            <h1>{news?.title}</h1>
            <strong className="time">
              <span>{news?.created_at}</span>
              <span>{news?.hours}</span>
            </strong>
            <div className="image-news">
              {news?.video ? (
                <video
                  src={`${base}${news?.video}` || ""}
                  title={news?.title || ""}
                  autoPlay={false}
                  loop={false}
                  controls={true}
                  disablePictureInPicture
                />
              ) : news?.image ? (
                <img src={`${base}${news?.image}` || ""} alt={`${news?._id || ""}`} title={news?.title || ""} />
              ) : null}
            </div>

            <div
              className="description-news"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(news?.description) }}
            />
          </div>
        ))
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default Newsinner;
