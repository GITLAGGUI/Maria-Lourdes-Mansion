"use client";
import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/animations";

const Contact = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn("up", "tween", 0.2, 1)}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          <h2 className="text-4xl font-bold">Contact Us</h2>
          <p className="mt-4 text-lg">
            For inquiries and reservations, please contact us at:
          </p>
          <ul className="mt-4 text-lg">
            <li>Phone: 09176317865</li>
            <li>Email: marialourdesmansion@gmail.com</li>
            <li>
              Facebook:{" "}
              <a
                href="https://www.facebook.com/share/16VJD4pSxn/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Maria Lourdes Mansion
              </a>
            </li>
            <li>
              Location: Km. 424 Santiago-Tuguegarao Road, Naganacan, Santa
              Maria, Isabela, 3330 Philippines
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;