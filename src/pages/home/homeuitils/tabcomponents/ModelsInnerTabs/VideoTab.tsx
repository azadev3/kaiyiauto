import { useQuery } from "@tanstack/react-query";
import React from "react";
import ReactPlayer from "react-player";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../../../../recoil/Atom";
import axios from "axios";
import { api, base, useRequests } from "../../../../../hooks/useRequests";
import Loader from "../../../../../ui/Loader";
import { ModelsType } from "../../../../../types/ApiTypes";
import { useParams } from "react-router-dom";
import NoContentMsg from "../../../../../ui/NoContentMsg";

interface VideoTab {
  _id: string;
  title: string;
  video: string;
  status: string;
  selected_model: string;
}

const VideoTab: React.FC = () => {

  //get param url for check equal clicked model inner item _ids
  const { slugmodel } = useParams();

  const selectedLanguage = useRecoilValue(SelectedLanguageState);

  //get models data my useReq hook
  const { ModelsData } = useRequests();

  //get video tab data (selected_model field is include)
  const { data: videoTabData, isLoading } = useQuery<VideoTab[]>({
    queryKey: ["videoTabDataKey", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(`${api}/modelvideotabfront`, {
        headers: {
          "Accept-Language": selectedLanguage,
        },
      });
      return response.data;
    },
  });

  //Find selected model and own if equal ids rendered video
  const selectedID = ModelsData?.find((model: ModelsType) => model?._id === slugmodel)?.["_id"];
  const extractEqualVideoItems = videoTabData?.find((item: VideoTab) => {
    return item?.selected_model === selectedID;
  });

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader />
      ) : extractEqualVideoItems ? (
        <div className="video-tab">
          <div className="title-top">
            <h2>{extractEqualVideoItems ? extractEqualVideoItems?.title : ""}</h2>
          </div>
          <div className="video-container">
            <ReactPlayer
              className="custom-video-player"
              controls
              width="100%"
              height="100%"
              url={extractEqualVideoItems ? `${base}${extractEqualVideoItems?.video}` : ""}
              playing={false}
              light={false}
              volume={0.8}
              muted={false}
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload",
                    disablePictureInPicture: false,
                  },
                },
              }}
            />
          </div>
        </div>
      ) : (
        <NoContentMsg />
      )}
    </React.Fragment>
  );
};

export default VideoTab;
