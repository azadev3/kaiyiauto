import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { api, base, SeoInterface, useRequests } from "../../hooks/useRequests";
import { RepairHero, RepairRulesDownloadData } from "../../types/ApiTypes";
import { useTranslates } from "../../hooks/useTranslates";
import { SelectedLanguageState } from "../../recoil/Atom";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const RepairRulesPage: React.FC = () => {
  const { translations } = useTranslates();

  const { RepairHeroData, RepairRulesDownloadData } = useRequests();

  const hasRepairHero = RepairHeroData && RepairHeroData?.length > 0;

  const hasRepairRules = RepairRulesDownloadData && RepairRulesDownloadData?.length > 0;

  //download pdf if clicked on the data
  const handleDownload = (_id: string) => {
    const findedPdf =
      hasRepairHero &&
      RepairRulesDownloadData?.find((data: RepairRulesDownloadData) => {
        return _id === data?._id;
      })?.pdfs;

    if (findedPdf) {
      const link = document.createElement("a");

      link.href = findedPdf ? findedPdf : "";

      const fileExt = findedPdf.split(".").pop();

      const fileName = `baxim_qaydalari.${fileExt}`;

      link.download = fileName;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } else {
      console.log("File Not found");
    }
  };


  const lang = useRecoilValue(SelectedLanguageState);
  const [seoData, setSeoData] = React.useState<SeoInterface>();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/repair-seo-front`, {
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
    <main className="repairrule-wrapper">
      <Helmet>
        <title>{seoData?.meta_title}</title>
        <meta name="description" content={seoData?.meta_description} />
      </Helmet>
      <div className="repairrule-page">
        {hasRepairHero &&
          RepairHeroData?.map((data: RepairHero) => (
            <React.Fragment key={data?._id}>
              <div className="image-contain" style={{ backgroundImage: `url(${base}${data?.image || ""})` }}>
                <div className="wrapper">
                  <h1>{data?.title}</h1>
                </div>
              </div>

              <p className="description-rule">{data?.description}</p>
            </React.Fragment>
          ))}

        <div className="download-rule-contain">
          <h2>{translations["baxim_qaydalari_title"]}</h2>
          <div className="grid-rule-contain">
            {hasRepairRules &&
              RepairRulesDownloadData?.map((data: RepairRulesDownloadData) => (
                <div key={data?._id} className="itemrule" onClick={() => handleDownload(data?._id)}>
                  <div className="img">
                    <img src={`${base}${data?.image}` || ""} alt={`${data?._id}`} title={data?.title} />
                  </div>
                  <article className="contain">
                    <button className="pdf-download-btn" title="Faylı endir">
                      <span>{data?.title}</span>
                      <FaChevronRight className="right-chevron" />
                    </button>
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
