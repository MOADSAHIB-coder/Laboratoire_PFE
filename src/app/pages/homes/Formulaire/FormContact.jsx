import HeaderHome from "../../../components/contentHome/headerHome";
import ContactezNous from "./FormulaireContact";
import FooterHome from "../../../components/contentHome/footerHome";

export default function Contacts() {
  return (
    <div>
      <HeaderHome />
      <div className="bg-blue-500  py-8 md:py-14 text-center">
        {" "}
        <h1 className="lg:text-6xl md:4xl 2xl font-bold text-white">
          Contactez-nous
        </h1>
      </div>
      <ContactezNous />
      <FooterHome />
    </div>
  );
}
