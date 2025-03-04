"use client";
import { motion } from "framer-motion";
import { Button, Typography, Container } from "@mui/material";

const Hero = () => {
  return (
    <div className="relative h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white flex flex-col justify-center items-center p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center text-center"
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '2.5rem', md: '4rem' },
            letterSpacing: '1px',
            lineHeight: 1.2,
          }}
        >
          Empowering Innovators 🚀
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            marginTop: '20px',
            fontSize: { xs: '1rem', md: '1.25rem' },
          }}
        >
          Join Vibgyor Solutions and transform your ideas into reality.
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
              backgroundColor: '#0D47A1',
              paddingX: 4,
              paddingY: 2,
              '&:hover': {
                backgroundColor: '#1976D2',
              },
            }}
          >
            Explore Our Programs
          </Button>
        </motion.div>
      </motion.div>

      {/* Optional: Add an abstract background pattern */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/diag-stripes-light.png")',
          opacity: 0.15,
          zIndex: -1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      />
    </div>
  );
};

export default Hero;
