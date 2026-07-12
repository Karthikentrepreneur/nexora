import React, { useEffect } from 'react';
import loadBackgroudImages from '../Common/loadBackgroudImages';
import parse from 'html-react-parser';
import Slider from 'react-slick';

const Heroanner1 = () => {

    const heroContent = [
        {img:'/assets/img/hero/01.jpg', subtitle:'Get unforgettable pleasure with us', title:'Let’s make your best <br> trip with us'},
        {img:'/assets/img/hero/02.jpg', subtitle:'Get unforgettable pleasure with us', title:'Let’s make your best <br> trip with us'},
        {img:'/assets/img/hero/03.jpg', subtitle:'Get unforgettable pleasure with us', title:'Let’s make your best <br> trip with us'},
    ];

    useEffect(() => {
        loadBackgroudImages();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        fade: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,        
        responsive: [
            { breakpoint: 1399, settings: { slidesToShow: 1 } },
            { breakpoint: 1199, settings: { slidesToShow: 1 } },
            { breakpoint: 575, settings: { slidesToShow: 1 } }
        ]
    };  

    return (
        <section className="hero-section">
            <div className="swiper hero-slider">
                <div className="swiper-wrapper">
                    <Slider {...settings}>
                        {heroContent.map((item, i) => (
                            <div key={i} className="swiper-slide">
                                <div className="hero-1">
                                    <div className="hero-bg bg-cover" data-background={item.img}></div>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-10">
                                                <div className="hero-content">
                                                    <div className="sub-title">
                                                        {item.subtitle}
                                                    </div>
                                                    <h1>{parse(item.title)}</h1>
                                                </div>

                                                <div className="counter-area">
                                                    <div className="counter-items">
                                                        <div className="counter-text">
                                                            <h2><span className="count">20.5</span>k</h2>
                                                            <p>Featured Projects</p>
                                                        </div>
                                                        <div className="counter-text">
                                                            <h2><span className="count">100.5</span>k</h2>
                                                            <p>Luxury Houses</p>
                                                        </div>
                                                        <div className="counter-text">
                                                            <h2><span className="count">150.5</span>k</h2>
                                                            <p>Satisficed Clients</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default Heroanner1;
