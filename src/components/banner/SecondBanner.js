import React from 'react';
import './secondBanner.scss';

export default function SecondBanner() {
  return (
    <section className='secondBanner'>
        <div className='container'>
            <div className='row'>
                <div className="aem-Grid aem-Grid--default--12 aem-Grid--phone--1 reverse">
                        <div className="aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--phone--1  ">
                            <div className='secondBanner__container'>
                                <div className='secondBanner__content'>
                                    <div className='secondBanner__text'>
                                        <h1 className='secondBanner__title'>Take off in the new Signature Legging</h1>
                                        <h3 className='secondBanner__sub_title'>Lorem Ipsum Dolor Tempor</h3>
                                        <p className='secondBanner__info'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                        sed do eiusmod tempor labore dolore magna lorem ipsum dolor sit dolore magna.</p>
                                        <div className='secondBanner__btn_wrapper '>
                                            <button className="secondBanner__btn opp-org uppercase mr-rt-32 ">SHOP COLLECTION    </button>
                                            <button className="secondBanner__btn org uppercase ">Shop Now</button>
                                        </div>
                                        <div className="secondBanner__line"></div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--phone--1  ">
                            <div className='secondBanner__wrapper'>
                                <img src={process.env.PUBLIC_URL + `/assets/img/secondBanner.png`} alt="img" />
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </section>
  )
}
