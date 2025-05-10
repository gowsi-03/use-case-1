'use client';

import Image from 'next/image';
import React, { ReactNode } from 'react';

interface SlideProps {
  title: string;
  subtitle: string;
  image: string;
}

interface ParallaxSliderProps {
  children: ReactNode;
}

const Slide: React.FC<SlideProps> = ({ title, subtitle, image }) => {
  return (
    <div className="slide">
      <Image src={image} alt={title} width={200} height={200}/>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
};

const ParallaxSlider: React.FC<ParallaxSliderProps> & { Slide: React.FC<SlideProps> } = ({ children }) => {
  return <div className="parallax-slider">{children}</div>;
};

// Attach Slide as a subcomponent
ParallaxSlider.Slide = Slide;

export default ParallaxSlider;
