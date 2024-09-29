import React from "react";
import { base, useRequests } from "../../../../hooks/useRequests";
import { DesignType } from "../../../../types/ApiTypes";

const Interier: React.FC = () => {
  const { ComfortableData } = useRequests();

  const hasData = ComfortableData?.length > 0;

  // Find image or video data
  const isImage = hasData && ComfortableData.find((item: DesignType) => item.selectedOption === "isImage");
  const isVideo = hasData && ComfortableData.find((item: DesignType) => item.selectedOption === "isVideo");

  return (
    <React.Fragment>
      {isImage
        ? ComfortableData?.map((data: DesignType) => (
            <section key={data?._id} className="comfortable-component" style={{ backgroundImage: `url(${base}${data?.image})` }}>
              <div className="description-wrapper-design-component">
                <div className="description-design-component">
                  <h2>{data?.title}</h2>
                  <h3>{data?.description}</h3>
                </div>
              </div>
            </section>
          ))
        : isVideo
        ? ComfortableData?.map((data: DesignType) => (
            <section key={data?._id} className="comfortable-component">
              <video src={`${base}${data?.video}`} autoPlay controls={false} muted={true} loop={true} disablePictureInPicture />
              <div className="description-wrapper-design-component">
                <div className="description-design-component">
                <h2>{data?.title}</h2>
                <h3>{data?.description}</h3>
                </div>
              </div>
            </section>
          ))
        : ""}
    </React.Fragment>
  );
};

export default Interier;
