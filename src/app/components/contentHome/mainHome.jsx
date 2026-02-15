import MainFeature from "./featureMain";
import MainHero from "./mainHero";
import CounterSection from "./mainState";

export default function MainHome() {
  return (
    <div>
      <MainHero />
      <MainFeature />
      <CounterSection />
    </div>
  );
}
