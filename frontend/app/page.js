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
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from 'next/link';

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
  return (
    <section className="relative bg-black h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Background Wave */}
      <div className="gold-wave" />

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10 px-4"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Image
            src="/logo.png" // Ensure it's in public/
            alt="Aurora Elegance Logo"
            width={500} // Adjust size as needed
            height={100}
            className="mx-auto"
            priority
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-lg md:text-xl tracking-widest uppercase text-gold/80 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
      
        </motion.p>

        {/* Welcome Message */}
        <motion.div
          className="bg-black/50 backdrop-blur-sm p-6 rounded-xl mt-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gold mb-4">
            Welcome to Aurora Elegance
          </h2>
          <p className="text-white/80 text-sm md:text-base">
            Your premier destination for beauty, bridal dreams, and style
            transformation.
          </p>
        </motion.div>
      </motion.div>

      {/* Explore Button */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <ChevronDown className="text-gold animate-bounce mx-auto" />
        <p className="text-sm mt-2 text-gold/60">Explore Our Elegance</p>
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
            <div className="rounded-2xl overflow-hidden shadow-2xl h-120 max-md:h-150">
              <img
                src="./main.jpg"
                alt="Salon Interior"
                className="w-full h-full object-[center_20%]  object-cover"
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
      src: "./z.jpg",
      alt: "Bridal Styling",
    },
    {
      src: "./s.jpg",
      alt: "Hair Treatment",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-black">
      <AnimateOnScroll className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold gold-text mb-12 text-center">
          Gallery Sneak Peek
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center bg-black rounded-2xl overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-auto object-contain"
                  />
                </div>
              </motion.div>
            </AnimateOnScroll>
          ))}
        </div>
        <div className="text-center mt-12">
      
          <Link href="/gallery">
            <motion.button
              className="gold-border text-white font-semibold py-3 px-8 rounded-full bg-transparent button-glow"
              whileHover={{ scale: 1.05, borderColor: "var(--gold)" }}
              whileTap={{ scale: 0.95 }}
            >
              View Full Gallery
            </motion.button>
          </Link>
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
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3958.661792603523!2d79.98031507499879!3d7.165039992839606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwMDknNTQuMSJOIDc5wrA1OCc1OC40IkU!5e0!3m2!1sen!2slk!4v1744750559905!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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
              href="https://www.facebook.com/profile.php?id=61574123115109&mibextid=ZbWKwL"
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
      <Navbar/>
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
