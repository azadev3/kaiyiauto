import React from "react";
import { base, useRequests } from "../../../../hooks/useRequests";
import { DesignType } from "../../../../types/ApiTypes";

const Security: React.FC = () => {
  const { SecurityData } = useRequests();

  const hasData = SecurityData?.length > 0;

  // Find image or video data
  const isImage = hasData && SecurityData.find((item: DesignType) => item.selectedOption === "isImage");
  const isVideo = hasData && SecurityData.find((item: DesignType) => item.selectedOption === "isVideo");

  return (
    <React.Fragment>
      {isImage
        ? SecurityData?.map((data: DesignType) => (
            <section key={data._id} className="security-component" style={{ backgroundImage: `url(${base}${data?.image})` }}>
              <div className="description-wrapper-design-component">
                <div className="description-design-component">
                  <h2>{data?.title}</h2>
                  <h3>{data?.description}</h3>
                </div>
              </div>
            </section>
          ))
        : isVideo
        ? SecurityData?.map((data: DesignType) => (
            <section key={data._id} className="security-component">
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

export default Security;
