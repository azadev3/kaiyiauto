import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { useRequests } from "../../hooks/useRequests";
import { RepairHero } from "../../types/ApiTypes";

type Pdfs = {
  id: number;
  pdf: string;
  pdfName: string;
};

type DownloadRuleType = {
  id: number;
  title: string;
  image: string;
  pdfs: Pdfs[];
};

const DownloadRuleData: DownloadRuleType[] = [
  {
    id: 1,
    title: "LOREM 5",
    image: "/car1.jpg",
    pdfs: [
      {
        id: 1,
        pdf: "",
        pdfName: "PETROL, 1.5T, 6MT BACK",
      },
    ],
  },
  {
    id: 2,
    title: "LOREM 5",
    image: "/car2.jpg",
    pdfs: [
      {
        id: 11,
        pdf: "",
        pdfName: "PETROL, 1.5T, 6MT BACK",
      },
      {
        id: 22,
        pdf: "",
        pdfName: "PETROL, 1.5T, 6MT FRONT",
      },
    ],
  },
  {
    id: 3,
    title: "LOREM 5",
    image: "/car1.jpg",
    pdfs: [
      {
        id: 111,
        pdf: "",
        pdfName: "PETROL, 1.5T, 6MT BACK",
      },
      {
        id: 122,
        pdf: "",
        pdfName: "PETROL, 1.5T, 6MT FRONT",
      },
    ],
  },
  {
    id: 4,
    title: "LOREM 5",
    image: "/car2.jpg",
    pdfs: [
      {
        id: 3322,
        pdf: "",
        pdfName: "PETROL, 1.5T, 6MT FRONT",
      },
    ],
  },
];

const RepairRulesPage: React.FC = () => {
  const { RepairHeroData } = useRequests();

  const hasRepairHero = RepairHeroData && RepairHeroData?.length > 0;

  return (
    <main className="repairrule-wrapper">
      <div className="repairrule-page">
        {hasRepairHero &&
          RepairHeroData?.map((data: RepairHero) => (
            <React.Fragment key={data?._id}>
              <div className="image-contain" style={{ backgroundImage: "url('/newsimg.jpeg')" }}>
                <div className="wrapper">
                  <h1>{data?.title}</h1>
                </div>
              </div>

              <p className="description-rule">{data?.description}</p>
            </React.Fragment>
          ))}

        <div className="download-rule-contain">
          <h2>Baxım qaydalarını yükləyin</h2>
          <div className="grid-rule-contain">
            {DownloadRuleData?.map((data: DownloadRuleType) => (
              <div key={data?.id} className="itemrule">
                <div className="img">
                  <img src={data?.image || ""} alt={`${data?.id}`} title={data?.title} />
                </div>
                <article className="contain">
                  {data?.pdfs?.map((pdfs: Pdfs) => (
                    <button className="pdf-download-btn" title="Faylı endir" key={pdfs?.id}>
                      <span>{pdfs?.pdfName}</span>
                      <FaChevronRight className="right-chevron" />
                    </button>
                  ))}
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default RepairRulesPage;
