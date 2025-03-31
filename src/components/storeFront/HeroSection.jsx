import fashionimg from "../../assets/images/hero-banner.jpg";
import "../../styles/hero-section.css";
function HeroSection() {
  return (
    <section className="hero-section">
      <h2 className="hero-sec-header">Summer styles are finally here</h2>
      <div className="hero-sec-text">
        This year, our new summer collection will be your haven from the world's
        harsh elements.
      </div>
      <div className="hero-sec-btn">
        <button>Shop Now</button>
      </div>
      <figure className="hero-sec-img">
        <img src={fashionimg} alt="fashion-img" width={"696"} height={"526"} />
      </figure>
    </section>
  );
}

export default HeroSection;
