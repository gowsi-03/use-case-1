"use client";

import { Row, Col } from "antd";
import { ImageDisplay, TextContent } from "./components";

export type ParallaxSlideProps = {
  title: string;
  subtitle: string;
  image: string;
  showImageOnly?: boolean;
  showTextOnly?: boolean;
};

function ParallaxSlide({
  title,
  subtitle,
  image,
  showImageOnly = false,
  showTextOnly = false,
}: ParallaxSlideProps) {
  if (showImageOnly) {
    return <ImageDisplay src={image} alt={title} />;
  }

  if (showTextOnly) {
    return <TextContent title={title} subtitle={subtitle} />;
  }

  return (
    <Row gutter={[24, 24]} align="middle" className="w-full">
      <Col xs={24} md={12}>
        <TextContent title={title} subtitle={subtitle} />
      </Col>
      <Col xs={24} md={12}>
        <ImageDisplay src={image} alt={title} />
      </Col>
    </Row>
  );
}

export default ParallaxSlide;
