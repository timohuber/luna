import React from 'react';
import facebookIcon from '../../assets/icons/facebook.svg'
import TwitterIcon from '../../assets/icons/twitter.svg'
import GoogleIcon from '../../assets/icons/googleplus.svg'
import InstaIcon from '../../assets/icons/instagram.svg'

//import './index.css';

const Footer = () => {
    return (
        <footer>
            <div className="primary-footer">
            <ul className="left-ul-footer">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">iOS</a></li>
                <li><a href="#">Android</a></li>
            </ul>

            <ul className="right-ul-footer">
                <li><a href="#"><img src={facebookIcon}/></a></li>
                <li><a href="#"><img src={TwitterIcon}/></a></li>
                <li><a href="#"><img src={GoogleIcon}/></a></li>
                <li><a href="#"><img src={InstaIcon}/></a></li>
            </ul>
            </div>
            <div className="secondary-footer">
                © Copyright Luna 2020
            </div>
        </footer>
    );
};

export default Footer;