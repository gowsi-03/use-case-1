"use client";

import { Col, Row } from "antd";
import Image from "next/image";
import React, { ReactNode } from "react";

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
    <div style={{ padding: "40px 0" }}>
      <Row gutter={32} align="top">
        {/* Text on the left */}
        <Col xs={24} md={12}>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </Col>

        {/* Image on the right */}
        <Col xs={24} md={12}>
          <Image
            width={200}
            height={200}
            src={image}
            alt={title}
            style={{ width: "100%", borderRadius: "12px", height:'100%' }}
          />
        </Col>
      </Row>
    </div>
  );
};

const ParallaxSlider: React.FC<ParallaxSliderProps> & {
  Slide: React.FC<SlideProps>;
} = ({ children }) => {
  return <div className="parallax-slider">{children}</div>;
};

// Attach Slide as a subcomponent
ParallaxSlider.Slide = Slide;

export default ParallaxSlider;
