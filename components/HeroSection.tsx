'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const slidesData = [
  {
    image: '/images/heroes/slider1.webp',
    title: 'RÉPLICAS CUAUHTÉMOC',
    subtitle: 'Tu aliado en la batalla',
    buttonText: 'Realizar Pedido',
    target: '/guia',
  },
  {
    image: '/images/heroes/slider2.webp',
    title: 'Equípate',
    subtitle: 'Contamos con productos de alta calidad',
    buttonText: 'Catálogo',
    target: '/catalogo',
  },
  {
    image: '/images/heroes/slider3.webp',
    title: 'Forma parte de la comunidad',
    subtitle: 'Estamos para ayudarte',
    buttonText: 'Contacto',
    target: '/contacto',
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  dotsClass: 'slick-dots custom-dots',
  arrows: false,
};

const HeroSection = () => {
  const router = useRouter();

  return (
    <div className="relative mt-16 md:mt-20 overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary-light/5 to-secondary/10 animate-glow" />

      <Slider {...settings}>
        {slidesData.map((slide, i) => (
          <div key={i} className="relative">
            <div className="relative h-[450px] md:h-[550px] overflow-hidden">
              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0 -m-[5%] scale-105">
                <Image
                  src={slide.image}
                  alt={`Hero ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-[8000ms] hover:scale-110"
                  priority={i === 0}
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-overlay z-10" />

              {/* Decorative Circles */}
              <div className="absolute top-[10%] right-[5%] w-48 h-48
                            bg-[radial-gradient(circle,rgba(212,175,55,0.1)_0%,transparent_70%)]
                            rounded-full animate-pulse-slow z-10" />
              <div className="absolute bottom-[15%] left-[8%] w-36 h-36
                            bg-[radial-gradient(circle,rgba(175,189,119,0.15)_0%,transparent_70%)]
                            rounded-full animate-pulse-slow [animation-direction:reverse] z-10" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="container-custom text-center px-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-poppins font-extrabold text-hero-mobile md:text-hero
                             mb-6 text-gradient-military drop-shadow-lg"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-2xl mb-8 text-gray-100
                             drop-shadow-md max-w-2xl mx-auto font-light
                             leading-relaxed"
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    onClick={() => {
                      if (slide.target.startsWith('http')) {
                        window.open(slide.target, '_blank');
                      } else {
                        router.push(slide.target);
                      }
                    }}
                    className="relative px-10 py-4 text-xl font-semibold text-white
                             bg-gradient-to-br from-secondary to-secondary-dark
                             rounded-full border-2 border-white/20
                             shadow-military-strong overflow-hidden group
                             hover:scale-105 active:scale-95
                             transition-all duration-300"
                  >
                    {/* Shine Effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent
                                   via-white/20 to-transparent -translate-x-full
                                   group-hover:translate-x-full transition-transform duration-600" />
                    <span className="relative z-10">{slide.buttonText}</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSection;
