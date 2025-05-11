"use client";

import React, {
  useEffect,
  useRef,
  useState,
  ReactNode,
  ReactElement,
} from "react";
import { Row, Col, Typography, Layout } from "antd";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useHasMounted, useIsMobile } from "@/hooks";
import styles from "./ParallaxReveal.module.css";
import { ImageDisplay, TextContent } from "./components";

const { Title } = Typography;
gsap.registerPlugin(ScrollTrigger);

type SlideProps = {
  title: string;
  subtitle: string;
  image: string;
};

type Props = {
  children: ReactNode;
};

const Slide: React.FC<SlideProps> = () => null;

const ParallaxReveal: React.FC<Props> & {
  Slide: React.FC<SlideProps>;
} = ({ children }) => {
  const hasMounted = useHasMounted();
  const isMobile = useIsMobile(768);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const slides = React.Children.toArray(children)
    .filter(
      (child): child is ReactElement<SlideProps> =>
        React.isValidElement(child) && child.type === Slide
    )
    .map((child) => ({
      title: child.props.title,
      subtitle: child.props.subtitle,
      image: child.props.image,
    }));

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

  // Prevent hydration mismatch
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
              <ImageDisplay src={section.image} alt={section.title} />
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
                style={{
                  minHeight: "70vh",
                  paddingRight: 36,
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
            <div
              style={{
                position: "sticky",
                top: "30%",
                transform: "translateY(0)",
                width: "100%",
              }}
            >
              {slides[activeIndex] && (
                <ImageDisplay
                  src={slides[activeIndex].image}
                  alt={slides[activeIndex].title}
                />
              )}
            </div>
          </Col>
        </Row>
      )}
    </Layout>
  );
};

ParallaxReveal.Slide = Slide;

export default ParallaxReveal;
