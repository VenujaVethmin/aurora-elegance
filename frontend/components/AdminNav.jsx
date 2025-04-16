import { motion } from 'framer-motion';
import Image from 'next/image';
import { LogOut } from 'lucide-react';

export default function AdminNav() {
  const admin = {
    name: "Tharushi Prabodhya",
    role: "Salon Owner",
    avatar: "/avatar.jpg" // Add your avatar image to public folder
  };

  return (
    <nav className="bg-black/50 backdrop-blur-sm border-b border-gold/20">
      <div className="container mx-auto px-4">
        <div className="h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gold">
              <Image
                src={admin.avatar}
                alt={admin.name}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-gold font-semibold">{admin.name}</h3>
              <p className="text-gold/60 text-sm">{admin.role}</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white/80 hover:text-red-500 transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </motion.button>
        </div>
      </div>
    </nav>
  );
}