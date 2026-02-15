import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaUserShield,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Counter from "./sectioncCounter";

const stats = [
  { label: "Administrateur", value: 1, icon: FaUserShield },
  { label: "Enseignants", value: 85, icon: FaChalkboardTeacher },
  { label: "Étudiants", value: 1200, icon: FaUserGraduate },
  { label: "Programmes", value: 25, icon: FaBook },
];

export default function CounterSection() {
  const sectionRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  return (
    <section id="main-state" ref={sectionRef} className="py-20 bg-blue-700 ">
      <div className="grid grid-cols-1 md:grid-cols-4 items-center md:px-11 ">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex flex-col gap-10 items-center justify-center`}
          >
            <stat.icon className="text-8xl text-white" />

            <Counter value={stat.value} label={stat.label} start={start} />
          </div>
        ))}
      </div>
    </section>
  );
}
