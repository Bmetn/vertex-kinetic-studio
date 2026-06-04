import HeroGravity from '../components/HeroGravity';
import Portfolio from '../components/Portfolio';
import Principles from '../components/Principles';

export default function HomePage() {
  return (
    <main>
      <HeroGravity />
      <div className="section-divider" />
      <Portfolio />
      <div className="section-divider" />
      <Principles />
    </main>
  );
}
