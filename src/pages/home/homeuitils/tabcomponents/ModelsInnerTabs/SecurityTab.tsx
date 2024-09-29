import React from "react";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../../../../recoil/Atom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { api, base, useRequests } from "../../../../../hooks/useRequests";
import Loader from "../../../../../ui/Loader";
import { useParams } from "react-router-dom";
import { ModelsType } from "../../../../../types/ApiTypes";
import NoContentMsg from "../../../../../ui/NoContentMsg";

type SecurityTabModelsInner = {
  _id: number;
  title: string;
  description: string;
  image: string;
  selected_model: string;
  status: string;
};

const SecurityTab: React.FC = () => {
  const selectedLanguage = useRecoilValue(SelectedLanguageState);
  const { data: secTabData, isLoading } = useQuery<SecurityTabModelsInner[]>({
    queryKey: ["secTabDataKey", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(`${api}/modelsectabfront`, {
        headers: {
          "Accept-Language": selectedLanguage,
        },
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 60,
  });

  const { slugmodel } = useParams();
  const { ModelsData } = useRequests();

  // Find the selected model ID from URL
  const selectedID = ModelsData?.find((model: ModelsType) => model?._id === slugmodel)?.["_id"];

  // Get all items that match the selected model
  const extractEqualItems = secTabData?.filter((item: SecurityTabModelsInner) => {
    return item.selected_model === selectedID;
  });

  //control data
  const hasData = secTabData && secTabData?.length > 0;

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader />
      ) : extractEqualItems ? (
        extractEqualItems && extractEqualItems?.length > 0 ? (
          <>
            <div className="security-tab">
              <div className="top-title">
                <h2>{extractEqualItems ? extractEqualItems[0]?.title : ""}</h2>
              </div>

              <section className="grid-sec-data">
                {hasData &&
                  extractEqualItems?.map((data: SecurityTabModelsInner) => (
                    <article className="item-sec-data" key={data?._id}>
                      <div className="image-contain">
                        <img src={`${base}${data?.image}`} alt={`${data?._id}`} title={data?.title} />
                      </div>
                      <div className="description">
                        <h4>{data?.title}</h4>
                        <p>{data?.description}</p>
                      </div>
                    </article>
                  ))}
              </section>
            </div>
          </>
        ) : (
          <NoContentMsg />
        )
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default SecurityTab;
