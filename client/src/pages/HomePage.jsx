import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import features from '../api/feature.json'
import { AboutPage } from './AboutPage'
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Loader } from "../components/Layout/Loader";

export const HomePage = ()=>{
    const images = [
        "house.jpg",
        "flat 1.jpg",
        "flat 4.jpg",
        "flat 5.jpg"
      ];
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const totalImages = images.length;
    const handleImageLoad = () => setImagesLoaded((count) => count + 1);
    const loading = imagesLoaded < totalImages;

    return(<>
    <section className="homepage-hero animate-fade-in">
      {loading && <Loader />}
      {/* Left Content */}
      <div className="homepage-hero-left" style={loading ? {visibility: 'hidden', height: 0} : {}}>
        <h1 className="homepage-hero-title fade-in-up">
          Simplicity in Every Room
        </h1>
        <p className="homepage-hero-desc fade-in-up" style={{animationDelay: '0.1s'}}>
          Discover the epitome of modern elegance and comfort with our exquisite Barcelona Rooms.
        </p>
        <NavLink to="/room">
          <button className="homepage-hero-btn fade-in-up" style={{animationDelay: '0.2s'}}>
            Explore More
          </button>
        </NavLink>
      </div>
      {/* Right Image Swiper */}
      <div className="homepage-hero-right fade-in-up" style={loading ? {visibility: 'hidden', height: 0} : {animationDelay: '0.3s'}}>
        <Swiper navigation modules={[Navigation]} className="w-full max-w-lg ">
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`Slide ${index + 1}`} className="w-full h-auto rounded-lg shadow-lg" onLoad={handleImageLoad} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
    <section className="herotwo bg-white py-10 px-6 animate-fade-in">
        <div className="flex flex-wrap justify-center gap-12 text-center">
          {features.map((feature, index) => (
            <div key={index} className="max-w-xs feature-card fade-in-up" style={{animationDelay: `${0.1 * index}s`}}>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* About Section */}
      <section className="about-section bg-gray-100 py-12 px-6 animate-fade-in">
        <div className="container mx-auto max-w-6xl">
          <AboutPage />
        </div>
      </section>
    </>)
}