"use client";
import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/animations";

const Amenities = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn("up", "tween", 0.2, 1)}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          <h2 className="text-4xl font-bold">Amenities</h2>
          <ul className="mt-4 text-lg">
            <li>Access to Swimming Pool</li>
            <li>Complementary Breakfast</li>
            <li>Stunning Views</li>
            <li>Coffee Shop and Club House</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Amenities;
