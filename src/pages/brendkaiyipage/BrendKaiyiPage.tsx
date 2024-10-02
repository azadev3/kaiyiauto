import React from "react";
import { base, useRequests } from "../../hooks/useRequests";
import { KaiyiHistoryBottom, KaiyiHistoryHero } from "../../types/ApiTypes";

const BrendKaiyiPage: React.FC = () => {
  const { KaiyiHistoryHero, KaiyiHistoryBottom } = useRequests();

  const hasKaiyiHistoryHero = KaiyiHistoryHero && KaiyiHistoryHero?.length > 0;

  const hasKaiyiHistoryBottom = KaiyiHistoryBottom && KaiyiHistoryBottom?.length > 0;

  return (
    <main className="brendkaiyi-wrapper">
      <div className="brendkaiyi-page">
        {hasKaiyiHistoryHero &&
          KaiyiHistoryHero?.map((data: KaiyiHistoryHero) => (
            <div className="image-contain" style={{ backgroundImage: `url(${base}${data?.image})` }}>
              <div className="wrapper">
                <h1>{data?.title}</h1>
                {data?.description ? <p>{data.description}</p> : ""}
              </div>
            </div>
          ))}

        <div className="grid-history">
          {hasKaiyiHistoryBottom &&
            KaiyiHistoryBottom?.map((data: KaiyiHistoryBottom) => (
              <div key={data?._id} className="item-history">
                <section className="left-section">
                  <span className="special-year">{data?.year}</span>
                  <h2>{data?.title}</h2>
                  <p>{data?.description}</p>
                </section>

                <section className="right-section">
                  <img src={`${base}${data?.image}` || ""} alt={`${data?._id}-image`} title={data?.title} />
                </section>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default BrendKaiyiPage;
