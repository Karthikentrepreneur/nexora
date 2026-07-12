import React from 'react';
import { Link } from 'react-router';

const Category1 = () => {

    const categoryContent = [
        {img:'/shipping.png', title:'Shipping', path:'/shipping'},
        {img:'/logistics.png', title:'Logistics', path:'/logistics'},
        {img:'/product.png', title:'Product Distribution', path:'/product-distribution'},
        {img:'/software.png', title:'Software Development', path:'/software-development'},
        {img:'/renewable.png', title:'Renewable Energy', path:'/renewable-energy'},
      ];

    return (
        <section className="destination-category-section pt-10 pb-4">
            <div className="plane-shape float-bob-y"></div>
            <div className="container">
                <div className="section-title text-center">
                    <span className="sub-title wow fadeInUp"></span>
                    <h2 className="wow fadeInUp wow" data-wow-delay=".2s">
                        Our Core Industries
                    </h2>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row g-4 justify-content-center">
                    {categoryContent.map((item, i) => (
                        <div key={i} className="col-auto">
                            <div className="destination-category-item">
                                <div className="category-image">
                                    <img src={item.img} alt={item.title} />
                                    <div className="category-content">
                                        <h5>
                                            <Link to={item.path}>{item.title}</Link>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section> 
    );
};

export default Category1;
