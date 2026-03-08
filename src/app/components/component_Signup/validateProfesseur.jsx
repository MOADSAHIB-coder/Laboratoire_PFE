import { validatePasswordRules } from "../../auth/utils_Signup/passwordValidation";

export const validateProfesseurForm = (formData) => {
  const newErrors = {};

  if (!formData.nom.trim()) {
    newErrors.nom = "Le nom est requis";
  } else if (formData.nom.trim().length < 2) {
    newErrors.nom = "Le nom doit contenir au moins 2 caractères";
  }

  if (!formData.prenom.trim()) {
    newErrors.prenom = "Le prénom est requis";
  } else if (formData.prenom.trim().length < 2) {
    newErrors.prenom = "Le prénom doit contenir au moins 2 caractères";
  }

  if (!formData.cin.trim()) {
    newErrors.cin = "Le CIN est requis";
  } else if (formData.cin.trim().length < 4) {
    newErrors.cin = "Le CIN doit contenir au moins 4 caractères";
  }

  if (!formData.email.trim()) {
    newErrors.email = "L'email est requis";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = "Email invalide";
  }

  if (!formData.specialite.trim()) {
    newErrors.specialite = "La spécialité est requise";
  }

  if (!formData.titre) {
    newErrors.titre = "Veuillez sélectionner un titre";
  }

  if (!formData.grade) {
    newErrors.grade = "Veuillez sélectionner un grade";
  }

  if (!formData.profession.trim()) {
    newErrors.profession = "La profession est requise";
  }

  const passwordError = validatePasswordRules(formData.password);
  if (passwordError) {
    newErrors.password = passwordError;
  }

  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "Veuillez confirmer le mot de passe";
  } else if (formData.confirmPassword !== formData.password) {
    newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
  }

  return newErrors;
};
