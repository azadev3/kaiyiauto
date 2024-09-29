import React from "react";
import { api, base, useRequests } from "../../../hooks/useRequests";
import { KaiyiHistoryBlogs } from "../../../types/ApiTypes";
import DOMPurify from "dompurify";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../../recoil/Atom";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../../ui/Loader";

const Blogsinner: React.FC = () => {
  const { slug, lang } = useParams<{ slug: string; lang: string }>();
  const navigate = useNavigate();
  const { KaiyiHistoryBlogs } = useRequests();
  const [blog, setBlog] = React.useState<KaiyiHistoryBlogs[]>([]);

  const selectedLang = useRecoilValue(SelectedLanguageState);

  const findedSlug =
    KaiyiHistoryBlogs &&
    KaiyiHistoryBlogs.find((blogs: KaiyiHistoryBlogs) => {
      return blogs?.slug;
    })?.slug;

  React.useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${api}/${selectedLang}/blog/${findedSlug}`, {
          headers: {
            "Accept-Language": selectedLang,
          },
        });
        if (response.data) {
          setBlog(response.data);
        } else {
          console.log(response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlog();
  }, [selectedLang, findedSlug]);

  // update URL
  React.useEffect(() => {
    if (slug !== findedSlug || lang !== selectedLang) {
      navigate(`/${selectedLang}/blog/${findedSlug}`, { replace: true });
    }
  }, [selectedLang, findedSlug, lang, navigate]);

  return (
    <main className="blogs-inner-page-wrapper">
      {blog ? (
        blog.map((blog: KaiyiHistoryBlogs) => (
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
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog?.description) }}
            />
          </div>
        ))
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default Blogsinner;
