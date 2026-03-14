import VortexHero from '@/components/VortexHero';
import BentoDiscoveryGrid from '@/components/BentoDiscoveryGrid';
import ProvincialExplorer from '@/components/ProvincialExplorer';
import DestinationsShowcase from '@/components/DestinationsShowcase';
import ItineraryMorph from '@/components/ItineraryMorph';

export default function Home() {
  return (
    <main className="page-container">
      <VortexHero />
      <BentoDiscoveryGrid />
      <ProvincialExplorer />
      <DestinationsShowcase />
      <ItineraryMorph />
    </main>
  );
}
