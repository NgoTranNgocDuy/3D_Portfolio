import React from 'react';

const testimonials = [
  {
    name: 'Jane Doe',
    role: 'Product Manager',
    review: 'Working with Duy was a fantastic experience. He delivered high-quality work and exceeded our expectations!',
    image: '/public/assets/review1.png',
  },
  {
    name: 'John Smith',
    role: 'CEO, StartupX',
    review: 'Duy is a talented developer with a great eye for design. Highly recommended!',
    image: '/public/assets/review2.png',
  },
  {
    name: 'Emily Nguyen',
    role: 'Designer',
    review: 'Creative, reliable, and always on time. Duy brings ideas to life beautifully.',
    image: '/public/assets/review3.png',
  },
];

const Testimonials = () => (
  <section className="c-space my-20">
  <h2 className="head-text text-3xl sm:text-4xl">Testimonials</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
      {testimonials.map((t, idx) => (
        <div key={idx} className="bg-black/80 rounded-lg p-6 shadow-lg flex flex-col items-center text-center">
          <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full mb-4" />
          <p className="text-white italic mb-2 text-lg">"{t.review}"</p>
          <span className="text-neutral-400 font-semibold text-lg sm:text-xl">{t.name}</span>
          <span className="text-neutral-500 text-base">{t.role}</span>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
