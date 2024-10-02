import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { base, useRequests } from "../../hooks/useRequests";
import { KaiyiHistoryNews } from "../../types/ApiTypes";
import { useTranslates } from "../../hooks/useTranslates";

const Newspage: React.FC = () => {

  const { translations } = useTranslates();
  
  const { KaiyiHistoryNews } = useRequests();

  const hasKaiyiNews = KaiyiHistoryNews && KaiyiHistoryNews?.length > 0;

  const videoRefs = React.useRef<Record<string, HTMLVideoElement | null>>({});

  const [hoverCover, setHoverCover] = React.useState<string | null>(null);

  React.useEffect(() => {
    const currentVideoRef = videoRefs.current[hoverCover || ""];
    if (currentVideoRef) {
      currentVideoRef.playbackRate = 2;
    }

    const resetVideoSpeed = () => {
      Object.keys(videoRefs.current).forEach((key) => {
        if (videoRefs.current[key]) {
          videoRefs.current[key].playbackRate = 1;
        }
      });
    };

    return () => resetVideoSpeed();
  }, [hoverCover]);

  return (
    <main className="news-wrapper">
      <div className="news-page">
        <h1>news</h1>

        <div className="grid-news">
          {hasKaiyiNews &&
            KaiyiHistoryNews?.map((data: KaiyiHistoryNews) => (
              <Link
                to={`/news/${data?._id}`}
                className="news-item"
                key={data?._id}
                onMouseEnter={() => setHoverCover(data?._id)}
                onMouseLeave={() => setHoverCover(null)}>
                <div className="image-news">
                  {/* if hover show video clip */}
                  {data?.video ? (
                    <div className={`hidden-video ${hoverCover === data?._id ? "showed" : ""}`}>
                      <video
                        autoPlay={true}
                        controls={false}
                        muted={true}
                        loop={true}
                        ref={(el) => (videoRefs.current[data._id] = el)}
                        disablePictureInPicture
                        src={`${base}${data?.video}` || ""}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <img src={`${base}${data?.image}` || ""} alt={`${data?._id}`} title={data?.title} />
                </div>
                <div className="bottom">
                  <h1>{data?.title}</h1>
                  <p>{data?.slogan}</p>
                  <div className="button">
                    <Link to={`/news/${data?.slug}`} className="read-more">
                      <span>{translations['read_more_button']}</span>
                      <FaAngleRight className="right" />
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
};

export default Newspage;
