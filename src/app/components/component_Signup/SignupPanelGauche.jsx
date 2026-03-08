const SignupPanel = () => {
  return (
    <aside className="hidden lg:flex flex-1 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_55%)]" />

      <div className="relative z-10 h-full w-full flex flex-col justify-between">
        <div className="pt-14 px-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-white/90 backdrop-blur">
            <span className="text-sm font-semibold">Espace privé</span>
            <span className="text-sm text-white/80">•</span>
            <span className="text-sm text-white/80">Accès sécurisé</span>
          </div>

          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-white">
            EST-D LabTechNet
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-white/90 max-w-xl">
            Votre espace étudiant pour créer un profil, accéder aux ressources,
            suivre vos activités et collaborer en toute confidentialité.
          </p>
        </div>

        <div className="px-14 pb-10">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur flex justify-center">
            <img
              src="/images/imgLogin.png"
              alt="Espace privé étudiant"
              className="h-90 w-[120%] mx-auto object-cover object-center opacity-90 -mt-6"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SignupPanel;
