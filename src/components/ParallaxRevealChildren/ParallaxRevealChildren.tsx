"use client";

import React, {
  useEffect,
  useRef,
  useState,
  ReactElement,
  ReactNode,
} from "react";
import { Row, Col, Typography, Layout } from "antd";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useHasMounted, useIsMobile } from "@/hooks";
import styles from "./ParallaxRevealChildren.module.css";
// import { ImageDisplay, TextContent } from "./components";
import ParallaxSlide, { ParallaxSlideProps } from "./ParallaxSlide";

const { Title } = Typography;
gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
};

export default function ParallaxReveal({ children }: Props) {
  const hasMounted = useHasMounted();
  const isMobile = useIsMobile(768);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Keep the full React elements here:
  const slides = React.Children.toArray(children).filter(
    (child): child is ReactElement<ParallaxSlideProps> =>
      React.isValidElement(child) && child.type === ParallaxSlide
  );

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
          {slides.map((slide, idx) => (
            <div key={idx} style={{ marginBottom: 100 }}>
              {/* For mobile, show full slide (image + text) */}
              {React.cloneElement(slide)}
            </div>
          ))}
        </div>
      ) : (
        <Row gutter={64} style={{ paddingTop: 54 }}>
          <Col span={12}>
            {slides.map((slide, idx) => (
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
                  {/* Show only title + subtitle here */}
                  <ParallaxSlide
                    {...slide.props}
                    showTextOnly
                  />
                </div>
              </section>
            ))}
          </Col>

          <Col span={12}>
            <div className={styles.imageWrapper}>
              <div style={{ width: "100%", height: "70vh" }}>
                <div className={styles.imageContainer}>
                  {/* Show only image of active slide here */}
                  {slides[activeIndex] && (
                    <ParallaxSlide
                      {...slides[activeIndex].props}
                      showImageOnly
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
