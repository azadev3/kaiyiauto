import React from "react";
import { base, useRequests } from "../../../hooks/useRequests";
import { KaiyiHistoryBlogs } from "../../../types/ApiTypes";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Blogsinner: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { KaiyiHistoryBlogs } = useRequests();

  const blog =
    KaiyiHistoryBlogs &&
    KaiyiHistoryBlogs.find((blogs: KaiyiHistoryBlogs) => {
      return blogs?._id === id;
    });

  return (
    <main className="blogs-inner-page-wrapper">
      <Helmet>
        <title>{blog?.title || ""}</title>
        <meta name="descript" content={blog?.description || ""} />
      </Helmet>
          <div className="blogs-inner-page" key={blog?._id}>
            <h1>{blog?.title}</h1>
            <strong className="time">
              <span>{blog?.created_at}</span>
              <span>{blog?.hours}</span>
            </strong>
            <div className="image-blogs">
              {blog?.video ? (
                <video
                  src={`${base}${blog?.video}` || ""}
                  title={blog?.title || ""}
                  autoPlay={false}
                  loop={false}
                  controls={true}
                  disablePictureInPicture
                />
              ) : blog?.image ? (
                <img src={`${base}${blog?.image}` || ""} alt={`${blog?._id || ""}`} title={blog?.title || ""} />
              ) : null}
            </div>

            <div
              className="description-blogs"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog?.description ? blog?.description : "") }}
            />
          </div>
    </main>
  );
};

export default Blogsinner;
