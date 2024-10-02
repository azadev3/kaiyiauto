import React from "react";
import "./styles/global.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import TopHeader from "./components/TopHeader";
import "./styles/parts.scss";
import "./styles/style.scss";
import Header, { HeaderDropdownState } from "./components/Header";
import { HeaderItemsTypes } from "./types/HeaderTypes";
import { useRecoilState } from "recoil";
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
import { IoChevronDown } from "react-icons/io5";
import { useTranslates } from "./hooks/useTranslates";
import Loader from "./ui/Loader";

const App: React.FC = () => {
  const { translations, isLoading } = useTranslates();

  const HeaderItems: HeaderItemsTypes[] = [
    {
      id: 1,
      title: `${translations["model_cesidleri"]}`,
      icon: <IoChevronDown className="downicon" />,
      subitems: [],
    },
    {
      id: 2,
      title: `${translations["elde_olan_masinlar"]}`,
      to: "/new-cars",
    },
    {
      id: 3,
      title: `${translations["satis_noqtesi_tap"]}`,
      to: "/find-dealer",
    },
    {
      id: 4,
      title: `${translations["alicilar_ucun"]}`,
      to: "",
      icon: <IoChevronDown className="downicon" />,
      subitems: [
        {
          id: 55,
          title: "",
          children: [
            { id: 654, title: `${translations["test_surusu_ucun_qeydiyyatdan_kec"]}`, to: "/test-drive" },
            { id: 656, title: `${translations["korporativ_musteriler_ucun"]}`, to: "/corporate-customer" },
            // { id: uuid(), title: "Xüsusi təkliflər", to: "/special-offers" },
            // { id: uuid(), title: "Maşın siğortası", to: "/car-insurance" },
            // { id: uuid(), title: "Lending" },
          ],
        },
      ],
    },
    {
      id: 5,
      title: `${translations["sahiblerine"]}`,
      to: "",
      icon: <IoChevronDown className="downicon" />,
      subitems: [
        {
          id: 1233,
          title: "",
          children: [
            { id: 1232, title: `${translations["kaiyi_garantiya_xidmeti"]}`, to: "/guarantee" },
            { id: 4543, title: `${translations["yol_qaydalari"]}`, to: "/road-rules" },
            { id: 76867, title: `${translations["temir_ve_baxim"]}`, to: "/repair-rules" },
          ],
        },
      ],
    },
    // {
    //   id: uuid(),
    //   title: "Diler ol",
    //   to: "/become-dealer",
    // },
    {
      id: 6,
      title: "EY KAIYI",
      to: "",
      icon: <IoChevronDown className="downicon" />,
      subitems: [
        {
          id: 994,
          title: "",
          children: [
            { id: 9193, title: `${translations["marka_kaiyi"]}`, to: "/brend-kaiyi" },
            { id: 9293, title: `${translations["blog"]}`, to: "/blogs" },
            { id: 9393, title: `${translations["yenilikler"]}`, to: "/news" },
            { id: 9493, title: `${translations["elaqe"]}`, to: "/contact" },
          ],
        },
      ],
    },
  ];

  const [dropdown, setDropdown] = useRecoilState(HeaderDropdownState);

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
            <Route path="/news/:id" element={<Newsinner />} />
            <Route path="/blogs" element={<Blogspage />} />
            <Route path="/blog/:id" element={<Blogsinner />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </React.Fragment>
      )}
    </main>
  );
};

export default App;
