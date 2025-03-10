"use client";
import { motion } from "framer-motion";
import { Button, Typography, Box } from "@mui/material";

const Hero = () => {
  return (
    <div className="relative h-screen flex flex-col justify-center items-center text-white overflow-hidden bg-black">
      {/* Background Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-gray-800 opacity-90"></div>
      
      {/* Glassmorphism Effect Container */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center text-center p-8 rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg"
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2.5rem", md: "4rem" },
            letterSpacing: "1px",
            lineHeight: 1.2,
            textTransform: "uppercase",
            background: "linear-gradient(90deg, #FFD700, #FF8C00)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Vibgyor Solution
        </Typography>

        <Typography
          variant="h6"
          component="p"
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            marginTop: "20px",
            fontSize: { xs: "1rem", md: "1.25rem" },
            maxWidth: "600px",
          }}
        >
          At Vibgyor Solution, we ignite change through next-generation education, empowering individuals with cutting-edge tools and skills.
        </Typography>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10"
        >
          <Button
            href="#services"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#FFD700",
              color: "black",
              fontWeight: "bold",
              paddingX: 4,
              paddingY: 2,
              boxShadow: "0px 4px 10px rgba(255, 215, 0, 0.3)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#FF8C00",
                boxShadow: "0px 6px 15px rgba(255, 140, 0, 0.5)",
              },
            }}
          >
            Explore Our Programs
          </Button>
        </motion.div>
      </motion.div>

      {/* Subtle Background Animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255, 215, 0, 0.1) 10%, transparent 70%)",
          opacity: 0.15,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
};

export default Hero;
