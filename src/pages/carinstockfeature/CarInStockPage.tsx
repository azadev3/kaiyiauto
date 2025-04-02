import React from 'react'
import '../../styles/carinstockpage.scss';
import { api, base, SeoInterface, useRequests } from '../../hooks/useRequests';
import { ModelsType } from '../../types/ApiTypes';
import MainFilterContent from './MainFilterContent';
import { Link } from 'react-router-dom';
import { useTranslates } from '../../hooks/useTranslates';
import axios from 'axios';
import { SelectedLanguageState } from '../../recoil/Atom';
import { useRecoilValue } from 'recoil';
import { Helmet } from 'react-helmet-async';

const CarInStockPage: React.FC = () => {

    const { ModelsData } = useRequests();
    const { translations } = useTranslates();

    const lang = useRecoilValue(SelectedLanguageState);
    const [seoData, setSeoData] = React.useState<SeoInterface>();
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${api}/stockincars-seo-front`, {
                    headers: {
                        "Accept-Language": lang
                    }
                });
                if (response.data) {
                    setSeoData(response.data[0]);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [lang]);

    return (
        <div className='cars-in-stock-page-feature-wrapper'>
            <Helmet>
                <title>{seoData?.meta_title || ""}</title>
                <meta name='description' content={seoData?.meta_description || ""} />
            </Helmet>
            <div className="cars-in-stock-page-feature">
                <h1>{translations['elde_olan_masinlar']}</h1>

                <div className="cars-category">
                    {ModelsData?.map((m: ModelsType) => (
                        <Link to={`/${m?._id}`} key={m?._id} className='car-item'>
                            <div className="image">
                                <img src={`${base}${m?.image}`} alt="" />
                            </div>
                            <h2>{m?.title}</h2>
                        </Link>
                    ))}
                </div>
                <MainFilterContent />
            </div>
        </div>
    )
}

export default CarInStockPage