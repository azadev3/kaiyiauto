import React from "react";
import { base, useRequests } from "../../hooks/useRequests";
import { KaiyiGuarantAttention, KaiyiGuarantDescription, KaiyiGuarantHero } from "../../types/ApiTypes";
import DOMPurify from "dompurify";

const GuarantePage: React.FC = () => {
  //get datas in the hook
  const { KaiyiGuarantHeroData, KaiyiGuarantDescriptionData, KaiyiGuarantAttentionData } = useRequests();

  const hasGuarantHero = KaiyiGuarantHeroData && KaiyiGuarantHeroData?.length > 0;

  const hasGuarantDescription = KaiyiGuarantDescriptionData && KaiyiGuarantDescriptionData?.length > 0;

  const hasGuarantAttention = KaiyiGuarantAttentionData && KaiyiGuarantAttentionData?.length > 0;

  return (
    <main className="guarante-wrapper">
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
