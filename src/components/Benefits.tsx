"use client";

const Benefits = () => {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900">Empowerment Unleashed</h1>
        <p className="mt-4 text-lg text-gray-700">
          Path-Finder 2.0 propels students and schools into a realm of innovation and excellence!
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-10">
        {/* School Benefits */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">School Benefits</h2>
          <ul className="text-gray-700 space-y-3">
            <li>📌 <strong>Networking & Collaboration Hub</strong></li>
            <li>🚀 <strong>Innovation Hub</strong></li>
            <li>🏆 <strong>Recognition</strong></li>
            <li>🌟 <strong>Excellence Showcase</strong></li>
          </ul>
        </div>

        {/* Student Benefits */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Student Benefits</h2>
          <ul className="text-gray-700 space-y-3">
            <li>📈 <strong>Profile Enhancement</strong> - Earn recognition and accolades to elevate your academic and professional standing.</li>
            <li>🎓 <strong>Learning from Experts</strong> - Attend workshops, panel discussions, and keynote sessions led by experienced professionals.</li>
            <li>🛠️ <strong>Skill Development</strong> - Participate in hackathons, pitch competitions, or workshops that enhance problem-solving, critical thinking, and communication skills.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
