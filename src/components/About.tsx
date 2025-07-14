"use client";
import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/animations";

const About = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn("up", "tween", 0.2, 1)}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          <h2 className="text-4xl font-bold">About Maria Lourdes Mansion</h2>
          <p className="mt-4 text-lg">
            Maria Lourdes Mansion is a serene getaway located at Km. 424
            Santiago-Tuguegarao Road, Naganacan, Santa Maria, Isabela. We offer
            a range of accommodations, including Family Rooms with a view,
            Suite rooms, and Dormitory rooms. Our mansion is also open for
            events like weddings, birthdays, reunions, and Christmas parties.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
