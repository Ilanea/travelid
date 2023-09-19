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

  return (
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div className="absolute inset-0 bg-zinc-900" />
      <div className="relative z-20 flex items-center text-lg font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        Travel ID
      </div>
      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          <p className="text-lg">&ldquo;{randomQuote.quote}&rdquo;</p>
          <footer className="text-sm">{randomQuote.quotee}</footer>
        </blockquote>
      </div>
    </div>
  );
};

export default LeftHero;
