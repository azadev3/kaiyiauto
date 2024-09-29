import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { api, base, useRequests } from "../../../../../hooks/useRequests";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../../../../recoil/Atom";
import Loader from "../../../../../ui/Loader";
import { useParams } from "react-router-dom";
import { ModelsType } from "../../../../../types/ApiTypes";
import NoContentMsg from "../../../../../ui/NoContentMsg";

type ComfortTabImages = {
  _id: string;
  image: string;
  selected_model: string;
  status: string;
};

const KomfortTab: React.FC = () => {
  const selectedLanguage = useRecoilValue(SelectedLanguageState);

  const { slugmodel } = useParams();
  const { ModelsData } = useRequests();

  const { data: comfortTabData, isLoading } = useQuery<ComfortTabImages[]>({
    queryKey: ["comfortTabDataKey", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(`${api}/modelcomfortabfront`, {
        headers: {
          "Accept-Language": selectedLanguage,
        },
      });
      return response.data;
    },
  });

  // Find the selected model ID from URL
  const selectedID = ModelsData?.find((model: ModelsType) => model?._id === slugmodel)?.["_id"];

  // Get all items that match the selected model
  const extractEqualItems = comfortTabData?.filter((item: ComfortTabImages) => {
    return item?.selected_model === selectedID;
  });

  //control data
  const hasData = comfortTabData && comfortTabData?.length > 0;

  const [open, setOpen] = React.useState<string | null>(null);

  //manipulate carousel data only images
  const filterDataImages =
    hasData &&
    extractEqualItems?.map((data: ComfortTabImages) => {
      return data?.image;
    });

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader />
      ) : extractEqualItems ? (
        <div className="comfort-tab">
          {extractEqualItems && extractEqualItems?.length > 0 ? (
            <>
              <Lightbox
                styles={{
                  container: {
                    width: "100%",
                    background: "rgba(0, 0, 0, 0.775)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  },
                }}
                carousel={{ imageFit: "cover", padding: 24 }}
                open={open !== null}
                controller={{
                  closeOnBackdropClick: true,
                  closeOnPullDown: true,
                  closeOnPullUp: true,
                  preventDefaultWheelX: true,
                  preventDefaultWheelY: true,
                }}
                close={() => setOpen(null)}
                slides={
                  hasData && filterDataImages && extractEqualItems
                    ? filterDataImages?.map((image) => ({ src: `${base}${image}`, width: 1200, height: 600 }))
                    : []
                }
              />
              <div className="top-title">
                {/* is translate */}
                <h2>ЗАГЛЯНИТЕ В САЛОН KAIYI E5</h2>
              </div>

              <div className="images-content">
                {hasData &&
                  extractEqualItems?.map((imgs: ComfortTabImages) => (
                    <img
                      key={imgs?._id}
                      onClick={() => setOpen(imgs?._id)}
                      src={`${base}${imgs?.image}` || ""}
                      alt={`${imgs?._id}`}
                    />
                  ))}
              </div>
            </>
          ) : (
            <NoContentMsg />
          )}
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default KomfortTab;
