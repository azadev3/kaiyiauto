import React, { ChangeEvent, FormEvent } from "react";
import PhoneInput from "react-phone-input-2";
import { Link } from "react-router-dom";
import Select from "react-select";
import { api, base, useRequests } from "../../hooks/useRequests";
import { Cities, ModelsType, TestDriveType } from "../../types/ApiTypes";
import { useRecoilState } from "recoil";
import { LoadingState } from "../../recoil/Atom";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

const Styles = {
  control: (baseStyle: any, state: any) => ({
    ...baseStyle,
    backgroundColor: "#FFFFFF",
    border: state.isFocused ? "1px solid #DFDFDF" : "1px solid #DFDFDF",
    boxShadow: state.isFocused ? "none" : "none",
    height: "70px",
    borderRadius: "0",
    outline: state.isFocused ? "1px solid black" : "1px solid #DFDFDF",
  }),
  option: (baseStyle: any, state: any) => ({
    ...baseStyle,
    backgroundColor: state.isFocused ? "#f0f0f0" : "#FFFFFF",
    color: "#333",
    padding: 10,
    cursor: "pointer",
    ":active": {
      backgroundColor: "#ddd",
    },
  }),
};

const TestDrivePage: React.FC = () => {
  const { TestDriveData, ModelsData, FindDealerData } = useRequests();

  const [loading, setLoading] = useRecoilState(LoadingState);

  const hasData = TestDriveData && TestDriveData?.length > 0;

  const [selectedModel, setSelectedModel] = React.useState<any>(null);
  const [selectedCity, setSelectedCity] = React.useState<any>(null);
  const [name, setName] = React.useState<string>("");
  const [telephone, setTelephone] = React.useState<string>("");

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const dataTestDrive = {
        model: selectedModel?.label,
        city: selectedCity?.label,
        name: name,
        telephone: telephone,
        created_at: moment().format("DD.MM.YYYY"),
        hours: moment().format("HH:mm"),
      };

      const response = await axios.post(`${api}/register-test-drive`, dataTestDrive);

      if (response.data) {
        setName("");
        setSelectedCity("");
        setSelectedModel("");
        setTelephone("");
        toast.success("Qeydiyyat sorğunuz müvəffəqiyyətlə göndərilmişdir.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="testdrivepage-wrapper">
      <div className="testdrive-page">
        {hasData &&
          TestDriveData?.map((data: TestDriveType) => (
            <div key={data?._id} className="image-contain" style={{ backgroundImage: `url(${base}${data?.image})` }}>
              <div className="wrapper">
                <h1>{data?.title}</h1>
                {data?.description ? <p className="description-testdrivedata">{data?.description}</p> : ""}
              </div>
            </div>
          ))}

        <div className="form-wrapper">
          <form acceptCharset="UTF-8" onSubmit={handleSubmitForm}>
            <h2>kaiyi test sürüşü üçün qeydiyyat</h2>
            <div className="input-area">
              {/* select model */}
              <div className="field">
                <Select
                  value={selectedModel}
                  required
                  placeholder="Model*"
                  styles={Styles}
                  isSearchable
                  defaultValue={selectedModel}
                  onChange={setSelectedModel}
                  options={ModelsData?.map((models: ModelsType) => ({
                    label: models?.title,
                    value: models?._id,
                  }))}
                />
              </div>

              {/* select city */}
              <div className="field">
                <Select
                  value={selectedCity}
                  required
                  placeholder="City*"
                  styles={Styles}
                  defaultValue={selectedCity}
                  onChange={setSelectedCity}
                  options={FindDealerData?.map((city: Cities) => ({
                    label: city?.cityName,
                    option: city?._id,
                  }))}
                />
              </div>
              {/* select name */}
              <div className="field">
                <input
                  className="nameinput"
                  type="text"
                  name="name"
                  value={name}
                  required
                  placeholder="Ad*"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
              </div>

              {/* telephone */}
              <div className="field">
                <PhoneInput
                  value={telephone}
                  onChange={(value: string) => setTelephone(value)}
                  placeholder="Telefon*"
                  country={"az"}
                  onlyCountries={["az", "tr", "us", "de", "ru", "uz"]}
                />
              </div>
              <div className="rule">
                <input type="checkbox" required />
                <Link to="">Şəxsi məlumatların emalı ilə razıyam</Link>
              </div>

              <div className="button-for-submit">
                <button type="submit" disabled={loading} className="submit-dealer">
                  {loading ? "Göndərilir..." : "Göndər"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default TestDrivePage;
