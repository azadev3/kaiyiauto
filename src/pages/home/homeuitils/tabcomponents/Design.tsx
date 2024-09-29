import React from "react";
import { base, useRequests } from "../../../../hooks/useRequests";
import { DesignType } from "../../../../types/ApiTypes";

const Design: React.FC = () => {
  const { DesignData } = useRequests();

  const hasData = DesignData?.length > 0;

  // Find image or video data
  const isImage = hasData && DesignData.find((item: DesignType) => item.selectedOption === "isImage");
  const isVideo = hasData && DesignData.find((item: DesignType) => item.selectedOption === "isVideo");

  return (
    <React.Fragment>
      {isImage
        ? DesignData?.map((data: DesignType) => (
            <section key={data?._id} className="design-component" style={{ backgroundImage: `url(${base}${data?.image})` }}>
              <div className="description-wrapper-design-component">
                <div className="description-design-component">
                  <h2>{data?.title}</h2>
                  <h3>{data?.description}</h3>
                </div>
              </div>
            </section>
          ))
        : isVideo
        ? DesignData?.map((data: DesignType) => (
            <section key={data?._id} className="design-component">
              <video src={`${base}${data?.video}`} autoPlay controls={false} muted={true} loop={true} disablePictureInPicture />
              <div className="description-wrapper-design-component">
                <div className="description-design-component">
                  <h2>{data?.title}</h2>
                  <h3>{data?.description}</h3>
                </div>
              </div>
            </section>
          ))
        : null}
    </React.Fragment>
  );
};

export default Design;
