import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  LayoutDashboard,
  BookOpen,
  FolderKanban,
  FlaskConical,
  MessageSquare,
  BarChart3,
  Settings,
  User,
  Users,
  Shield,
  Database,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  MonitorCog,
} from "lucide-react";
import FooterHome from "../../../components/contentHome/footerHome";
import HeaderHome from "../../../components/contentHome/headerHome";

function HeroBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 shadow-sm backdrop-blur">
      {children}
    </span>
  );
}

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
        {description}
      </p>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, to }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100/60">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 opacity-0 transition group-hover:opacity-100" />

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200/50">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="mt-6 text-xl font-bold text-slate-800">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>

      <Link
        to={to}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:gap-3 hover:text-blue-700"
      >
        Accéder à la fonctionnalité
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function QuickLink({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
    >
      {children}
    </Link>
  );
}

function HighlightItem({ children }) {
  return (
    <li className="flex items-start gap-3 text-sm leading-6 text-slate-600">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
      <span>{children}</span>
    </li>
  );
}

function RoleSpacePage({
  badge,
  title,
  subtitle,
  overview,
  highlights,
  features,
  dashboardLink,
  featureLink,
  profileLink,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const pages = ["/espace-etudiant", "/espace-enseignant", "/espace-admin"];

  const currentIndex = pages.indexOf(location.pathname);

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % pages.length;
    navigate(pages[nextIndex]);
  };

  const goPrev = () => {
    const prevIndex = (currentIndex - 1 + pages.length) % pages.length;
    navigate(pages[prevIndex]);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">
      <section className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 text-white">
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <HeroBadge>{badge}</HeroBadge>

              <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight md:text-5xl xl:text-6xl">
                {title}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-blue-50 md:text-lg">
                {subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to={dashboardLink}
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-blue-600 shadow-xl transition hover:-translate-y-0.5 hover:bg-blue-50"
                >
                  Accéder au tableau de bord
                </Link>

                <Link
                  to="/fonctionnalite"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/15 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/25"
                >
                  Explorer les fonctionnalités
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/20 bg-white/15 p-6 shadow-2xl backdrop-blur-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-50">
                Vue d’ensemble
              </p>
              <p className="mt-4 text-sm leading-7 text-white md:text-base">
                {overview}
              </p>

              <ul className="mt-6 space-y-4">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BOUTONS NAVIGATION */}
      <button
        onClick={goPrev}
        className="fixed left-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:bg-blue-50"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={goNext}
        className="fixed right-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:bg-blue-50"
      >
        <ChevronRight />
      </button>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <SectionTitle
          title="Un environnement numérique structuré, intuitif et orienté performance"
          description={overview}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-base leading-8 text-slate-600">{subtitle}</p>
          </div>

          <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800">
              Ce que cet espace vous permet de faire
            </h3>
            <ul className="mt-6 space-y-4">
              {highlights.map((item) => (
                <HighlightItem key={item}>{item}</HighlightItem>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-blue-100 bg-blue-50/50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
          <SectionTitle
            title="Explorez les modules disponibles dans cet espace"
            description="Chaque fonctionnalité a été pensée pour offrir une expérience claire, efficace et cohérente, tout en facilitant l’accès rapide aux services essentiels de la plateforme."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 p-8 text-white md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-50">
                Navigation rapide
              </p>
              <h3 className="mt-4 text-3xl font-bold tracking-tight">
                Accédez directement aux pages importantes
              </h3>
              <p className="mt-4 text-sm leading-7 text-blue-50 md:text-base">
                Retrouvez les liens essentiels vers le tableau de bord, les
                outils fonctionnels, les paramètres personnels et l’espace de
                profil pour une navigation fluide et professionnelle.
              </p>
            </div>

            <div className="p-8 md:p-10">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <QuickLink to={dashboardLink}>Tableau de bord</QuickLink>
                <QuickLink to={featureLink}>Fonction principale</QuickLink>
                <QuickLink to={profileLink}>Profil</QuickLink>
                <QuickLink to={profileLink.replace("/profil", "/parametres")}>
                  Paramètres
                </QuickLink>

                {features.map((feature) => (
                  <QuickLink key={feature.title} to={feature.to}>
                    {feature.title}
                  </QuickLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function PageEspaceEnseignant() {
  const features = [
    {
      icon: LayoutDashboard,
      title: "Tableau de bord",
      description:
        "Visualisez rapidement l’activité pédagogique, les cours publiés, les travaux pratiques disponibles et les indicateurs essentiels liés à votre espace d’enseignement.",
      to: "/enseignant/dashboard",
    },
    {
      icon: BookOpen,
      title: "Mes cours",
      description:
        "Organisez vos contenus académiques, structurez vos ressources pédagogiques et mettez à disposition des supports adaptés aux besoins de vos étudiants.",
      to: "/enseignant/mes-cours",
    },
    {
      icon: FlaskConical,
      title: "Mes travaux pratiques",
      description:
        "Créez et gérez des travaux pratiques modernes, interactifs et orientés simulation afin d’offrir une expérience d’apprentissage concrète et appliquée.",
      to: "/enseignant/mes-travaux",
    },
    {
      icon: ClipboardList,
      title: "TP des étudiants",
      description:
        "Suivez les productions des étudiants, consultez leurs réalisations, analysez l’avancement des activités et assurez un encadrement pédagogique continu.",
      to: "/enseignant/tps-etudiant",
    },
    {
      icon: MessageSquare,
      title: "Discussion",
      description:
        "Échangez avec vos étudiants, accompagnez les apprentissages, répondez aux questions et favorisez une communication académique fluide.",
      to: "/enseignant/discussion",
    },
    {
      icon: BarChart3,
      title: "Statistiques",
      description:
        "Analysez la progression, la participation et les performances générales afin d’améliorer vos stratégies pédagogiques et votre suivi global.",
      to: "/enseignant/statistique",
    },
    {
      icon: Settings,
      title: "Paramètres",
      description:
        "Personnalisez votre espace enseignant, ajustez vos préférences d’utilisation et gérez les options liées à votre compte et à votre sécurité.",
      to: "/enseignant/parametres",
    },
    {
      icon: User,
      title: "Profil",
      description:
        "Consultez et mettez à jour vos informations professionnelles, académiques et personnelles dans un espace dédié et sécurisé.",
      to: "/enseignant/profil",
    },
  ];

  return (
    <div>
      <HeaderHome />
      <RoleSpacePage
        badge="Espace enseignant"
        title="Pilotez vos activités pédagogiques avec rigueur, fluidité et efficacité"
        subtitle="L’espace enseignant de ESTD-LabTechNet a été conçu pour offrir un environnement de travail moderne, structuré et performant. Il permet de centraliser la gestion des cours, la création des travaux pratiques, le suivi des étudiants et l’analyse des performances pédagogiques dans une interface cohérente et intuitive."
        overview="Cet espace accompagne les enseignants dans l’organisation des contenus académiques, la supervision des activités pratiques et l’encadrement des étudiants. Il contribue à renforcer la qualité du suivi pédagogique tout en simplifiant les tâches quotidiennes grâce à des outils numériques adaptés aux exigences de l’enseignement supérieur."
        highlights={[
          "Centraliser les cours, travaux pratiques et ressources pédagogiques dans une interface unique.",
          "Suivre l’évolution des étudiants et améliorer la qualité de l’accompagnement académique.",
          "Accéder rapidement aux modules essentiels pour gérer l’enseignement de manière moderne et professionnelle.",
        ]}
        features={features}
        dashboardLink="/enseignant/dashboard"
        featureLink="/enseignant/mes-travaux"
        profileLink="/enseignant/profil"
      />
      <FooterHome />
    </div>
  );
}

export function PageEspaceEtudiant() {
  const features = [
    {
      icon: LayoutDashboard,
      title: "Tableau de bord",
      description:
        "Retrouvez en un coup d’œil vos activités en cours, les notifications importantes, vos travaux récents et les accès rapides vers vos modules essentiels.",
      to: "/etudiant/dashboard",
    },
    {
      icon: BookOpen,
      title: "Mes cours",
      description:
        "Accédez aux contenus pédagogiques, supports académiques, documents d’apprentissage et ressources mises à votre disposition par les enseignants.",
      to: "/etudiant/mes-cours",
    },
    {
      icon: FolderKanban,
      title: "Projets et devoirs",
      description:
        "Consultez les projets académiques, les travaux demandés et les devoirs à réaliser, tout en gardant une vision claire sur vos échéances.",
      to: "/etudiant/projets-devoirs",
    },
    {
      icon: FlaskConical,
      title: "Travaux pratiques",
      description:
        "Réalisez vos activités pratiques dans un environnement numérique interactif conçu pour l’expérimentation, la simulation et l’apprentissage appliqué.",
      to: "/etudiant/tps",
    },
    {
      icon: MessageSquare,
      title: "Discussion",
      description:
        "Participez aux échanges pédagogiques, posez vos questions, collaborez avec vos camarades et interagissez avec vos enseignants.",
      to: "/etudiant/discussion",
    },
    {
      icon: BarChart3,
      title: "Statistiques",
      description:
        "Suivez votre progression, visualisez vos performances et identifiez vos axes d’amélioration dans votre parcours d’apprentissage.",
      to: "/etudiant/statistique",
    },
    {
      icon: Settings,
      title: "Paramètres",
      description:
        "Personnalisez votre expérience, ajustez vos préférences et sécurisez votre compte grâce à une gestion simple et accessible.",
      to: "/etudiant/parametres",
    },
    {
      icon: User,
      title: "Profil",
      description:
        "Consultez et mettez à jour vos informations personnelles, académiques et de contact au sein de votre espace étudiant.",
      to: "/etudiant/profil",
    },
  ];

  return (
    <div>
      <HeaderHome />
      <RoleSpacePage
        badge="Espace étudiant"
        title="Apprenez, pratiquez et progressez dans un environnement numérique moderne"
        subtitle="L’espace étudiant de ESTD-LabTechNet est pensé pour offrir une expérience d’apprentissage complète, immersive et structurée. Il rassemble les cours, les projets, les travaux pratiques et les outils de communication dans une interface conçue pour favoriser l’autonomie, l’engagement et la réussite académique."
        overview="Grâce à cet espace, l’étudiant bénéficie d’un accès simplifié aux ressources pédagogiques, aux exercices pratiques et au suivi de sa progression. La plateforme encourage l’apprentissage actif, la collaboration et l’acquisition de compétences techniques à travers des modules clairs et accessibles."
        highlights={[
          "Accéder rapidement aux cours, projets, travaux pratiques et espaces de discussion.",
          "Développer l’autonomie grâce à un environnement structuré orienté apprentissage actif.",
          "Suivre ses performances et progresser dans un cadre académique moderne et interactif.",
        ]}
        //Lien vers les autres  pages
        features={features}
        dashboardLink="/etudiant/dashboard"
        featureLink="/etudiant/tps"
        profileLink="/etudiant/profil"
      />
      <FooterHome />
    </div>
  );
}

export function PageEspaceAdmin() {
  const features = [
    {
      icon: LayoutDashboard,
      title: "Tableau de bord administrateur",
      description:
        "Accédez à une vue consolidée de l’activité de la plateforme, des usages, des indicateurs clés et des opérations prioritaires de supervision.",
      to: "/admin/dashboard",
    },
    {
      icon: Users,
      title: "Gestion des utilisateurs",
      description:
        "Administrez les comptes étudiants et enseignants, gérez les accès, contrôlez les statuts et garantissez une organisation fluide des utilisateurs.",
      to: "/admin/utilisateurs",
    },
    {
      icon: GraduationCap,
      title: "Gestion académique",
      description:
        "Supervisez l’organisation générale des ressources pédagogiques, la cohérence des espaces et la qualité des contenus mis en circulation.",
      to: "/admin/academique",
    },
    {
      icon: Shield,
      title: "Sécurité et contrôle",
      description:
        "Renforcez la sécurité de la plateforme, gérez les règles d’accès et veillez à la fiabilité du système dans un cadre sécurisé.",
      to: "/admin/securite",
    },
    {
      icon: Database,
      title: "Gestion des données",
      description:
        "Supervisez les données critiques de la plateforme, leur organisation, leur disponibilité et leur intégrité dans le temps.",
      to: "/admin/donnees",
    },
    {
      icon: BarChart3,
      title: "Statistiques globales",
      description:
        "Analysez l’activité générale de la plateforme, la participation des utilisateurs et les tendances d’utilisation pour appuyer la prise de décision.",
      to: "/admin/statistiques",
    },
    {
      icon: MonitorCog,
      title: "Paramètres système",
      description:
        "Configurez les paramètres globaux de la plateforme, les préférences techniques et les options de fonctionnement administratif.",
      to: "/admin/parametres",
    },
    {
      icon: User,
      title: "Profil administrateur",
      description:
        "Gérez vos informations personnelles et professionnelles dans un espace sécurisé dédié à l’administration du système.",
      to: "/admin/profil",
    },
  ];

  return (
    <div>
      <HeaderHome />
      <RoleSpacePage
        badge="Espace administrateur"
        title="Supervisez, sécurisez et pilotez la plateforme avec une vision globale"
        subtitle="L’espace administrateur de ESTD-LabTechNet constitue le centre de gouvernance de la plateforme. Il permet d’assurer le suivi global des utilisateurs, la supervision académique, la sécurité du système et l’analyse stratégique de l’activité pour garantir un fonctionnement fiable, cohérent et performant."
        overview="Pensé pour répondre aux exigences de pilotage institutionnel, cet espace offre les outils nécessaires à l’administration complète de la plateforme. Il facilite la gestion centralisée, le contrôle des accès, l’observation des indicateurs d’usage et la prise de décision éclairée dans un environnement moderne et structuré."
        highlights={[
          "Superviser les comptes, les accès et l’activité générale de la plateforme à partir d’un espace centralisé.",
          "Garantir la sécurité, la cohérence et la disponibilité des services numériques proposés aux utilisateurs.",
          "Disposer d’une vision stratégique grâce à des indicateurs globaux et des outils de pilotage fiables.",
        ]}
        features={features}
        dashboardLink="/admin/dashboard"
        featureLink="/admin/utilisateurs"
        profileLink="/admin/profil"
      />
      <FooterHome />
    </div>
  );
}

export default PageEspaceEnseignant;
