"use client";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Scissors,
  Sparkles,
  Spa,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Calendar,
  Clock,
  ChevronDown,
} from "lucide-react";

// Animation component that triggers on scroll
const AnimateOnScroll = ({ children, className, variants }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const defaultVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants || defaultVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Hero Section
const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const openingDate = new Date("2025-04-17T04:00:00Z"); // 9:30 AM SL time in UTC
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = openingDate.getTime() - now.getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const CountdownUnit = ({ value, label }) => (
    <div className="bg-black/50 backdrop-blur-sm p-4 rounded-xl border border-gold/20">
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-sm text-gold/80">{label}</div>
    </div>
  );

  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
      <div className="gold-wave" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10 px-4"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold gold-text mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Aurora Elegance
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl tracking-widest uppercase mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Hair | Beauty | Bridal
        </motion.p>
        <motion.div
          className="bg-black/50 backdrop-blur-sm p-6 rounded-xl mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <h2 className="text-xl mb-4 flex items-center justify-center gap-2">
            <Calendar className="text-gold" size={24} />
            <span>Grand Opening</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <CountdownUnit value={timeLeft.days} label="Days" />
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
          </div>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base text-gold/80">
            <Clock size={18} className="text-gold" />
            <span>17th April 2025, 9:30 AM</span>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute bottom-8 left-0 right-0 mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <ChevronDown className="text-gold animate-bounce" />
        <p className="text-sm mt-2">Explore Our Elegance</p>
      </motion.div>
    </section>
  );
};

// About Section
const About = () => {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-black">
      <AnimateOnScroll className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold gold-text mb-8 text-center">
          Who We Are
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <AnimateOnScroll
            className="md:w-1/2"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
            }}
          >
            <p className="text-base md:text-lg mb-6">
              Aurora Elegance is more than a salon — it’s a sanctuary for
              beauty, bridal dreams, and style transformation. We blend artistry
              with luxury to create an experience as unique as you are.
            </p>
            <p className="text-base md:text-lg mb-6">
              Founded by Tharushi Prabodhya, our salon combines modern
              techniques with personalized attention to ensure you leave feeling
              your absolute best.
            </p>
            <div className="bg-black-light p-4 rounded-lg gold-border">
              <h4 className="font-semibold mb-2 gold-text">Contact Us</h4>
              <div className="flex items-center space-x-3 mb-2">
                <Phone size={18} />
                <a href="tel:+94760436472" className="hover:text-gold-light">
                  076-0436472
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} />
                <a
                  href="mailto:prabodyatharushi90@gmail.com"
                  className="hover:text-gold-light break-words"
                >
                  prabodyatharushi90@gmail.com
                </a>
              </div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll
            className="md:w-1/2"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, delay: 0.2 },
              },
            }}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl h-80">
              <img
                src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=800"
                alt="Salon Interior"
                className="w-full h-full object-cover"
              />
            </div>
          </AnimateOnScroll>
        </div>
      </AnimateOnScroll>
    </section>
  );
};

// Services Section
const Services = () => {
  const services = [
    {
      title: "Hair Styling",
      icon: <Scissors size={24} />,
      description:
        "From classic cuts to avant-garde styling, our hair services transform your look with precision and creativity.",
    },
    {
      title: "Bridal Makeover",
      icon: <Sparkles size={24} />,
      description:
        "Complete bridal packages to make your special day magical, from makeup to hair and full styling.",
    },
    {
      title: "Beauty & Skincare",
      icon: <Sparkles size={24} />,
      description:
        "Rejuvenating facials, professional makeup, and skincare treatments for a radiant, glowing appearance.",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-black-light">
      <AnimateOnScroll className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold gold-text mb-12 text-center">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <AnimateOnScroll
              key={index}
              className="service-card rounded-2xl p-6 flex flex-col items-center text-center"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: index * 0.1 },
                },
              }}
            >
              <motion.div
                className="w-16 h-16 rounded-full gold-bg flex items-center justify-center mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-black">{service.icon}</div>
              </motion.div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 gold-text">
                {service.title}
              </h3>
              <p className="text-gray-300">{service.description}</p>
            </AnimateOnScroll>
          ))}
        </div>
        <div className="text-center mt-12">
          <motion.button
            className="gold-border text-white font-semibold py-3 px-8 rounded-full bg-transparent button-glow"
            whileHover={{ scale: 1.05, borderColor: "var(--gold)" }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Service List
          </motion.button>
        </div>
      </AnimateOnScroll>
    </section>
  );
};

// Gallery Section
const Gallery = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800",
      alt: "Bridal Styling",
    },
    {
      src: "http://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800",
      alt: "Hair Treatment",
    },
    {
      src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800",
      alt: "Makeup Session",
    },
    {
      src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800",
      alt: "Salon Interior",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-black">
      <AnimateOnScroll className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold gold-text mb-12 text-center">
          Gallery Sneak Peek
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <AnimateOnScroll
              key={index}
              className="gallery-item rounded-xl overflow-hidden shadow-lg"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.5, delay: index * 0.1 },
                },
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover"
                />
              </motion.div>
            </AnimateOnScroll>
          ))}
        </div>
        <div className="text-center mt-12">
          <motion.button
            className="gold-border text-white font-semibold py-3 px-8 rounded-full bg-transparent button-glow"
            whileHover={{ scale: 1.05, borderColor: "var(--gold)" }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Gallery
          </motion.button>
        </div>
      </AnimateOnScroll>
    </section>
  );
};

// Location Section
const Location = () => {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-black-light">
      <AnimateOnScroll className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold gold-text mb-12 text-center">
          Find Us
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <AnimateOnScroll
            className="md:w-1/2"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
            }}
          >
            <div className="bg-black-light p-6 rounded-2xl gold-border h-full">
              <h3 className="text-xl font-semibold mb-6 gold-text">
                Our Location
              </h3>
              <div className="flex items-start space-x-3 mb-4">
                <div className="mt-1">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-medium">233/1, Madikalewatta (7 Land),</p>
                  <p>Yakahatuwa, Horampalla</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <Phone size={18} />
                <a href="tel:+94760436472" className="hover:text-gold-light">
                  076-0436472
                </a>
              </div>
              <h4 className="font-medium mt-6 mb-3">Opening Hours</h4>
              <div className="space-y-2">
                <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                <p>Sunday: 10:00 AM - 5:00 PM</p>
              </div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll
            className="md:w-1/2"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, delay: 0.2 },
              },
            }}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.0756308330147!2d80.2245!3d6.123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDcnMjMuMCJOIDgwwrAxMyczNC4yIkU!5e0!3m2!1sen!2slk!4v1650000000000!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimateOnScroll>
        </div>
      </AnimateOnScroll>
    </section>
  );
};

// Footer Section
const Footer = () => {
  return (
    <footer className="py-12 px-4 md:px-8 lg:px-16 bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold gold-text mb-6">
            Connect With Us
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-8">
            <motion.a
              href="tel:+94760436472"
              className="flex items-center space-x-2 text-white hover:text-gold-light transition"
              whileHover={{ scale: 1.05 }}
            >
              <Phone size={18} />
              <span>076-0436472</span>
            </motion.a>
            <motion.a
              href="mailto:prabodyatharushi90@gmail.com"
              className="flex items-center space-x-2 text-white hover:text-gold-light transition break-words"
              whileHover={{ scale: 1.05 }}
            >
              <Mail size={18} />
              <span>prabodyatharushi90@gmail.com</span>
            </motion.a>
            <motion.a
              href="#"
              className="flex items-center space-x-2 text-white hover:text-gold-light transition"
              whileHover={{ scale: 1.05 }}
            >
              <Facebook size={18} />
              <span>Aurora Elegance</span>
            </motion.a>
          </div>
        </div>
        <div className="divider" />
        <div className="text-center text-sm text-gray-400">
          <p>© 2025 Aurora Elegance. All rights reserved.</p>
          <p className="mt-2">Designed with elegance for elegance.</p>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Aurora Elegance - Hair | Beauty | Bridal</title>
        <meta
          name="description"
          content="Aurora Elegance - Premium salon services for hair styling, bridal makeovers, and beauty treatments in Horampalla."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Location />
        <Footer />
      </main>
    </>
  );
}
