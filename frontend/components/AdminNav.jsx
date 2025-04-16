import { logOut } from "@/hooks/auth-hooks";
import useSession from "@/hooks/session";
import { motion } from "framer-motion";
import { LogOut, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { user, isLoading } = useSession();

  const admin = {
    name: user?.name,
    role: user?.role,
    avatar: user?.image,
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
   
  ];

  return (
    <motion.nav
      className="sticky top-0 w-full z-50 bg-black/80 backdrop-blur-sm py-4 border-b border-gold/20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo and User Info */}
          <div className="flex items-center space-x-4">
            <Link href="/admin">
              <div className="flex items-center space-x-2">
                {admin.avatar ? (
                  <Image
                    src={admin.avatar}
                    alt={admin.name || "Admin"}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-gold"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full border-2 border-gold bg-gold/20 flex items-center justify-center">
                    <span className="text-gold text-xl font-bold">
                      {admin.name?.charAt(0) || "A"}
                    </span>
                  </div>
                )}
                <div className="hidden sm:block">
                  <h3 className="text-gold font-semibold">
                    {admin.name || "Admin"}
                  </h3>
                  <p className="text-gold/60 text-sm">
                    {admin.role || "Administrator"}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-white hover:text-gold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.a>
            ))}
            {user && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => logOut(router)}
                className="flex items-center space-x-2 text-white/80 hover:text-red-500 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gold"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex flex-col items-center py-4 space-y-4">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-gold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              {user && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => logOut(router)}
                  className="flex items-center space-x-2 text-white/80 hover:text-red-500 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
