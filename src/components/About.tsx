"use client";

import { Container, Typography, Box, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <Container maxWidth="lg" className="py-16">
      {/* Hero Section */}
      <Box className="text-center">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h3" className="font-bold text-blue-600">
            VIBGYOR SOLUTION
          </Typography>
          <Typography variant="h5" className="text-gray-700 mt-3">
            Empowering Education with Innovation & Excellence
          </Typography>
        </motion.div>
      </Box>

      {/* Content Section */}
      <Box className="mt-10 flex flex-col md:flex-row items-center gap-8">
        {/* Text Content */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Typography variant="body1" className="text-lg text-gray-700">
            At <span className="text-blue-600 font-semibold">Vibgyor Solution</span>, we are passionate pioneers igniting change 
            through next-generation education. Founded in 2015 by <b>Deepali & Deepak Garg</b>, we believe in celebrating the unique 
            spark within every individual. Our approach is personalized, ensuring impactful learning experiences tailored to 
            specific needs.
          </Typography>
          <Typography variant="body1" className="text-lg text-gray-700 mt-4">
            As a <b>one-stop education solutions provider</b>, we empower schools and individuals with cutting-edge educational 
            tools and programs focused on 21st-century skills. Our legacy includes collaborations with leading corporations 
            and institutions, reshaping the educational landscape with innovation and expertise.
          </Typography>
          <Typography variant="body1" className="text-lg text-gray-700 mt-4">
            Driven by a vibrant spirit and unwavering commitment, Vibgyor Solution continues to illuminate new pathways for 
            future generations.
          </Typography>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Image
            src="/about-image.jpg" // Add an actual image in your public folder
            alt="Vibgyor Solution Team"
            width={500}
            height={350}
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </Box>

      {/* Call to Action */}
      <Box className="text-center mt-12">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <Link href="/contact">
            <Button variant="contained" color="primary" size="large" className="px-6 py-2">
              Get in Touch
            </Button>
          </Link>
        </motion.div>
      </Box>
    </Container>
  );
};

export default AboutPage;
