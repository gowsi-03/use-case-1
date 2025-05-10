'use client';

import { ParallaxSlider } from '@/components/ParallaxSlider';

export default function HomePage() {
  return (
    <ParallaxSlider>
      <ParallaxSlider.Slide title="Title 1" subtitle="Subtitle 1" image="/images/image1.webp" />
      <ParallaxSlider.Slide title="Title 2" subtitle="Subtitle 2" image="/images/image2.webp" />
      <ParallaxSlider.Slide title="Title 3" subtitle="Subtitle 3" image="/images/image3.webp" />
      <ParallaxSlider.Slide title="Title 4" subtitle="Subtitle 4" image="/images/image4.webp" />
    </ParallaxSlider>
  );
}
