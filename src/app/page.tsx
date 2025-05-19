"use client";

import { ParallaxReveal } from "@/components";

export default function HomePage() {
  return (
    <ParallaxReveal
      slideOneTitle="Create better content. Deliver faster. Stay ahead."
      slideOneSubtitle="In a world overflowing with content...<br><br>What used to take weeks now happens in minutes."
      slideOneImage="/images/image1.webp"
      slideTwoTitle="Basic personalization isn’t enough"
      slideTwoSubtitle="Just because it’s personalized doesn’t mean it’s relevant...<br><br>Every customer moment feels like it was designed just for them."
      slideTwoImage="/images/image2.webp"
      slideThreeTitle="Contextual AI gives you a competitive edge"
      slideThreeSubtitle="Contentful’s contextual AI is tuned to your brand guidelines...<br><br>Generate, test, and launch content in seconds."
      slideThreeImage="/images/image3.webp"
      slideFourTitle="Scale faster with a flexible DXP"
      slideFourSubtitle="Built to handle exponential content demands...<br><br>Marketers get hands-on control, developers ship fast."
      slideFourImage="/images/image4.webp"
    />
  );
}
