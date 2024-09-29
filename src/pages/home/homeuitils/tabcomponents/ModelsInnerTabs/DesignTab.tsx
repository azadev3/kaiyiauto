import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../../../../recoil/Atom";
import axios from "axios";
import { api, base, useRequests } from "../../../../../hooks/useRequests";
import Loader from "../../../../../ui/Loader";
import { useParams } from "react-router-dom";
import { ModelsType } from "../../../../../types/ApiTypes";
import NoContentMsg from "../../../../../ui/NoContentMsg";

interface DataDesignTab {
  _id: string;
  carImage: string;
  color: string;  
  description: string;
  title: string;
  selected_model: string;
  status: string;
}

const DesignTab: React.FC = () => {
  const selectedLanguage = useRecoilValue(SelectedLanguageState);
  const { slugmodel } = useParams();
  const { ModelsData } = useRequests();

  // Get video tab data
  const { data: designTabData, isLoading } = useQuery<DataDesignTab[]>({
    queryKey: ["designTabDataKey", selectedLanguage],
    queryFn: async () => {
      const response = await axios.get(`${api}/modeldesigntabfront`, {
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
  const extractEqualItems = designTabData?.filter((item: DataDesignTab) => {
    return item.selected_model === selectedID;
  });

  // Flatten the colors from the filtered items
  const colors = extractEqualItems?.map(item => item.color) || [];
  const uniqueColors = Array.from(new Set(colors)); // Benzersiz renkleri almak için

  const hasData = designTabData && designTabData.length > 0;

  // Selected color state
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null);

  const handleSelectColor = (color: string | null) => {
    setSelectedColor(color);
  };

  // Filtered car image based on selected color
  const filterSelectedCar = hasData && extractEqualItems?.find((item: DataDesignTab) => {
    return selectedColor === item.color; 
  })?.carImage;

  const imgRef = React.useRef<HTMLImageElement | null>(null);

  React.useEffect(() => {
    if (imgRef.current) {
      const timer = setTimeout(() => {
        imgRef.current?.classList.add("actived");
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [selectedColor]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      imgRef.current?.classList.remove("actived");
    }, 400);
    return () => clearTimeout(timer);
  }, [selectedColor]);

  // Set initial color
  React.useEffect(() => {
    if (selectedColor === null && uniqueColors?.length > 0) {
      setSelectedColor(uniqueColors[0]); 
    }
  }, [uniqueColors, designTabData]);

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="design-tab">
          <div className="top-title">
            <h2>{extractEqualItems && extractEqualItems?.length > 0 ? extractEqualItems[0]?.title : ""}</h2>
          </div>

          {extractEqualItems && extractEqualItems.length > 0 ? (
            <div className="container-section">
              <section className="left-section">
                <div className="container-image-result-car">
                  <img
                    ref={imgRef}
                    className={selectedColor ? "active" : ""}
                    src={filterSelectedCar ? `${base}${filterSelectedCar}` : ""}
                    alt=""
                  />
                </div>
                <div className="select-colors">
                  {uniqueColors.map((color, index) => (
                    <div className="colors" key={index}>
                      <div
                        className={`color-item ${selectedColor === color ? "active-color" : ""}`}
                        onClick={() => handleSelectColor(color)}
                      >
                        <span style={{ backgroundColor: color || "" }}></span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="right-section">
                <p>{extractEqualItems && extractEqualItems[0]?.description}</p>
              </section>
            </div>
          ) : (
            <NoContentMsg />
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default DesignTab;
