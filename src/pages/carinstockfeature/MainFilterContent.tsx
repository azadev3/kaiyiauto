import React, { ChangeEvent } from 'react'
import { base, useRequests } from '../../hooks/useRequests';
import { CarsType, ModelsType } from '../../types/ApiTypes';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../../ui/Loader';
import { MdInvertColorsOff } from "react-icons/md";
import { useTranslates } from '../../hooks/useTranslates';

type StaticFilterSectionType = {
    id: number;
    headSectionTitle: string;
    rendererFunction: React.JSX.Element;
}


const MainFilterContent: React.FC = () => {

    const { translations } = useTranslates();

    const { ModelsData, KaiyiCarsData } = useRequests();

    const extractColors = KaiyiCarsData && KaiyiCarsData?.map((car: CarsType) => ({
        id: car?._id,
        color: car?.color,
    }));

    const [accord, setAccord] = React.useState<{ [key: number]: boolean }>({});
    const handleAccordFilterSections = (id: number) => {
        setAccord((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const [selectedModel, setSelectedModel] = React.useState<string[]>([]);
    const handleChangeModelFilter = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        setSelectedModel((prev) => {
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter((model) => model !== value);
            }
        });
    };

    const [selectedColor, setSelectedColor] = React.useState<string>("");
    const handleSelectColor = (color: string) => {
        setSelectedColor(color);
    }

    //filter section model
    const ForModel = () => {
        return (
            <div className='content'>
                {ModelsData?.map((m: ModelsType) => (
                    <div key={m?._id} className='input-area'>
                        <input
                            type="checkbox"
                            id={`${m?._id}-model`}
                            value={m?._id}
                            onChange={handleChangeModelFilter}
                            checked={selectedModel.includes(m?._id)}
                        />
                        <label htmlFor={`${m?._id}-model`}>{m?.title}</label>
                    </div>
                ))}
            </div>
        )
    }

    //filter section color
    const ForColor = () => {
        return (
            <div className='content-for-color'>
                {extractColors?.map((color: any) => (
                    <span onClick={() => handleSelectColor(color?.color.split("#").join(""))} key={color?.id} className="rectangle" style={{ backgroundColor: color?.color || '#fff' }}></span>
                ))}
                <button className='remove-color-btn' title='Rəngi yığışdır' onClick={() => setSelectedColor("")}>
                    <MdInvertColorsOff className='ic' />
                </button>
            </div>
        )
    }

    //static filter section data
    const StaticFilters: StaticFilterSectionType[] = [
        {
            id: 1,
            headSectionTitle: translations['modeller_title'],
            rendererFunction: <ForModel />,
        },
        {
            id: 2,
            headSectionTitle: translations['rengler'],
            rendererFunction: <ForColor />,
        },
    ]

    //render cars for selected model
    const [loadingData, setLoadingData] = React.useState<boolean>(false);
    const [filteredData, setFilteredData] = React.useState<CarsType[]>([]);
    const [countData, setCountData] = React.useState<number | null>(null);
    const fetchByFilter = async () => {
        setLoadingData(true);
        try {
            const params: Record<string, any> = {};

            if (selectedModel.length > 0) {
                params.selected_model = selectedModel.join(",");
            }

            if (selectedColor) {
                params.color = selectedColor;
            }

            const res = await axios.get(`${base}/api/filter-cars`, { params });

            if (res.data && Array.isArray(res.data?.data)) {
                setFilteredData(res.data?.data);
                setCountData(res.data?.dataCount);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    toast.error("Qoyulan filterlərə uyğun maşın tapılmadı. Filterləri sıfırlayıb bütün modellərə baxa bilərsiniz.", {
                        position: "bottom-right",
                        style: { zIndex: '100000' }
                    });
                }
            }
            console.error("API error:", error);
        } finally {
            setLoadingData(false);
        }
    };

    const RenderCars = () => {
        //hover show info modal on the card item
        const [infoModal, setInfoModal] = React.useState<string | null>(null);

        const handleInfoModal = (id: string | null) => {
            setInfoModal(id);
        };

        return (
            loadingData ? (
                <Loader />
            ) : filteredData && filteredData?.length > 0 ? filteredData?.map((data: CarsType) => (
                <Link to={`/new-cars/${data?._id}`} className="card-item" key={data?._id}>
                    <div className="car-image">
                        <img src={`${base}${data?.carImage}` || ""} alt={`${data?._id}`} title={data?.title} />
                    </div>
                    <div className="description-card">
                        <h1>{data?.title}</h1>
                        <div className="bottom">
                            <div className="vin-and-year">
                                <span>{data?.year}</span>
                                <span>{data?.vin}</span>
                            </div>
                            <section className="in-stock">
                                <span className="title">{data?.inStock}</span>
                            </section>
                        </div>
                    </div>
                    <div className="price-and-autogerm">
                        <div className="price">
                            <span>{data?.price}</span>
                            <img
                                src="/infoimg.svg"
                                alt="info"
                                onMouseEnter={() => handleInfoModal(data?._id)}
                                onMouseLeave={() => setInfoModal(null)}
                            />
                        </div>
                        <div className="bottom-title">
                            <img src="/cursor.svg" alt="cursor" title={data?.companyTitle} />
                            <strong>{data?.companyTitle}</strong>
                            <div className={`modal-information ${infoModal === data?._id && data?.miniDesc ? "active" : ""}`}>
                                <p>{data?.miniDesc}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            )) : (
                KaiyiCarsData && KaiyiCarsData?.length > 0 ? KaiyiCarsData?.map((data: CarsType) => (
                    <Link to={`/new-cars/${data?._id}`} className="card-item" key={data?._id}>
                        <div className="car-image">
                            <img src={`${base}${data?.carImage}` || ""} alt={`${data?._id}`} title={data?.title} />
                        </div>
                        <div className="description-card">
                            <h1>{data?.title}</h1>
                            <div className="bottom">
                                <div className="vin-and-year">
                                    <span>{data?.year}</span>
                                    <span>{data?.vin}</span>
                                </div>
                                <section className="in-stock">
                                    <span className="title">{data?.inStock}</span>
                                </section>
                            </div>
                        </div>
                        <div className="price-and-autogerm">
                            <div className="price">
                                <span>{data?.price}</span>
                                <img
                                    src="/infoimg.svg"
                                    alt="info"
                                    onMouseEnter={() => handleInfoModal(data?._id)}
                                    onMouseLeave={() => setInfoModal(null)}
                                />
                            </div>
                            <div className="bottom-title">
                                <img src="/cursor.svg" alt="cursor" title={data?.companyTitle} />
                                <strong>{data?.companyTitle}</strong>
                                <div className={`modal-information ${infoModal === data?._id && data?.miniDesc ? "active" : ""}`}>
                                    <p>{data?.miniDesc}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                )) : null
            )
        );
    };

    React.useEffect(() => {
        fetchByFilter();
    }, [selectedModel, selectedColor]);


    return (
        <div className='main-filter-content'>
            <div className="left-filters">
                {countData !== null || undefined ? (
                    <div className="length-title">
                        <p>{countData} {translations['masin_tapildi']}</p>
                    </div>
                ) : null}

                {/* filter sections */}
                {StaticFilters?.map((f: StaticFilterSectionType) => (
                    <section key={f?.id} className={`filter-section ${accord[f?.id] ? 'active' : ''}`}>
                        <div className="head-section" onClick={() => handleAccordFilterSections(f?.id)}>
                            <h3>{f?.headSectionTitle}</h3>
                            <img className={`down ${accord[f?.id] ? 'rotate' : ''}`} src="/ri_arrow-up-s-line.svg" alt="ri_arrow-up-s-line" />
                        </div>
                        <div className={`content-section ${accord[f?.id] ? 'active' : ''}`}>
                            {f?.rendererFunction}
                        </div>
                    </section>
                ))}

                <button
                    className="refresh-filters"
                    onClick={() => {
                        setSelectedColor("");
                        setSelectedModel([]);
                    }}>
                    {translations["filterleri_sifirla"]}
                </button>
            </div>
            <div className={`right-contents ${loadingData ? 'loading' : ''}`}>
                {RenderCars()}
            </div>
        </div>
    )
}

export default MainFilterContent