import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

// Header et Footer de la page principale
import FooterHome from "../../../components/contentHome/footerHome";
import HeaderHome from "../../../components/contentHome/headerHome";

// Icônes utilisées dans la page
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

// Données contenant les services (titre, description, images, routes...)
import { services } from "./servicesFonctionnalite";

/* ------------------------------------------------ */
/* Badge affiché dans le hero (en haut de la page) */
/* ------------------------------------------------ */
function HeroBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-blue-600 shadow-sm backdrop-blur">
      {children}
    </span>
  );
}

/* ------------------------------------------------ */
/* Bouton de navigation dans la sidebar (service) */
/* ------------------------------------------------ */
function SideTab({ active, onClick, icon: Icon, label, index }) {
  return (
    <button
      type="button"
      onClick={onClick} // change le service actif
      className={`group flex w-full items-start gap-3 rounded-2xl border px-4 py-4 text-left transition ${
        active
          ? "border-blue-200 bg-white text-blue-700 shadow-sm" // style actif
          : "border-transparent bg-transparent text-slate-600 hover:border-blue-100 hover:bg-white hover:text-blue-700" // style normal
      }`}
    >
      {/* Icône du service */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          active ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>

      {/* Nom du service */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Service {index + 1}
        </p>
        <p className="mt-1 text-sm font-semibold">{label}</p>
      </div>

      {/* Flèche de navigation */}
      <ChevronRight
        className={`ml-auto h-5 w-5 shrink-0 transition ${
          active
            ? "translate-x-1 text-blue-600"
            : "text-slate-400 group-hover:text-blue-600"
        }`}
      />
    </button>
  );
}

/* ------------------------------------------------ */
/* Composant pour afficher une liste (objectifs etc) */
/* ------------------------------------------------ */
function ContentList({ title, items }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Titre de la liste */}
      <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
        {title}
      </h3>

      {/* Liste des éléments */}
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm leading-6 text-slate-700"
          >
            {/* Icône check */}
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------ */
/* Liste des étapes pour utiliser un service */
/* ------------------------------------------------ */
function StepList({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={item}
          className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
        >
          {/* Numéro de l'étape */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            {index + 1}
          </div>

          {/* Texte de l'étape */}
          <p className="text-sm leading-6 text-slate-700">{item}</p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------ */
/* Page principale des fonctionnalités */
/* ------------------------------------------------ */
export default function FonctionnaliteSite() {
  // Service actif affiché dans la page
  const [activeId, setActiveId] = useState(services[0].id);

  // Recherche du service correspondant
  const activeService = useMemo(
    () => services.find((service) => service.id === activeId) || services[0],
    [activeId],
  );

  // Icône du service actif
  const ActiveIcon = activeService.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">
      {/* Header du site */}
      <HeaderHome />

      {/* Container principal */}
      <div className="mx-auto w-full px-4 pb-16 pt-6 md:px-6 lg:px-8">
        {/* ---------------- HERO SECTION ---------------- */}
        <section className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 px-6 py-14 text-white shadow-xl shadow-blue-100 md:px-10 lg:px-12 lg:py-16">
          {/* quadrillage décoratif */}
          <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:42px_42px]" />

          <div className="relative max-w-5xl">
            <HeroBadge>Services & fonctionnalités</HeroBadge>

            <h1 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
              Les services principaux de ESTD-LabTechNet
            </h1>

            <p className="mt-6 text-base leading-8 text-blue-50 md:text-lg">
              Cette page présente de manière structurée les services essentiels
              proposés par la plateforme.
            </p>
          </div>
        </section>

        {/* ---------------- LAYOUT SIDEBAR + CONTENU ---------------- */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[340px_minmax(0,1fr)]">
          {/* ---------- SIDEBAR ---------- */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-4 shadow-sm">
              {/* titre sidebar */}
              <div className="px-3 pb-3 pt-2">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">
                  Table des matières
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-800">
                  Parcourir les services
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Cliquez sur un service pour afficher sa description.
                </p>
              </div>

              {/* liste des services */}
              <div className="space-y-2">
                {services.map((service, index) => (
                  <SideTab
                    key={service.id}
                    index={index}
                    icon={service.icon}
                    label={service.navLabel}
                    active={service.id === activeId}
                    onClick={() => setActiveId(service.id)}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* ---------- CONTENU PRINCIPAL ---------- */}
          <main className="min-w-0">
            <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              {/* Header du service actif */}
              <div
                className={`bg-gradient-to-r ${activeService.accent} px-6 py-8 text-white md:px-8`}
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  {/* description */}
                  <div className="max-w-3xl">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur">
                      <ActiveIcon className="h-7 w-7" />
                    </div>

                    <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-blue-50">
                      Service actif
                    </p>

                    <h2 className="mt-2 p-2 text-3xl font-bold tracking-tight md:text-4xl">
                      {activeService.title}
                    </h2>

                    <p className="mt-4 text-base leading-8 text-blue-50 md:text-lg">
                      {activeService.summary}
                    </p>
                  </div>

                  {/* bouton accès direct */}
                  <Link
                    to={activeService.route}
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-blue-600 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
                  >
                    {activeService.routeLabel}
                  </Link>
                </div>
              </div>

              {/* contenu du service */}
              <div className="grid gap-8 p-6 md:p-8 xl:grid-cols-[1.05fr_0.95fr]">
                {/* images + objectifs */}
                <div>
                  {/* images */}
                  <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50">
                    <div className="grid gap-0 md:grid-cols-2">
                      <img
                        src={activeService.image}
                        alt={activeService.title}
                        className="h-64 w-full object-cover md:h-full"
                      />
                      <img
                        src={activeService.secondaryImage}
                        alt={activeService.title}
                        className="h-64 w-full object-cover md:h-full"
                      />
                    </div>
                  </div>

                  {/* listes */}
                  <div className="mt-8 grid gap-6 xl:grid-cols-2">
                    <ContentList
                      title="Objectifs pédagogiques"
                      items={activeService.purpose}
                    />

                    <ContentList
                      title="Fonctionnalités clés"
                      items={activeService.features}
                    />
                  </div>
                </div>

                {/* utilisation + bénéfices */}
                <div className="space-y-6">
                  {/* étapes utilisation */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                      Comment utiliser ce service ?
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      Suivez ces étapes pour utiliser le service.
                    </p>

                    <div className="mt-6">
                      <StepList items={activeService.usage} />
                    </div>
                  </div>

                  {/* bénéfices */}
                  <ContentList
                    title="Bénéfices"
                    items={activeService.benefits}
                  />

                  {/* bouton accès direct */}
                  <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
                    <h3 className="text-lg font-bold text-slate-800">
                      Accès direct au service
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      Ouvrir directement l’espace du service.
                    </p>

                    <Link
                      to={activeService.route}
                      className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
                    >
                      {activeService.routeLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <h3 className="text-lg font-bold text-slate-800 pt-4">
                      Découvrir l'espace etudiant
                    </h3>

                    <Link
                      to="/espace-etudiant"
                      className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
                    >
                      {"Accès à l'espace utilisateur"}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Footer */}
      <FooterHome />
    </div>
  );
}
