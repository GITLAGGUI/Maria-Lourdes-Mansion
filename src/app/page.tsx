import HeroSection from "@/components/HeroSection";
import RoomListings from "@/components/RoomListings";
import About from "@/components/About";
import FacilitiesSection from "@/components/FacilitiesSection";
import SwimmingPool from "@/components/SwimmingPool";
import Gallery from "@/components/Gallery";
import InstagramFeed from "@/components/InstagramFeed";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Home() {
  return (
    <main>
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>
      <HeroSection />
      <RoomListings />
      <About />
      <FacilitiesSection />
      <SwimmingPool />
      <Gallery />
      <InstagramFeed />
      <Contact />
      <Footer />
    </main>
  );
}
