import React from "react";
import { base, useRequests } from "../../../../hooks/useRequests";
import { DesignType } from "../../../../types/ApiTypes";

const Interier: React.FC = () => {
  const { InterierData } = useRequests();

  const hasData = InterierData?.length > 0;

  // Find image or video data
  const isImage = hasData && InterierData.find((item: DesignType) => item.selectedOption === "isImage");
  const isVideo = hasData && InterierData.find((item: DesignType) => item.selectedOption === "isVideo");

  return (
    <React.Fragment>
      {isImage
        ? InterierData?.map((data: DesignType) => (
            <section key={data?._id} className="interier-component" style={{ backgroundImage: `url(${base}${data?.image})` }}>
              <div className="description-wrapper-design-component">
                <div className="description-design-component">
                  <h2>{data?.title}</h2>
                  <h3>{data?.description}</h3>
                </div>
              </div>
            </section>
          ))
        : isVideo
        ? InterierData?.map((data: DesignType) => (
            <section key={data?._id} className="interier-component">
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
