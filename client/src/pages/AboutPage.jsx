import { useState } from "react";
import { Loader } from "../components/Layout/Loader";

export const AboutPage = () => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 3;
  const handleImageLoad = () => setImagesLoaded((count) => count + 1);
  const loading = imagesLoaded < totalImages;

  return (
    <div className="about-feature-section animate-fade-in">
      {loading && <Loader />}
      <h2 className="about-feature-headline">Transforming learning, one click at a time</h2>
      <div className="about-feature-grid" style={loading ? {visibility: 'hidden', height: 0} : {}}>
        {/* Large Top Card */}
        <div className="about-feature-card large">
          <img src="flat 1.jpg" alt="Increased Engagement" onLoad={handleImageLoad} />
          <div className="about-feature-overlay">
            <h3>Increased Engagement</h3>
            <p>Gamified elements, simulations, and real-time collaboration keep students actively involved in their learning journey.</p>
          </div>
        </div>
        {/* Small Bottom Left Card */}
        <div className="about-feature-card small">
          <img src="flat 2.jpg" alt="Improved Teacher-Student Communication" onLoad={handleImageLoad} />
          <div className="about-feature-overlay">
            <h3>Improved Teacher-Student Communication</h3>
            <p>Fosters better communication through discussion and real-time feedback, allowing educators to address student needs quickly.</p>
          </div>
        </div>
        {/* Small Bottom Right Card */}
        <div className="about-feature-card small">
          <img src="flat 3.webp" alt="Flexible Learning Opportunities" onLoad={handleImageLoad} />
          <div className="about-feature-overlay">
            <h3>Flexible Learning Opportunities</h3>
            <p>Learn at your own pace, anywhere, anytime, fitting education into your schedule.</p>
          </div>
        </div>
      </div>
    </div>
  );
};