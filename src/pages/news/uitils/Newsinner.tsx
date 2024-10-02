import React from "react";
import { useParams } from "react-router-dom";
import { base, useRequests } from "../../../hooks/useRequests";
import { KaiyiHistoryNews } from "../../../types/ApiTypes";
import DOMPurify from "dompurify";

const Newsinner: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { KaiyiHistoryNews } = useRequests();

  const news =
    KaiyiHistoryNews &&
    KaiyiHistoryNews.find((news: KaiyiHistoryNews) => {
      return news?._id === id;
    });

  return (
    <main className="news-inner-page-wrapper">
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
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(news?.description ? news?.description : "") }}
        />
      </div>
    </main>
  );
};

export default Newsinner;
