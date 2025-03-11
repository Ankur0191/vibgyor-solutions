"use client";
import { motion } from "framer-motion";
import { Lightbulb, AttachMoney, Business, Storefront, GroupWork, EmojiObjects } from "@mui/icons-material";
import { Card , Typography, CardActionArea } from "@mui/material";

const services = [
  // { title: "Innovation & Creativity", icon: <Lightbulb fontSize="large" />, desc: "Encouraging groundbreaking ideas and creative thinking." },
  { title: "Pitching Ideas", icon: <Business fontSize="large" />, desc: "Opportunities for entrepreneurs to present ideas and receive support." },
  // { title: "Entrepreneurship", icon: <GroupWork fontSize="large" />, desc: "A platform to learn, grow, and network in the startup ecosystem." },
  { title: "VC Connect", icon: <AttachMoney fontSize="large" />, desc: "Direct feedback from successful venture capitalists." },
  { title: "Funding Opportunities", icon: <Storefront fontSize="large" />, desc: "Connecting participants with funding sources and grants." },
  { title: "Expo", icon: <EmojiObjects fontSize="large" />, desc: "Showcasing products and innovations to a wider audience." },
];

const Services = () => {
  return (
    <section id="services" className="py-40 bg-gray-50 relative">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-12">Our Services</h2>
      
      {/* Background element for parallax effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-20"
        animate={{ y: [-50, 50, -50] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      ></motion.div>

      <div className="mt-10 flex flex-wrap justify-center gap-8 px-6 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="flex justify-center"
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 20,
              delay: index * 0.2,
            }}
          >
            <Card
              sx={{
                width: 300,
                borderRadius: 3,
                boxShadow: 3,
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-15px) scale(1.05)",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardActionArea>
                <motion.div
                  className="p-6"
                  whileHover={{ rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex justify-center items-center">
                    <div className="text-blue-600">{service.icon}</div>
                  </div>
                  <Typography variant="h6" component="div" className="mt-4 font-semibold">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className="mt-2">
                    {service.desc}
                  </Typography>
                </motion.div>
              </CardActionArea>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
