// Translates type
export type TranslatesType = {
  key: string;
  text: string;
};

// Logo type
export type LogoType = {
  _id: string;
  logo: string;
  status: string;
};

// Top header location
export type TopHeaderLocationType = {
  _id: string;
  title: string;
  icon: string;
  status: string;
};
// Top header telephone
export type TopHeaderTelephoneType = {
  _id: string;
  title: string;
  icon: string;
  telephone: string;
  status: string;
};

// Hero type
export type HeroType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  miniImage: string;
  status: string;
};

// Tab - Design type
// Other tabs accepted is same type
export type DesignType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  video: string;
  selectedOption: string;
  status: string;
};

// Tab - Models type
export type ModelsType = {
  _id: string;
  title: string;
  description: string;
  slogan: string;
  image: string;
  video: string;
  slug: string;
  status: string;
};

// Tab - News type
export type NewsType = {
  _id: string;
  title: string;
  description: string;
  slogan: string;
  image: string;
  video: string;
  status: string;
};

// Become Dealer section type
export type BecomeDealerType = {
  _id: string;
  title: string;
  image: string;
  status: string;
};

// Find Seller Point Cities
export type Cities = {
  _id: string;
  cityName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  informations: [
    {
      title: string;
      value: string;
      _id: string;
    }
  ];
  otherServices: [
    {
      serviceName: string;
      _id: string;
      serviceIcon: string;
    }
  ];
  websiteLink: string;
  status: string;
};

export type AddDealerData = {
  _id: string;
  dealerName: string;
  status: string;
};

// Test drive register Hero types
export type TestDriveType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  status: string;
};

// for corporate customers data
export type ForCorporateCustomersType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  status: string;
};

export type OurAdvantagesType = {
  _id: string;
  navTitle: string;
  content: [
    {
      title: string;
      description: string;
      icon: string;
    }
  ];
};

//KAIYI GUARANT SERVICE PAGE types
export type KaiyiGuarantHero = {
  _id: string;
  title: string;
  description: string;
  image: string;
  status: string;
};

export type KaiyiGuarantDescription = {
  _id: string;
  title: string;
  description: string;
  image: string;
  status: string;
};

export type KaiyiGuarantAttention = {
  _id: string;
  description: string;
  status: string;
};

//Road rules types
export type TrafficRulesHero = {
  _id: string;
  title: string;
  description: string;
  image: string;
  status: string;
};
export type TrafficRulesCall = {
  _id: string;
  title: string;
  description: string;
  miniTitle: string;
  telephone: string;
  status: string;
};
export type TrafficRulesHelped = {
  _id: string;
  title: string;
  image: string;
  status: string;
};

export type TrafficRulesBottom = {
  _id: string;
  description: string;
  image: string;
  status: string;
};
//Repair and maintenance
export type RepairHero = {
  _id: string;
  title: string;
  description: string;
  image: string;
  status: string;
};

//EY KAIYI
export type KaiyiHistoryHero = {
  _id: string;
  title: string;
  description: string;
  image: string;
  status: string;
};

export type KaiyiHistoryBottom = {
  _id: string;
  title: string;
  description: string;
  year: string;
  image: string;
  status: string;
};

export type KaiyiHistoryBlogs = {
  _id: string;
  title: string;
  description: string;
  slug: string;
  slogan: string;
  video: string;
  image: string;
  created_at: string;
  hours: string;
  status: string;
};

export type KaiyiHistoryNews = {
  _id: string;
  title: string;
  description: string;
  slug: string;
  slogan: string;
  video: string;
  image: string;
  created_at: string;
  hours: string;
  status: string;
};

export type KaiyiHistoryContactHero = {
  _id: string;
  title: string;
  description: string;
  image: string;
  status: string;
};

//Cars
export type CarsType = {
  _id: string;
  title: string;
  inStock: string;
  companyTitle: string;
  miniDesc: string;
  year: string;
  price: string;
  vin: string;
  carImage: string;
  selected_model: string;
  status: string;
};
