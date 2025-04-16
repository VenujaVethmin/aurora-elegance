"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ImageIcon, X, Plus } from "lucide-react";
import Image from "next/image";
import AdminNav from "@/components/AdminNav";
import axiosInstance from "@/lib/axiosInstance";
import useSWR from "swr";
import { toast } from "sonner";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

export default function AdminPanel() {

  const { data : images , error, isLoading, mutate } = useSWR(
    "/cloudinary/gallery",
    fetcher
  );
  const [activeTab, setActiveTab] = useState("gallery");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadData, setUploadData] = useState({
    category: "",
    title: "",
    file: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  const categories = [
    { id: "bridal", name: "Bridal" },
    { id: "hair", name: "Hair" },
    { id: "makeup", name: "Makeup" },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit.");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setUploadData({ ...uploadData, file });
    } else {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      setUploadData({ ...uploadData, file: null });
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("imageFormData", uploadData.file);
      formData.append("category", uploadData.category);
      formData.append("title", uploadData.title);

      const response = await axiosInstance.post("/cloudinary/upload", formData);

      if (response.status === 200) {
        
        toast.success("Image uploaded successfully!");
        mutate(); 
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        setUploadData({ category: "", title: "", file: null });
        setActiveTab("gallery");
        
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(
        `Failed to upload image: ${
          error.response?.data?.error || error.message
        }`
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
     toast("Delete this image?", {
       description: "This action cannot be undone.",
       action: {
         label: "Delete",
         onClick: async () => {
           try {
             const res = await axiosInstance.delete(
               `/cloudinary/deleteGallery/${id}`
             );
             if (res.status === 200) {
               toast.success("Image deleted successfully!");
               mutate(); // Re-fetch gallery data
             } else {
               toast.error("Failed to delete image.");
             }
           } catch (err) {
             toast.error("Something went wrong.");
             console.error(err);
           }
         },
       },
     });
  };

  return (
    <div className="min-h-screen bg-black">
      <AdminNav />
      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-6 py-2 rounded-full transition-all ${
              activeTab === "gallery"
                ? "gold-bg text-black"
                : "gold-border text-white"
            }`}
          >
            <div className="flex items-center space-x-2">
              <ImageIcon size={18} />
              <span>Gallery</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("upload")}
            className={`px-6 py-2 rounded-full transition-all ${
              activeTab === "upload"
                ? "gold-bg text-black"
                : "gold-border text-white"
            }`}
          >
            <div className="flex items-center space-x-2">
              <Upload size={18} />
              <span>Upload</span>
            </div>
          </button>
        </div>

        {/* Content Area */}
        {activeTab === "upload" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold gold-text mb-8">
              Upload New Image
            </h2>
            <form onSubmit={handleUpload} className="space-y-6">
              <div>
                <label className="block text-gold mb-2">Category</label>
                <select
                  value={uploadData.category}
                  onChange={(e) =>
                    setUploadData({ ...uploadData, category: e.target.value })
                  }
                  className="w-full p-3 rounded-lg bg-black/50 border border-gold/20 focus:border-gold focus:outline-none text-white"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gold mb-2">Title</label>
                <input
                  type="text"
                  value={uploadData.title}
                  onChange={(e) =>
                    setUploadData({ ...uploadData, title: e.target.value })
                  }
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
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                    required
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="mx-auto mb-4 text-gold" size={32} />
                    <p className="text-gold/80">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gold/60 mt-2">
                      PNG, JPG, WebP up to 10MB
                    </p>
                  </label>
                </div>
                {previewUrl && (
                  <div className="mt-4">
                    <p className="text-gold mb-2">Preview:</p>
                    <div className="relative w-full max-w-xs aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full gold-bg text-black font-semibold py-3 px-8 rounded-lg disabled:opacity-50"
              >
                {isUploading ? "Uploading..." : "Upload Image"}
              </button>
            </form>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveTab("upload")}
              className="aspect-square rounded-xl border-2 border-dashed border-gold/20 flex flex-col items-center justify-center cursor-pointer hover:border-gold transition-colors"
            >
              <Plus size={40} className="text-gold/40" />
              <p className="mt-2 text-gold/40">Add New Image</p>
            </motion.div>

            {images?.map((image) => (
              <motion.div
                key={image.id}
                layout
                className="group relative aspect-square rounded-xl overflow-hidden"
              >
                <Image
                  src={image.link || "image.link"}
                  alt={image.title || "image"}
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
                  <p className="text-gold/80 text-sm capitalize">
                    {image.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

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