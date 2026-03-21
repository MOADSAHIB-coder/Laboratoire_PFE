import Header from "../components/header";
import SideBarAdmin from "../components/sideBarAdmin";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCog,
  ShieldHalf,
  LogIn,
  Eye,
  MessageSquareCodeIcon,
  ShieldCheck,
  ServerCog,
  HardDrive,
  RotateCcw,
  Settings2,
  UserPlus,
  IdCard,
} from "lucide-react";

const adminMenu = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    link: "/admin",
  },

  {
    label: "Gestion utilisateurs",
    icon: Users,
    children: [
      {
        label: "Étudiants",
        icon: GraduationCap,
        link: "/admin/gestion-etudiant",
      },
      {
        label: "Enseignants",
        icon: UserCog,
        link: "/admin/gestion-enseignant",
      },
      {
        label: "Inscription enseignant",
        icon: UserPlus,
        link: "/inscrit-prof",
      },
      {
        label: "Rôles",
        icon: IdCard,
        link: "/admin/gestion-role",
      },
    ],
  },

  {
    label: "Sécurité",
    icon: ShieldHalf,
    children: [
      {
        label: "Tentatives connexion",
        icon: LogIn,
        link: "/admin/tentative-connexion",
      },
    ],
  },

  {
    label: "Supervision",
    icon: Eye,
    children: [
      {
        label: "Supervision OTP",
        icon: ShieldCheck,
        link: "/admin/supervision-opt",
      },
    ],
  },
  {
    label: "Messages",
    icon: MessageSquareCodeIcon,
    link: "/admin/message",
  },

  {
    label: "Maintenance",
    icon: ServerCog,
    children: [
      {
        label: "Sauvegarde",
        icon: HardDrive,
        link: "/admin/maintenance-sauvegarde",
      },
      {
        label: "Restauration",
        icon: RotateCcw,
        link: "/admin/maintenance-restauration",
      },
    ],
  },

  {
    label: "Paramètres",
    icon: Settings2,
    link: "/admin/parametre",
  },
];

function AdminLayout({ children }) {
  return (
    <>
      <SideBarAdmin menu={adminMenu} />

      <div className="flex-1 ml-[20rem] flex flex-col h-screen">
        <Header />

        <main className="flex-1 overflow-auto p-5 bg-gray-50">{children}</main>
      </div>
    </>
  );
}

export default AdminLayout;
