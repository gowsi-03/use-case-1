"use client";

import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Typography, Layout } from "antd";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useHasMounted, useIsMobile } from "@/hooks";
import styles from "./ParallaxRevealFlattend.module.css";
import { ImageDisplay, TextContent } from "./components";

const { Title } = Typography;
gsap.registerPlugin(ScrollTrigger);

type SlideData = {
  title: string;
  subtitle: string;
  image?: string;
};

type ParallaxRevealProps = {
  slideOneTitle: string;
  slideOneSubtitle: string;
  slideOneImage: string;
  slideTwoTitle: string;
  slideTwoSubtitle: string;
  slideTwoImage: string;
  slideThreeTitle?: string;
  slideThreeSubtitle?: string;
  slideThreeImage?: string;
  slideFourTitle?: string;
  slideFourSubtitle?: string;
  slideFourImage?: string;
};

export default function ParallaxRevealFlattend({
  slideOneTitle,
  slideOneSubtitle,
  slideOneImage,
  slideTwoTitle,
  slideTwoSubtitle,
  slideTwoImage,
  slideThreeTitle,
  slideThreeSubtitle,
  slideThreeImage,
  slideFourTitle,
  slideFourSubtitle,
  slideFourImage,
}: ParallaxRevealProps) {
  const hasMounted = useHasMounted();
  const isMobile = useIsMobile(768);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const slides: SlideData[] = [
    {
      title: slideOneTitle,
      subtitle: slideOneSubtitle,
      image: slideOneImage,
    },
    {
      title: slideTwoTitle,
      subtitle: slideTwoSubtitle,
      image: slideTwoImage,
    },
    ...(slideThreeTitle && slideThreeSubtitle && slideThreeImage
      ? [
          {
            title: slideThreeTitle,
            subtitle: slideThreeSubtitle,
            image: slideThreeImage,
          },
        ]
      : []),
    ...(slideFourTitle && slideFourSubtitle && slideFourImage
      ? [
          {
            title: slideFourTitle,
            subtitle: slideFourSubtitle,
            image: slideFourImage,
          },
        ]
      : []),
  ];

  useEffect(() => {
    if (!hasMounted || isMobile) return;

    ScrollTrigger.getAll().forEach((st) => st.kill());

    sectionRefs.current.forEach((el, idx) => {
      const contentEl = el?.querySelector(".content");
      if (!contentEl) return;

      gsap.fromTo(
        contentEl,
        idx === 0
          ? { filter: "blur(10px)" }
          : { opacity: 0, filter: "blur(10px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (idx < slides.length - 1) {
        ScrollTrigger.create({
          trigger: el,
          start: "top -8%",
          end: "top 10%",
          onLeave: () => setTimeout(() => setActiveIndex(idx + 1), 100),
          onLeaveBack: () => setActiveIndex(idx),
        });
      }
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, [hasMounted, isMobile, slides.length]);

  if (!hasMounted) return null;

  return (
    <Layout className={styles.layoutWrapper} style={{ background: "white" }}>
      <Row gutter={[24, 24]}>
        <Col span={24} md={22} lg={14}>
          <div className={styles.titleWrapper}>
            <Title level={1}>
              Digital experiences make or break your brand
            </Title>
          </div>
        </Col>
      </Row>

      {isMobile ? (
        <div>
          {slides.map((section, idx) => (
            <div key={idx} style={{ marginBottom: isMobile ? 100 : 80 }}>
              <ImageDisplay
                src={
                  section.image?.startsWith("//")
                    ? `https:${section.image}`
                    : section.image || ""
                }
                alt={section.title}
              />
              <TextContent title={section.title} subtitle={section.subtitle} />
            </div>
          ))}
        </div>
      ) : (
        <Row gutter={64} style={{ paddingTop: 54 }}>
          <Col span={12}>
            {slides.map((section, idx) => (
              <section
                key={idx}
                ref={(el) => {
                  sectionRefs.current[idx] = el;
                }}
                className={styles.sectionWrapper}
                style={{
                  minHeight: "70vh",
                  marginTop: idx > 0 ? 200 : 0,
                }}
              >
                <div
                  className={`content ${
                    idx === 0 ? "blur-sm" : "opacity-0 blur-sm"
                  }`}
                >
                  <TextContent
                    title={section.title}
                    subtitle={section.subtitle}
                  />
                </div>
              </section>
            ))}
          </Col>

          <Col span={12} style={{ paddingLeft: "12px", paddingRight: "32px" }}>
            <div className={styles.imageWrapper}>
              <div
                className={styles.imageWrapper}
                style={{ width: "100%", height: "70vh" }}
              >
                <div className={styles.imageContainer}>
                  {slides[activeIndex].image && (
                    <ImageDisplay
                      src={
                        slides[activeIndex].image?.startsWith("//")
                          ? `https:${slides[activeIndex].image}`
                          : slides[activeIndex].image
                      }
                      alt={slides[activeIndex].title}
                    />
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Layout>
  );
}
