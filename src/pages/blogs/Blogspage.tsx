import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { base, useRequests } from "../../hooks/useRequests";
import { KaiyiHistoryBlogs } from "../../types/ApiTypes";
import { useTranslates } from "../../hooks/useTranslates";

const Blogspage: React.FC = () => {

  const { translations } = useTranslates();

  const { KaiyiHistoryBlogs } = useRequests();

  const hasKaiyiBlogs = KaiyiHistoryBlogs && KaiyiHistoryBlogs?.length > 0;

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
    <main className="blogs-wrapper">
      <div className="blogs-page">
        <h1>blogs</h1>

        <div className="grid-blogs">
          {hasKaiyiBlogs &&
            KaiyiHistoryBlogs?.map((data: KaiyiHistoryBlogs) => (
              <Link
                to={`/blog/${data?._id}`}
                className="blogs-item"
                key={data?._id}
                onMouseEnter={() => setHoverCover(data?._id)}
                onMouseLeave={() => setHoverCover(null)}>
                <div className="image-blogs">
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
                    <div className="read-more">
                      <span>{translations['read_more_button']}</span>
                      <FaAngleRight className="right" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
};

export default Blogspage;
