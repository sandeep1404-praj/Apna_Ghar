import { NavLink } from 'react-router-dom'
import features from '../api/feature.json'
import { AboutPage } from './AboutPage'
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
export const HomePage = ()=>{
    const images = [
        "house.jpg",
        "flat 1.jpg",
        "flat 4.jpg",
        "flat 5.jpg"
      ];
    
    return(<>
    <section className="bg-gray-300 h-150 flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-10 ">
      
      {/* Left Content */}
      <div className="max-w-lg text-center md:text-left ">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Simplicity in Every Room
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Discover the epitome of modern elegance and comfort with our exquisite Barcelona Rooms.
        </p>
        <NavLink to="/room">
          <button className="bg-black text-white px-5 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition">
            Explore More
          </button>
        </NavLink>
      </div>

      {/* Right Image Swiper */}
      <div className="w-full md:w-1/2 z-0">
        <Swiper navigation modules={[Navigation]} className="w-full max-w-lg ">
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`Slide ${index + 1}`} className="w-full h-auto rounded-lg shadow-lg" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
    </section>
    <section className="herotwo bg-white py-10 px-6">
        <div className="flex flex-wrap justify-center gap-12 text-center">
          {features.map((feature, index) => (
            <div key={index} className="max-w-xs">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section bg-gray-100 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <AboutPage />
        </div>
      </section>

 
    </>)
}