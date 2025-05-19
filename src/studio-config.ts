import { defineComponents } from '@contentful/experiences-sdk-react';
import { ParallaxReveal, } from './components';

defineComponents([
  {
    component: ParallaxReveal,
    definition: {
      id: 'parallax-reveal',
      name: 'Parallax Reveal',
      category: 'Custom Components',
      variables: {
        // Slide One
        slideOneTitle: { displayName: "Slide One Title", type: "Text" },
        slideOneSubtitle: { displayName: "Slide One Subtitle", type: "RichText" },
        slideOneImage: { displayName: "Slide One Image", type: "Media" },

        // Slide Two
        slideTwoTitle: { displayName: "Slide Two Title", type: "Text" },
        slideTwoSubtitle: { displayName: "Slide Two Subtitle", type: "RichText" },
        slideTwoImage: { displayName: "Slide Two Image", type: "Media" },

        // Slide Three
        slideThreeTitle: { displayName: "Slide Three Title", type: "Text" },
        slideThreeSubtitle: { displayName: "Slide Three Subtitle", type: "RichText" },
        slideThreeImage: { displayName: "Slide Three Image", type: "Media" },

        // Slide Four
        slideFourTitle: { displayName: "Slide Four Title", type: "Text" },
        slideFourSubtitle: { displayName: "Slide Four Subtitle", type: "RichText" },
        slideFourImage: { displayName: "Slide Four Image", type: "Media" },
      },
    },
  },
]);
