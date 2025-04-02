import React from "react";
import { api, base, SeoInterface, useRequests } from "../../hooks/useRequests";
import { KaiyiGuarantAttention, KaiyiGuarantDescription, KaiyiGuarantHero } from "../../types/ApiTypes";
import DOMPurify from "dompurify";
import { SelectedLanguageState } from "../../recoil/Atom";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const GuarantePage: React.FC = () => {
  //get datas in the hook
  const { KaiyiGuarantHeroData, KaiyiGuarantDescriptionData, KaiyiGuarantAttentionData } = useRequests();

  const hasGuarantHero = KaiyiGuarantHeroData && KaiyiGuarantHeroData?.length > 0;

  const hasGuarantDescription = KaiyiGuarantDescriptionData && KaiyiGuarantDescriptionData?.length > 0;

  const hasGuarantAttention = KaiyiGuarantAttentionData && KaiyiGuarantAttentionData?.length > 0;

  const lang = useRecoilValue(SelectedLanguageState);
  const [seoData, setSeoData] = React.useState<SeoInterface>();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/kaiyigarant-seo-front`, {
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
    <main className="guarante-wrapper">
      <Helmet>
        <title>{seoData?.meta_title}</title>
        <meta name="description" content={seoData?.meta_description} />
      </Helmet>
      <div className="guarante-page">
        {hasGuarantHero &&
          KaiyiGuarantHeroData?.map((data: KaiyiGuarantHero) => (
            <div key={data?._id} className="image-contain" style={{ backgroundImage: `url(${base}${data?.image})` }}>
              <div className="wrapper">
                <h1>{data?.title}</h1>
                {data?.description?.length > 0 ? <p className="description-guarant">{data?.description}</p> : ""}
              </div>
            </div>
          ))}

        <div className="description-guarante">
          {hasGuarantDescription &&
            KaiyiGuarantDescriptionData?.map((data: KaiyiGuarantDescription) => (
              <div className="guarant-item" key={data?._id}>
                <div className="left-image">
                  <img src={`${base}${data?.image}`} alt={`${data?._id}`} title={data?.title || ""} />
                </div>
                <p>{data?.description}</p>
              </div>
            ))}
        </div>

        {hasGuarantAttention &&
          KaiyiGuarantAttentionData?.map((data: KaiyiGuarantAttention) => (
            <div className="attention-description" key={data?._id}>
              <div className="descript" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.description) }} />
            </div>
          ))}
      </div>
    </main>
  );
};

export default GuarantePage;
