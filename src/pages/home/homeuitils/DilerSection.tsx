import React from "react";
import { base, useRequests } from "../../../hooks/useRequests";

const DilerSection: React.FC = () => {
  const { BecomeDealerData } = useRequests();

  return (
    <React.Fragment>
      {BecomeDealerData ? (
        <section
          className="diler-section-wrapper"
          style={{ backgroundImage: `url(${`${base}${BecomeDealerData[0]?.image || ""}`})` }}>
          <div className="begin-diler">
            <h2>{BecomeDealerData[0]?.title || ""}</h2>
            <button className="begin-diler-btn">daha çox</button>
          </div>
        </section>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default DilerSection;
