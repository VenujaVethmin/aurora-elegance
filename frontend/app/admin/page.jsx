"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, ImageIcon, LogOut, X, Plus } from 'lucide-react';
import Image from 'next/image';
import AdminNav from '@/components/AdminNav';


export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('gallery');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadData, setUploadData] = useState({
    category: '',
    title: '',
    file: null
  });

  const categories = [
    { id: "bridal", name: "Bridal" },
    { id: "hair", name: "Hair" },
    { id: "makeup", name: "Makeup" }
  ];

  // Dummy images data
  const [images] = useState([
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800",
      alt: "Hair Styling",
      category: "hair"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800",
      alt: "Beauty Treatment",
      category: "makeup"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1595497803262-c4dbe1d58d08?q=80&w=800",
      alt: "Bridal Makeup",
      category: "bridal"
    }
  ]);

  const handleUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      alert('Image uploaded successfully! (Demo)');
      setUploadData({ category: '', title: '', file: null });
      setActiveTab('gallery');
    }, 2000);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this image?')) {
      alert(`Delete image ${id} (Demo only)`);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <AdminNav />
      
      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-6 py-2 rounded-full transition-all ${
              activeTab === 'gallery' ? 'gold-bg text-black' : 'gold-border text-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              <ImageIcon size={18} />
              <span>Gallery</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-2 rounded-full transition-all ${
              activeTab === 'upload' ? 'gold-bg text-black' : 'gold-border text-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Upload size={18} />
              <span>Upload</span>
            </div>
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'upload' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold gold-text mb-8">Upload New Image</h2>
            <form onSubmit={handleUpload} className="space-y-6">
              <div>
                <label className="block text-gold mb-2">Category</label>
                <select
                  value={uploadData.category}
                  onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                  className="w-full p-3 rounded-lg bg-black/50 border border-gold/20 focus:border-gold focus:outline-none text-white"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gold mb-2">Title</label>
                <input
                  type="text"
                  value={uploadData.title}
                  onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                  className="w-full p-3 rounded-lg bg-black/50 border border-gold/20 focus:border-gold focus:outline-none text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-gold mb-2">Image</label>
                <div className="border-2 border-dashed border-gold/20 rounded-lg p-8 text-center hover:border-gold transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setUploadData({ ...uploadData, file: e.target.files[0] })}
                    className="hidden"
                    id="image-upload"
                    required
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="mx-auto mb-4 text-gold" size={32} />
                    <p className="text-gold/80">Click to upload or drag and drop</p>
                    <p className="text-sm text-gold/60 mt-2">PNG, JPG, WebP up to 10MB</p>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full gold-bg text-black font-semibold py-3 px-8 rounded-lg disabled:opacity-50"
              >
                {isUploading ? 'Uploading...' : 'Upload Image'}
              </button>
            </form>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add New Image Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveTab('upload')}
              className="aspect-square rounded-xl border-2 border-dashed border-gold/20 flex flex-col items-center justify-center cursor-pointer hover:border-gold transition-colors"
            >
              <Plus size={40} className="text-gold/40" />
              <p className="mt-2 text-gold/40">Add New Image</p>
            </motion.div>

            {/* Image Grid */}
            {images.map((image) => (
              <motion.div
                key={image.id}
                layout
                className="group relative aspect-square rounded-xl overflow-hidden"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X size={20} className="text-white" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(image)}
                    className="p-2 bg-gold rounded-full hover:bg-gold/80 transition-colors"
                  >
                    <ImageIcon size={20} className="text-black" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-medium">{image.alt}</p>
                  <p className="text-gold/80 text-sm capitalize">{image.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Image Preview Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 p-4 flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              <motion.button
                className="absolute top-6 right-6 text-white/80 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={32} />
              </motion.button>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-5xl aspect-[3/2] rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  quality={95}
                  sizes="90vw"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}