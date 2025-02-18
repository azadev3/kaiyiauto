import React from 'react'
import '../../styles/carinstockpage.scss';
import { base, useRequests } from '../../hooks/useRequests';
import { ModelsType } from '../../types/ApiTypes';
import MainFilterContent from './MainFilterContent';
import { Link } from 'react-router-dom';

const CarInStockPage: React.FC = () => {

    const { ModelsData } = useRequests();

    return (
        <div className='cars-in-stock-page-feature-wrapper'>
            <div className="cars-in-stock-page-feature">
                <h1>Əldə olan maşınlar</h1>

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