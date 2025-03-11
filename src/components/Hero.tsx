"use client";
import { motion } from "framer-motion";
import { Button, Typography } from "@mui/material";

const Hero = () => {
  return (
    <div className="relative h-screen flex flex-col justify-center items-center text-white overflow-hidden bg-gray-900">
      {/* Background Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 opacity-95"></div>

      {/* Glassmorphism Effect Container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center text-center p-10 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg"
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2.8rem", md: "4rem" },
            letterSpacing: "1px",
            lineHeight: 1.2,
            textTransform: "uppercase",
            background: "linear-gradient(90deg, #4F46E5, #14B8A6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Vibgyor Solutions
        </Typography>

        <Typography
          variant="h6"
          component="p"
          sx={{
            color: "rgba(255, 255, 255, 0.85)",
            marginTop: "18px",
            fontSize: { xs: "1rem", md: "1.2rem" },
            maxWidth: "600px",
          }}
        >
          Empowering innovation through cutting-edge technology and future-driven solutions.
        </Typography>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-10"
        >
          <Button
            href="#services"
            variant="contained"
            size="large"
            sx={{
              background: "linear-gradient(90deg, #4F46E5, #14B8A6)",
              color: "white",
              fontWeight: "bold",
              paddingX: 5,
              paddingY: 2,
              boxShadow: "0px 4px 15px rgba(79, 70, 229, 0.3)",
              borderRadius: "50px",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                background: "linear-gradient(90deg, #4338CA, #0D9488)",
                boxShadow: "0px 6px 20px rgba(20, 184, 166, 0.5)",
              },
            }}
          >
            Get Started
          </Button>
        </motion.div>
      </motion.div>

      {/* Subtle Background Animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(79, 70, 229, 0.15) 10%, transparent 80%)",
          opacity: 0.2,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
};

export default Hero;
