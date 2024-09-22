import React from "react";
import { motion } from "framer-motion";

export default function Drawer({ isOpen, onClose, children }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}
      {/* Drawer Content */}
      <motion.div
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white z-50 overflow-auto darkBlueGradient`}
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="p-4">{children}</div>
      </motion.div>
    </>
  );
}
