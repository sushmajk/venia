import React from 'react';
import './thirdBanner.scss';

export default function ThirdBanner() {
  return (
    <section className='third_banner'>
        <div className="container">
            <div className="row">
                <div className="aem-Grid aem-Grid--default--8 aem-Grid--phone--12 reverse">
                
                <div className="aem-GridColumn  aem-GridColumn--default--5 aem-GridColumn--phone--12 ">
                    <div className='img-wrapper'>
                        <img className="banner-img" src={process.env.PUBLIC_URL + `/assets/img/thirdbanner.png`} alt="banner img" />
                    </div>
                </div>
                <div className="aem-GridColumn  aem-GridColumn--default--3 aem-GridColumn--phone--12 phn-container d-flex">
                    <div className='card'>
                        <p className='text'>Conquer your next adventure </p>
                        <p className='text-info'>Lorem Ipsum Dolor Tempor </p>
                        <button className="btn ">SHOP DEVICES </button>
                    </div>
                        
                </div>
                </div>
                
            </div>
        </div>
    </section>
  )
}
