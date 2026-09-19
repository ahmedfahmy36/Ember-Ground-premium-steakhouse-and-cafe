import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { MenuTabs } from "@/components/sections/MenuTabs";
import { Gallery } from "@/components/sections/Gallery";
import { Location } from "@/components/sections/Location";
import { Hours } from "@/components/sections/Hours";
import { ReservationForm } from "@/components/sections/ReservationForm";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <MenuTabs />
      <Gallery />
      <Location />
      <Hours />
      <ReservationForm />
      <ScrollToTop />
    </>
  );
}
