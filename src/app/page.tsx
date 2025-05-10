"use client";

import { ParallaxReveal } from "@/components";

export default function HomePage() {
  return (
    <ParallaxReveal>
      <ParallaxReveal.Slide
        title="Create better content. Deliver faster. Stay ahead."
        subtitle="In a world overflowing with content, the brands that win aren’t just creating more — they deliver personalized, optimized experiences that drive engagement and impact. With Contentful, you have one place to create, personalize, and launch seamless omnichannel digital experiences — at the speed your business demands. <br> <br> What used to take weeks now happens in minutes. No silos. No bottlenecks. Just effortless execution that keeps your brand ahead."
        image="/images/image1.webp"
      />
      <ParallaxReveal.Slide
        title="Basic personalization isn’t enough"
        subtitle="Just because it’s personalized doesn’t mean it’s relevant. Customers expect experiences that feel personal — dynamic, meaningful, and totally on point. <br> <br> Contentful helps you deliver exactly that, at scale, without waiting on developer support. Your campaign manager is testing five AI-generated tagline variations and your content creator is localizing in seconds. Most importantly, every customer moment feels like it was designed just for them."
        image="/images/image2.webp"
      />
      <ParallaxReveal.Slide
        title="Contextual AI gives you a competitive edge"
        subtitle="When it comes to your brand voice, the last thing you need is AI that goes off script. Contentful’s contextual AI is tuned to your brand guidelines, your content, and your documentation—so every output is relevant, accurate, and on-brand. No long prompts, no endless reconfiguration. The context is built in, so you can generate, test, and launch content in seconds. <br> <br> Whether you’re rolling out a new campaign or localizing across regions, you’ll move faster and stay perfectly on-message — every time."
        image="/images/image3.webp"
      />
      <ParallaxReveal.Slide
        title="Scale faster with a flexible DXP"
        subtitle="Built to handle the exponential content demands of your business, Contentful combines composability, native AI, rich personalization, experimentation, and enterprise-grade infrastructure in one endlessly extensible system. <br> <br> Marketers get hands-on control to design and deliver on-brand experiences to any channel, while developers build and ship fast—without limitations."
        image="/images/image4.webp"
      />
    </ParallaxReveal>
  );
}
