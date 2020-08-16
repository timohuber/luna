import React from 'react';
import
{

    FaMapPin,
    FaMobile,
    FaLaptop

} from 'react-icons/fa';

const RestInfoMap = (props) => {
    const restaurant = props.restaurant;


    return (<>
        
        <div className="mapContainer">
            <img src="https://i.insider.com/575ae527dd0895ff718b4933"/>
        </div>
        <div className="restInfoMapList">
            <ul>
                <li><FaMapPin size="30"/>
                    <span className="infoTextAside">{restaurant.street}</span>
                </li>
                <li><FaMobile size="30"/>
                    <span className="infoTextAside">{restaurant.phone}</span>
                </li>
                <li><FaLaptop size="30"/>
                    <span className="infoTextAside">{restaurant.website}</span>
                </li>
            </ul>
        </div>
    </>)

}

export default RestInfoMap;
