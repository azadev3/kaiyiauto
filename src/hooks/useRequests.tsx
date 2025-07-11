import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import {
  AddDealerData,
  BecomeDealerType,
  CarsType,
  Cities,
  DesignType,
  ForCorporateCustomersType,
  HeroType,
  KaiyiGuarantAttention,
  KaiyiGuarantHero,
  KaiyiHistoryBlogs,
  KaiyiHistoryBottom,
  KaiyiHistoryContactHero,
  KaiyiHistoryHero,
  KaiyiHistoryNews,
  LogoType,
  ModelPdf,
  ModelsType,
  NewsType,
  OurAdvantagesType,
  RepairHero,
  RepairRulesDownloadData,
  Socials,
  TestDriveType,
  TopHeaderLocationType,
  TopHeaderTelephoneType,
  TrafficRulesBottom,
  TrafficRulesCall,
  TrafficRulesHelped,
  TrafficRulesHero,
} from "../types/ApiTypes";
import { useRecoilState, useRecoilValue } from "recoil";
import { LoadingState, SelectedLanguageState } from "../recoil/Atom";

export const api = "https://kaiyi-21d4.onrender.com/api";
export const base = "https://kaiyi-21d4.onrender.com/api";

export interface SeoInterface {
  _id: string;
  meta_title: string;
  meta_description: string;
}

export const useRequests = () => {

  const selectedLang = useRecoilValue(SelectedLanguageState);

  const fetchData = async (url: string, headers = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(url, { headers });
      if (url === `${api}/filter-cars`) {
        return response?.data?.data || [];
      } else {
        return response?.data || [];
      }
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      setLoading(false);
    }
  };


  const [, setLoading] = useRecoilState(LoadingState);

  const headers = {
    "Accept-Language": selectedLang,
  };

  const queries = useQueries({
    queries: [
      {
        queryKey: ["logoDataKey"],
        queryFn: () => fetchData(`${api}/logo-front`),
      },
      {
        queryKey: ["topHeaderLocationKey", selectedLang],
        queryFn: () => fetchData(`${api}/locationfront`, headers),
      },
      {
        queryKey: ["topHeaderTelephoneKey", selectedLang],
        queryFn: () => fetchData(`${api}/telephonefront`, headers),
      },
      {
        queryKey: ["heroDataKey", selectedLang],
        queryFn: () => fetchData(`${api}/herofront`, headers),
      },
      {
        queryKey: ["designTabKey", selectedLang],
        queryFn: () => fetchData(`${api}/designtabfront`, headers),
      },
      {
        queryKey: ["interierTabKey", selectedLang],
        queryFn: () => fetchData(`${api}/interiertabfront`, headers),
      },
      {
        queryKey: ["securityTabKey", selectedLang],
        queryFn: () => fetchData(`${api}/securityfront`, headers),
      },
      {
        queryKey: ["viewTabKey", selectedLang],
        queryFn: () => fetchData(`${api}/viewtabfront`, headers),
      },
      {
        queryKey: ["comfortableTabKey", selectedLang],
        queryFn: () => fetchData(`${api}/comfortablefront`, headers),
      },
      {
        queryKey: ["modelPdfTabKey", selectedLang],
        queryFn: () => fetchData(`${api}/modelpdf-front`, headers),
      },
      {
        queryKey: ["modelsKey", selectedLang],
        queryFn: () => fetchData(`${api}/modelstabfront`, headers),
      },
      {
        queryKey: ["newsKey", selectedLang],
        queryFn: () => fetchData(`${api}/newstabfront`, headers),
      },
      {
        queryKey: ["beginDealerKey", selectedLang],
        queryFn: () => fetchData(`${api}/dealertabfront`, headers),
      },
      {
        queryKey: ["findDealerKey", selectedLang],
        queryFn: () => fetchData(`${api}/cityfront`, headers),
      },
      {
        queryKey: ["addDealerKey", selectedLang],
        queryFn: () => fetchData(`${api}/add-dealerfront`, headers),
      },
      {
        queryKey: ["testDriveRegKey", selectedLang],
        queryFn: () => fetchData(`${api}/testdrivefront`, headers),
      },
      {
        queryKey: ["forCorporateCustomersDataKey", selectedLang],
        queryFn: () => fetchData(`${api}/for-corporate-customersfront`, headers),
      },
      {
        queryKey: ["ourAdvantagesDataKey", selectedLang],
        queryFn: () => fetchData(`${api}/ouradvantagesfront`, headers),
      },
      {
        queryKey: ["kaiyiGuarantHeroDataKey", selectedLang],
        queryFn: () => fetchData(`${api}/guarantherofront`, headers),
      },
      {
        queryKey: ["kaiyiGuarantDescriptionDataKey", selectedLang],
        queryFn: () => fetchData(`${api}/guarantdescriptionfront`, headers),
      },
      {
        queryKey: ["kaiyiGuarantAttentionDataKey", selectedLang],
        queryFn: () => fetchData(`${api}/guarantattentionfront`, headers),
      },
      {
        queryKey: ["trafficRulesHeroDataKey", selectedLang],
        queryFn: () => fetchData(`${api}/traffic-rules-herofront`, headers),
      },
      {
        queryKey: ["trafficRulesCallDataKey", selectedLang],
        queryFn: () => fetchData(`${api}/traffic-rules-callfront`, headers),
      },
      {
        queryKey: ["trafficRulesHelpedDataKey", selectedLang],
        queryFn: () => fetchData(`${api}/traffic-rules-helpedfront`, headers),
      },
      {
        queryKey: ["trafficRulesBottomDataKey", selectedLang],
        queryFn: () => fetchData(`${api}/traffic-rules-bottomfront`, headers),
      },
      {
        queryKey: ["repairHeroDataKey", selectedLang],
        queryFn: () => fetchData(`${api}/repair-herofront`, headers),
      },
      {
        queryKey: ["repairRulesDownloadKey", selectedLang],
        queryFn: () => fetchData(`${api}/repair-rulesdownloadfront`, headers),
      },
      {
        queryKey: ["kaiyiHistoryHeroKey", selectedLang],
        queryFn: () => fetchData(`${api}/kaiyi-history-herofront`, headers),
      },
      {
        queryKey: ["kaiyiHistoryBottomKey", selectedLang],
        queryFn: () => fetchData(`${api}/kaiyi-history-bottomfront`, headers),
      },
      {
        queryKey: ["kaiyiHistoryBlogs", selectedLang],
        queryFn: () => fetchData(`${api}/kaiyi-history-blogsfront`, headers),
      },
      {
        queryKey: ["kaiyiHistoryNews", selectedLang],
        queryFn: () => fetchData(`${api}/kaiyi-history-newsfront`, headers),
      },
      {
        queryKey: ["kaiyiHistoryContactHero", selectedLang],
        queryFn: () => fetchData(`${api}/contactherofront`, headers),
      },
      {
        queryKey: ["all_cars_Data_key", selectedLang],
        queryFn: () => fetchData(`${api}/filter-cars`, headers),
      },
      {
        queryKey: ["socialsData", selectedLang],
        queryFn: () => fetchData(`${api}/social-media-front`, headers),
      },
    ],
  });

  const [
    logoData,
    topHeaderLocationData,
    telephoneTopHeaderData,
    heroData,
    designData,
    interierData,
    securityData,
    viewData,
    comfortableData,
    modelPdfData,
    modelsData,
    newsData,
    becomeDealerData,
    findDealerData,
    addDealerData,
    testDriveData,
    corporateCustomersData,
    ourAdvantagesData,
    kaiyiGuarantHero,
    kaiyiGuarantDescription,
    kaiyiGuarantAttention,
    trafficRulesHero,
    trafficRulesCall,
    trafficRulesHelped,
    trafficRulesBottomData,
    repairHeroData,
    repairRulesDownloadData,
    kaiyiHistoryHero,
    kaiyiHistoryBottom,
    kaiyiHistoryBlogs,
    kaiyiHistoryNews,
    kaiyiHistoryContactHero,
    kaiyiCarsData,
    socialsData,
  ] = queries.map((query) => query.data || []);

  return {
    LogoData: logoData as LogoType[],
    TopHeaderLocation: topHeaderLocationData as TopHeaderLocationType[],
    TopHeaderTelephone: telephoneTopHeaderData as TopHeaderTelephoneType[],
    HeroData: heroData as HeroType[],
    DesignData: designData as DesignType[],
    InterierData: interierData as DesignType[],
    SecurityData: securityData as DesignType[],
    ViewTabData: viewData as DesignType[],
    ComfortableData: comfortableData as DesignType[],
    ModelPdfData: modelPdfData as ModelPdf[],
    ModelsData: modelsData as ModelsType[],
    NewsData: newsData as NewsType[],
    BecomeDealerData: becomeDealerData as BecomeDealerType[],
    FindDealerData: findDealerData as Cities[],
    AddDealerData: addDealerData as AddDealerData[],
    TestDriveData: testDriveData as TestDriveType[],
    ForCorporateCustomersData: corporateCustomersData as ForCorporateCustomersType[],
    OurAdvantagesData: ourAdvantagesData as OurAdvantagesType[],
    KaiyiGuarantHeroData: kaiyiGuarantHero as KaiyiGuarantHero[],
    KaiyiGuarantDescriptionData: kaiyiGuarantDescription as KaiyiGuarantHero[],
    KaiyiGuarantAttentionData: kaiyiGuarantAttention as KaiyiGuarantAttention[],
    TrafficRulesHeroData: trafficRulesHero as TrafficRulesHero[],
    TrafficRulesCallData: trafficRulesCall as TrafficRulesCall[],
    TrafficRulesHelpedData: trafficRulesHelped as TrafficRulesHelped[],
    TrafficRulesBottomData: trafficRulesBottomData as TrafficRulesBottom[],
    RepairHeroData: repairHeroData as RepairHero[],
    RepairRulesDownloadData: repairRulesDownloadData as RepairRulesDownloadData[],
    KaiyiHistoryHero: kaiyiHistoryHero as KaiyiHistoryHero[],
    KaiyiHistoryBottom: kaiyiHistoryBottom as KaiyiHistoryBottom[],
    KaiyiHistoryBlogs: kaiyiHistoryBlogs as KaiyiHistoryBlogs[],
    KaiyiHistoryNews: kaiyiHistoryNews as KaiyiHistoryNews[],
    KaiyiHistoryContactHero: kaiyiHistoryContactHero as KaiyiHistoryContactHero[],
    KaiyiCarsData: kaiyiCarsData as CarsType[],
    SocialsData: socialsData as Socials[],
  };
};
