import { useEffect, useState } from 'react';

import { cn } from '@libs/utils';

import Logo from '@hotel/components/logo';

type Quotation = {
  quotee: string;
  quote: string;
};

const quotations: Quotation[] = [
  {
    quotee: 'Carla Wittemann, Founder',
    quote:
      'In a landscape dominated by corporate giants, we stand as a beacon of distinction, providing a home for hotels that dare to be different.',
  },
  {
    quotee: 'Carla Wittemann, Founder',
    quote:
      'We are a family of hotels that are as diverse as we are alike. We are independent, yet united by a desire to stand out from the crowd.',
  },
  {
    quotee: 'Carla Wittemann, Founder',
    quote:
      'Our commitment to exceptional guest experiences is unwavering. Every member of our alliance adheres to the highest standards of service, ensuring that your stay is not just a temporary escape but a cherished memory.',
  },
  {
    quotee: 'Jan-Patrick Teichmann, Founder',
    quote:
      'Each of our member hotels boasts a personality all its own, from cozy countryside inns to vibrant urban retreats, from historic treasures to cutting-edge design marvels.',
  },
  {
    quotee: 'Jan-Patrick Teichmann, Founder',
    quote:
      'Our alliance is a testament to the beauty of individuality, where you can embark on a journey of discovery through the lens of local charm and personal touch.',
  },
];

const LeftHero = () => {
  const randomQuote: Quotation =
    quotations[Math.floor(Math.random() * quotations.length)];
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(100);
  }, []);

  return (
    <div className="relative hidden h-full flex-col bg-primary-950 p-10 text-white dark:border-r lg:flex">
      <div className="absolute inset-0" />
      <Logo />
      <div
        className={cn(
          'relative z-20 mt-auto transition-all ease-in duration-1000',
          'opacity-' + opacity
        )}
      >
        <blockquote className="space-y-2">
          <p className="text-lg">&ldquo;{randomQuote.quote}&rdquo;</p>
          <footer className="text-sm">{randomQuote.quotee}</footer>
        </blockquote>
      </div>
    </div>
  );
};

export default LeftHero;
