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
     <section className=" bg-#CCCCCC min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-10 heroone">
      
      {/* Left Content */}
      <div className="max-w-lg left-hero">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 ">Simplicity in Every Room</h1>
        <p className="text-gray-600 text-lg mb-6">
          Discover the epitome of modern elegance and comfort with our exquisite Barcelona Rooms.
        </p>
        <button className="bg-black text-white px-1 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition">
            <NavLink to='/room'>
          Explore More
          </NavLink>
        </button>
      </div>

      {/* Right Image */}
      <Swiper navigation modules={[Navigation]} className="mt-8 md:mt-0 img-hero">
      {images.map((img, index) => (
        <SwiperSlide key={index} className='swiper'>
          <img src={img} alt={`Slide ${index + 1}`} className="w-full z-0 " />
        </SwiperSlide>
      ))}
    </Swiper>
      {/* <div className="mt-8 md:mt-0 img-hero">
        <img 
          src="/house.jpg" 
          alt="3D House" 
          className="w-full max-w-xl object-cover "
        />
      </div> */}

    </section>
    <section className='herotwo'>
    <div className="flex justify-center gap-12 p-10 bg-white">
      {features.map((feature, index) => (
        <div key={index} className="text-center max-w-xs">
          <div className="text-4xl mb-4">{feature.icon}</div>
          <h3 className="text-lg font-bold">{feature.title}</h3>
          <p className="text-gray-600 mt-2">{feature.description}</p>
        </div>
      ))}
    </div>
    </section>
   <section className='about-section'>
    <AboutPage/>
   </section>

 
    </>)
}