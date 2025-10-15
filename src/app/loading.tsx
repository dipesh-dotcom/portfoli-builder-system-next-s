"use client";

import { motion } from "framer-motion";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <motion.div
        className="w-16 h-16 border-4 border-t-primary border-gray-300 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
}
