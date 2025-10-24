import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowitWorks";
import { WhyRoasting } from "../components/WhyRoasting";

const Index = () => {
  return (
    <div className="min-h-screen bg-stone-900">
      <Hero />
      <HowItWorks />
      <WhyRoasting />
    </div>
  );
};

export default Index;
  