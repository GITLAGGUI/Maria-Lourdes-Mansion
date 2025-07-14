"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/animations";

const poolImages = [
  { src: "/assets/view6.jpg", alt: "Pool View 1" },
  { src: "/assets/pic3.jpg", alt: "Pool View 2" },
  { src: "/assets/view5.jpg", alt: "Pool View 3" },
  { src: "/assets/view4.jpg", alt: "Pool View 4" },
];

const SwimmingPool = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn("up", "tween", 0.2, 1)}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          <h2 className="text-4xl font-bold">Swimming Pool</h2>
          <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2">
            {poolImages.map((image, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "tween", 0.2 * (index + 1), 1)}
                initial="hidden"
                animate="show"
                className="overflow-hidden rounded-lg"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </motion.div>
            ))}
          </div>
          <motion.div
            variants={fadeIn("up", "tween", 0.2, 1)}
            initial="hidden"
            animate="show"
            className="mt-8"
          >
            <Image
              src="/assets/rules_pool.jpg"
              alt="Pool Rules"
              width={600}
              height={400}
              className="mx-auto"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SwimmingPool;