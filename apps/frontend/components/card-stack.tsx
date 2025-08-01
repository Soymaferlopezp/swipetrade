import { useEffect, useState } from 'react';
import SwapCard from './swap-card';
import { SwapData } from '@/types/swap';

export default function CardStack() {
  const [recommendations, setRecommendations] = useState<SwapData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/swaps/recommendations');
        const data = await res.json();
        setRecommendations(data);
      } catch (err) {
        console.error('❌ Error fetching recommendations:', err);
      }
    };

    fetchRecommendations();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1 < recommendations.length ? prev + 1 : 0));
  };

  if (recommendations.length === 0) {
    return <p className="text-center text-white">Loading...</p>;
  }

  const current = recommendations[currentIndex];

  return (
    <div className="flex flex-col items-center">
      <SwapCard {...current} onNext={handleNext} />
      <p className="text-xs text-gray-400 mt-2">
        {currentIndex + 1}/{recommendations.length}
      </p>
    </div>
  );
}
