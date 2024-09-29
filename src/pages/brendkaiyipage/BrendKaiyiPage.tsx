import React from "react";
import { base, useRequests } from "../../hooks/useRequests";
import { KaiyiHistoryBottom, KaiyiHistoryHero } from "../../types/ApiTypes";

type BrendDataType = {
  id: number;
  title: string;
  description: string;
  year: string;
  image: string;
};

const BrendData: BrendDataType[] = [
  {
    id: 1,
    title: "Şərqi Avropada kütləvi istehsalın başlanması.",
    description:
      "KAIYI markası Rusiya bazarına çıxdı. Yanvar ayında Kalininqrad vilayətindəki AVTOTOR zavodunda KAIYI E5 sedanının istehsalına başlanılıb. İl ərzində şirkət həmçinin KAIYI X3 və X3 Pro şəhər krossoverlərinin və flaqman KAIYI X7 Kunlun krossoverinin istehsalına başlayıb.",
    year: "2020",
    image: "/ss.jpg",
  },
  {
    id: 2,
    title: "Şərqi Avropada kütləvi istehsalın başlanması.",
    description:
      "KAIYI markası Rusiya bazarına çıxdı. Yanvar ayında Kalininqrad vilayətindəki AVTOTOR zavodunda KAIYI E5 sedanının istehsalına başlanılıb. İl ərzində şirkət həmçinin KAIYI X3 və X3 Pro şəhər krossoverlərinin və flaqman KAIYI X7 Kunlun krossoverinin istehsalına başlayıb.",
    year: "2021",
    image: "/ss.jpg",
  },

  {
    id: 3,
    title: "Şərqi Avropada kütləvi istehsalın başlanması.",
    description:
      "KAIYI markası Rusiya bazarına çıxdı. Yanvar ayında Kalininqrad vilayətindəki AVTOTOR zavodunda KAIYI E5 sedanının istehsalına başlanılıb. İl ərzində şirkət həmçinin KAIYI X3 və X3 Pro şəhər krossoverlərinin və flaqman KAIYI X7 Kunlun krossoverinin istehsalına başlayıb.",
    year: "2022",
    image: "/ss.jpg",
  },

  {
    id: 4,
    title: "Şərqi Avropada kütləvi istehsalın başlanması.",
    description:
      "KAIYI markası Rusiya bazarına çıxdı. Yanvar ayında Kalininqrad vilayətindəki AVTOTOR zavodunda KAIYI E5 sedanının istehsalına başlanılıb. İl ərzində şirkət həmçinin KAIYI X3 və X3 Pro şəhər krossoverlərinin və flaqman KAIYI X7 Kunlun krossoverinin istehsalına başlayıb.",
    year: "2023",
    image: "/ss.jpg",
  },

  {
    id: 5,
    title: "Şərqi Avropada kütləvi istehsalın başlanması.",
    description:
      "KAIYI markası Rusiya bazarına çıxdı. Yanvar ayında Kalininqrad vilayətindəki AVTOTOR zavodunda KAIYI E5 sedanının istehsalına başlanılıb. İl ərzində şirkət həmçinin KAIYI X3 və X3 Pro şəhər krossoverlərinin və flaqman KAIYI X7 Kunlun krossoverinin istehsalına başlayıb.",
    year: "2024",
    image: "/ss.jpg",
  },

  {
    id: 6,
    title: "Şərqi Avropada kütləvi istehsalın başlanması.",
    description:
      "KAIYI markası Rusiya bazarına çıxdı. Yanvar ayında Kalininqrad vilayətindəki AVTOTOR zavodunda KAIYI E5 sedanının istehsalına başlanılıb. İl ərzində şirkət həmçinin KAIYI X3 və X3 Pro şəhər krossoverlərinin və flaqman KAIYI X7 Kunlun krossoverinin istehsalına başlayıb.",
    year: "2024",
    image: "/ss.jpg",
  },
];

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
