"use client";

const mentors = [
  {
    name: "Ashish Singla",
    title: "Virologist and Immunologist",
    details: "Postdoctoral Researcher at UC Davis, CA, USA || Virology, Immunology and Cancer. Indian Institute of Science Education and Research, Bhopal.",
  },
  {
    name: "Garima Aggarwal",
    title: "Research Scientist, USA",
    details: "Meticulous Process Chemist and Research Scientist with over 6 years of experience in FDA regulated CGMP production and Research and Development (R&D) of new API (Active Pharmaceutical Ingredient), Intermediates and impurities.",
  },
  {
    name: "Pulkit Khurana",
    title: "Ex-Google (Alphabet) Employee",
    details: "Dedicated IT professional with over 15 years of experience and well-established digital business consultant.",
  },
  {
    name: "Sarv Daman Grover",
    title: "Senior Developer (Wipro, HP, Sapient, DMI, Global Logic, Hitachi)",
    details: "12+ years of experience specializing in JavaScript full-stack development, UI design, and technical leadership. Proficient in ES6, Meteor, Node.js, AngularJS, React.js, React Native, Gulp, and Python.",
  },
  {
    name: "Bodhan Bathla",
    title: "Software Engineer, Facebook",
    details: "Artificial Intelligence Expert, Facebook. California, USA.",
  },
];

const Mentors = () => {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900">Path-Finder 2.0 Mentors & Guest Lecturers</h1>
        <p className="mt-4 text-lg text-gray-700">Meet our esteemed mentors and guest lecturers who will guide you on your journey to success.</p>
      </div>

      <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-10">
        {mentors.map((mentor, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-blue-600">{mentor.name}</h2>
            <p className="text-gray-700 font-medium mt-2">{mentor.title}</p>
            <p className="text-gray-600 mt-3">{mentor.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Mentors;
