import React from "react";
import { Link } from "react-router-dom";
import { useTranslates } from "../../hooks/useTranslates";

type DealerPageTopTitleType = {
  id: number;
  title: string;
  description: string;
};

type AnketDescriptionType = {
  id: number;
  description: string;
  anket: string;
};

const DealerPageTopData: DealerPageTopTitleType[] = [
  {
    id: 1,
    title: "SİZİ LOREM DİLER ŞƏBƏKƏSİNİN PARÇASI OLMAĞA DƏVƏT EDİRİK",
    description: "Müasir texnologiya, etibarlılıq və cəsarətli dizayn. Dinamik KAIYI brendinin bir hissəsi olun.",
  },
];

const AnketDescriptionData: AnketDescriptionType[] = [
  {
    id: 1,
    anket: "",
    description:
      "OOO KAI RUS presents you with a unique opportunity to become an official dealer for sales and after-sales service of KAIYI vehicles in Russia. If you wish to discuss the possibility of cooperation with our company, please fill out an application for a dealer agreement and post it in a special feedback form on our website. If KAI RUS LLC is interested in implementing a joint project in your region, the brand development team will contact you to clarify further actions. Potential partners are selected on a competitive basis. To participate in the tender, it is necessary to prepare a presentation and a business plan based on the sample developed by KAI RUS LLC.",
  },
];

const BecomeDealer: React.FC = () => {

  const { translations } = useTranslates(); 
  
  //copy modal
  const [copyModal, setCopyModal] = React.useState<boolean>(false);

  const handleOpenCopyModal = () => {
    setCopyModal((prev) => !prev);
  };

 
  return (
    <main className="become-dealerpage-wrapper">
      <div className="become-dealerpage">
        {DealerPageTopData?.map((data: DealerPageTopTitleType) => (
          <article key={data?.id} className="top-title-main">
            <h1>{data?.title}</h1>
            <p>{data?.description}</p>
          </article>
        ))}

        {AnketDescriptionData?.map((data: AnketDescriptionType) => (
          <section key={data?.id} className="anket-container">
            <h3>Hörmətli tərəfdaşlar!</h3>
            <p>{data?.description}</p>
            <Link to="" className="download-anket-btn">
              Anketi yüklə
            </Link>
          </section>
        ))}
        <div className="drop-file-form-area-wrapper">
          <div className="form-area-dropfile">
            <div className="top-copy-link">
              <img src="/loop.svg" alt="loop" onClick={handleOpenCopyModal} />
              <div className={`modal-copy ${copyModal ? "active" : ""}`}>
                <p>Qaralama kimi yadda saxlayın və sonra davam edin</p>
                <button className="get-link">
                  <img src="/sncq.svg" alt="sncq" title="Linki əldə et" />
                  <span>Linki əldə edin</span>
                </button>
              </div>
            </div>

            <form action="" acceptCharset="UTF-8">
              <div className="company-and-city">
                <label htmlFor="">1.Şirkətiniz və şəhəriniz</label>
                <div className="inputs">
                  <input type="text" placeholder="Şirkət" name="company" />
                  <input type="text" placeholder="Şəhər" name="city" />
                </div>
              </div>

              <div className="company-and-city">
                <label htmlFor="">2.Anket*</label>
                <p className="spec-info">Tamamlanmış ərizə formasını yükləyin</p>
                <div className="file-upload-container">
                  <div className="file-upload">
                    <input className="file-input" id="fileInput" type="file" />
                    <label className="file-label" htmlFor="fileInput">
                      <img src="/feather_upload-cloud.svg" alt="fileicon" />
                      <strong>Select a file or drag and drop here</strong>
                      <p>JPG, PNG or PDF, file size no more than 10MB</p>
                    </label>
                  </div>
                </div>
              </div>
              <div className="rule">
                <input type="checkbox" />
                <Link to="">{translations['sexsi_melumatlarin_emali_ile_raziyam']}</Link>
              </div>
              <button className="send-btn" type="submit">
                Göndər
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BecomeDealer;
