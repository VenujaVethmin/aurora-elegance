"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-24">
        <div className="container mx-auto px-4 py-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold gold-text text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get in Touch
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-black-light p-6 rounded-2xl gold-border">
                <h2 className="text-2xl font-semibold gold-text mb-6">
                  Contact Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Phone className="text-gold" size={20} />
                    <a
                      href="tel:+94760436472"
                      className="hover:text-gold-light"
                    >
                      076-0436472
                    </a>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Mail className="text-gold" size={20} />
                    <a
                      href="mailto:prabodyatharushi90@gmail.com"
                      className="hover:text-gold-light break-words"
                    >
                      prabodyatharushi90@gmail.com
                    </a>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="text-gold mt-1" size={20} />
                    <div>
                      <p>233/1, Madikalewatta (7 Land),</p>
                      <p>Yakahatuwa, Horampalla</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="text-gold mt-1" size={20} />
                    <div>
                      <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                      <p>Sunday: 10:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-gold">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-black-light border border-gold/20 focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-gold">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-black-light border border-gold/20 focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block mb-2 text-gold">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-black-light border border-gold/20 focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block mb-2 text-gold">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-black-light border border-gold/20 focus:border-gold focus:outline-none"
                  >
                    <option value="">Select a service</option>
                    <option value="hair">Hair Styling</option>
                    <option value="bridal">Bridal Makeover</option>
                    <option value="beauty">Beauty & Skincare</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-gold">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-3 rounded-lg bg-black-light border border-gold/20 focus:border-gold focus:outline-none"
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="gold-bg text-black font-semibold py-3 px-8 rounded-full w-full flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={18} />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
