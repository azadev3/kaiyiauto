import React from "react";
import "./styles/global.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import TopHeader from "./components/TopHeader";
import "./styles/parts.scss";
import "./styles/style.scss";
import Header, { HeaderDropdownState, HeaderItems } from "./components/Header";
import { HeaderItemsTypes } from "./types/HeaderTypes";
import { useRecoilState, useRecoilValue } from "recoil";
import Model from "./components/headerdropdowns/Model";
import Buyers from "./components/headerdropdowns/Buyers";
import Owner from "./components/headerdropdowns/Owner";
import Kaiyi from "./components/headerdropdowns/Kaiyi";
import Footer from "./components/Footer";
import ScrollDownButton from "./components/ScrollDownButton";
import CarsInStock from "./pages/carinstock/CarsInStock";
import InnerCar from "./pages/carinstock/InnerCar";
import FindDealer from "./pages/findpointsale/FindDealer";
import TestDrivePage from "./pages/testdrivepage/TestDrivePage";
import ForCorporateCustomers from "./pages/corporatepage/ForCorporateCustomers";
import SpecialOffers from "./pages/specialoffers/SpecialOffers";
import CarInsurancePage from "./pages/carinsurance/CarInsurancePage";
import GuarantePage from "./pages/guarantepage/GuarantePage";
import RoadRulePage from "./pages/roadrulepage/RoadRulePage";
import RepairRulesPage from "./pages/repairpage/RepairRulesPage";
import BecomeDealer from "./pages/becomedealerpage/BecomeDealer";
import BrendKaiyiPage from "./pages/brendkaiyipage/BrendKaiyiPage";
import Newspage from "./pages/news/Newspage";
import Newsinner from "./pages/news/uitils/Newsinner";
import Blogspage from "./pages/blogs/Blogspage";
import Blogsinner from "./pages/blogs/uitils/Blogsinner";
import Contact from "./pages/contactpage/Contact";
import ModelsInner from "./pages/home/homeuitils/tabcomponents/ModelsInner";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/responsive.scss";
import { LoadingState } from "./recoil/Atom";
import Loader from "./ui/Loader";

const App: React.FC = () => {
  const [dropdown, setDropdown] = useRecoilState(HeaderDropdownState);
  const isLoading = useRecoilValue(LoadingState);

  const dropdownRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const outsideClicked = (e: MouseEvent) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(e.target as Node)) {
        setDropdown(null);
      }
    };

    document.addEventListener("mousedown", outsideClicked);
    return () => document.removeEventListener("mousedown", outsideClicked);
  }, []);

  return (
    <main className="app">
      {isLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <ToastContainer transition={Zoom} pauseOnHover={false} autoClose={1500} />
          <ScrollDownButton />
          {/* header dropdown */}
          <div className={`overlay ${dropdown ? "active-overlay" : ""}`}>
            {HeaderItems?.map((items: HeaderItemsTypes, index: number) => {
              if (dropdown === items?.id) {
                return (
                  <div
                    key={items?.id}
                    ref={dropdownRef}
                    className={`dropdown-menu ${dropdown === items?.id ? "active" : ""}`}>
                    {index === 0 && <Model />}
                    {index === 3 && <Buyers />}
                    {index === 4 && <Owner />}
                    {index === 5 && <Kaiyi />}
                  </div>
                );
              }
            })}
          </div>
          <TopHeader />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:slugmodel" element={<ModelsInner />} />
            <Route path="/new-cars" element={<CarsInStock />} />
            <Route path="/new-cars/:carid" element={<InnerCar />} />
            <Route path="/find-dealer" element={<FindDealer />} />
            <Route path="/test-drive" element={<TestDrivePage />} />
            <Route path="/corporate-customer" element={<ForCorporateCustomers />} />
            <Route path="/special-offers" element={<SpecialOffers />} />
            <Route path="/car-insurance" element={<CarInsurancePage />} />
            <Route path="/guarantee" element={<GuarantePage />} />
            <Route path="/road-rules" element={<RoadRulePage />} />
            <Route path="/repair-rules" element={<RepairRulesPage />} />
            <Route path="/become-dealer" element={<BecomeDealer />} />
            <Route path="/brend-kaiyi" element={<BrendKaiyiPage />} />
            <Route path="/news" element={<Newspage />} />
            <Route path="/:lang/news/:slug" element={<Newsinner />} />
            <Route path="/blogs" element={<Blogspage />} />
            <Route path="/:lang/blog/:slug" element={<Blogsinner />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </React.Fragment>
      )}
    </main>
  );
};

export default App;
