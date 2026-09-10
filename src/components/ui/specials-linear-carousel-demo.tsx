"use client";

import { Carousel, Card } from "@/components/ui/specials-linear-carousel";

const images = [
  {
    src: "https://cdn.21st.dev/assets/mirror/46/4640404badd4692a0956c124cad3f90ab4a01acb804c038caddddea9a98040f6.jpg",
    title: "Mountain Views",
    category: "Nature",
    content: (
      <p className="text-neutral-500">
        Breathtaking mountain landscapes from around the world.
      </p>
    ),
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/d0/d04cde6d6c11fae1caf86bf46e1ad92a26359da51787c6816d65ea328a6bb5b6.jpg",
    title: "Ocean Blue",
    category: "Nature",
    content: <p className="text-neutral-500">Calm and serene ocean views.</p>,
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/43/43a3af0c82593e850e9effa52335cd95ded0190f26efd68f24c7e37a38e28d57.jpg",
    title: "Forest Pathways",
    category: "Nature",
    content: (
      <p className="text-neutral-500">
        Mysterious paths through dense forests.
      </p>
    ),
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/a2/a22bbbfe8bc239d8b456887dda7b9f733a81752830a3184dbbee181b5b71a2f9.jpg",
    title: "Solitude",
    category: "Nature",
    content: (
      <p className="text-neutral-500">
        Finding peace in the vastness of nature.
      </p>
    ),
  },
];

export default function LinearCarouselDemo() {
  const cards = images.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <Carousel items={cards} />
    </div>
  );
}
