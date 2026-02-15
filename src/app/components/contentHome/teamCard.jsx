//carte cliquable avec icon titre et description et lien

function Card({ icon, title, description, href }) {
  return (
    <a
      href={href}
      className="group block rounded-2xl bg-white p-6
                 ring-1 ring-gray-200 shadow-sm
                 transition-all duration-300
                 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-center space-x-4 mb-4">
        {icon}
        <h3
          className="text-lg font-semibold text-gray-900
                       group-hover:text-blue-600 transition-colors"
        >
          {title}
        </h3>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-gray-600 whitespace-pre-line">
        {description}
      </p>

      <span
        className="mt-6 inline-flex items-center text-sm font-medium text-gray-400
                   group-hover:text-blue-600 transition"
      >
        En savoir plus →
      </span>
    </a>
  );
}

export default Card;
