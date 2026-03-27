import AboutSection from "@/frontendComponents/Aboutus";
import FeaturedProjects from "@/frontendComponents/FeaturedProjects";
import FeaturedWorks from "@/frontendComponents/FeaturedWorks";
import Hero from "@/frontendComponents/Hero";
import NewsLatter from "@/frontendComponents/NewsLatter";
import NewsSection from "@/frontendComponents/NewsSection";
import OurWork from "@/frontendComponents/OurWork";
import ProductSection from "@/frontendComponents/ProductSection";
import SliderBrand from "@/frontendComponents/SliderBrand";
import TestimonialsSection from "@/frontendComponents/TestimonialsSection";
import WorkSection from "@/frontendComponents/WorkSection";
import OurStory from "@/frontendComponents/OurStory";

export const dynamic = "force-dynamic";

const HomePage = () => {
  return (
    <main>
      {/* <HeroSection/> */}
      <Hero />
      <AboutSection />
      <OurWork />
      <FeaturedWorks />
      <FeaturedProjects />
      <ProductSection />
      <WorkSection/>
      <TestimonialsSection />
      <NewsSection />
      <OurStory/>
      {/* <SliderBrand /> */}
      <NewsLatter />
    </main>
  );
};
export default HomePage;
