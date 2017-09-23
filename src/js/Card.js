import React from 'react';
import propTypes from 'prop-types';
import {priceFormat} from './utils/Formatters'

const Card = ({property, activeProperty, setActiveProperty}) =>{
    const {index, price, address, city, picture, bedrooms, bathrooms, carSpaces} = property

return <div id={`card-${index}`} className={`card col-sm-12 col-md-6 col-lg-4 ${property === activeProperty ? 'is-active':''}`} onClick={() => {setActiveProperty(property, false)}}>
        <img src={picture} alt={city} />
        <p className="price">{priceFormat(price)}</p>
        <div className="details">
            <span className="index">{index+1}</span>
            <p className="location">
                {city}<br />{address}
            </p>
            <ul className="features">
                 <li className="icon-bed">{bedrooms}<span>bedrooms</span></li>
                <li className="icon-bath">{bathrooms}<span>bathrooms</span></li>
                <li className="icon-car">{carSpaces}<span>parking spots</span></li>
            </ul>
        </div>
    </div>
}

Card.propTypes = {
    property: propTypes.object.isRequired,
    activeProperty: propTypes.object.isRequired,
    setActiveProperty: propTypes.func.isRequired
};

export default Card;