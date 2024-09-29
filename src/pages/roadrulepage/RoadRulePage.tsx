import React from "react";
import { Link } from "react-router-dom";
import { base, useRequests } from "../../hooks/useRequests";
import { TrafficRulesBottom, TrafficRulesCall, TrafficRulesHelped, TrafficRulesHero } from "../../types/ApiTypes";
import DOMPurify from "dompurify";

const RoadRulePage: React.FC = () => {
  //fetch road rules apis in hook
  const { TrafficRulesHeroData, TrafficRulesCallData, TrafficRulesHelpedData, TrafficRulesBottomData } = useRequests();

  const hasTrafficHero = TrafficRulesHeroData && TrafficRulesHeroData?.length > 0;

  const hasTrafficCall = TrafficRulesCallData && TrafficRulesCallData?.length > 0;

  const hasTrafficHelped = TrafficRulesHelpedData && TrafficRulesHelpedData?.length > 0;

  const hasTrafficBottomData = TrafficRulesBottomData && TrafficRulesBottomData?.length > 0;

  return (
    <main className="roadrule-wrapper">
      <div className="roadrule-page">
        {hasTrafficHero &&
          TrafficRulesHeroData?.map((data: TrafficRulesHero) => (
            <div
              key={data?._id}
              className="image-contain"
              style={{ backgroundImage: `url(${base}${data?.image || ""})` }}>
              <div className="wrapper">
                <h1>{data?.title || ""}</h1>
                <p>{data?.description || ""}</p>
              </div>
            </div>
          ))}

        {hasTrafficCall &&
          TrafficRulesCallData?.map((data: TrafficRulesCall) => (
            <div key={data?._id} className="road-help">
              <section className="left">
                <h2>{data?.title}</h2>
                <p>{data?.description}</p>
              </section>
              <section className="right">
                <p className="mini-description">{data?.miniTitle}</p>
                <Link to="" className="tel">
                  {data?.telephone}
                </Link>
                <button className="get-call">Zəng vur</button>
              </section>
            </div>
          ))}

        <div className="other-description-container">
          <h2>Texniki yardmin bir hissesi kimi</h2>
          <div className="grid-other">
            {hasTrafficHelped &&
              TrafficRulesHelpedData?.map((data: TrafficRulesHelped) => (
                <article key={data?._id} className="other-item">
                  <div className="icon-left">
                    <img src={`${base}${data?.image}` || ""} alt={`${data?._id}`} title={data?.title} />
                  </div>
                  <p>{data?.title}</p>
                </article>
              ))}
          </div>
        </div>

        {hasTrafficBottomData &&
          TrafficRulesBottomData?.map((data: TrafficRulesBottom) => (
            <div key={data?._id} className="bottom-container">
              <section className="left-image-area">
                <img src={`${base}${data?.image}` || ""} alt={`${data?._id}`} />
              </section>
              <div
                className="right-description-area"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.description) }}
              />
            </div>
          ))}

        <p className="msg-main">* The service is provided to individuals</p>
      </div>
    </main>
  );
};

export default RoadRulePage;
