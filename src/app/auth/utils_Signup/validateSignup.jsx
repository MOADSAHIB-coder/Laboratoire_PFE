import { validatePasswordRules } from "./passwordValidation";

export const validateBaseStep1 = (formStep1) => {
  const newErrors = {};

  if (!formStep1.firstName.trim()) {
    newErrors.firstName = "Le prénom est requis";
  } else if (formStep1.firstName.trim().length < 4) {
    newErrors.firstName = "Le prénom doit contenir au moins 4 caractères";
  }

  if (!formStep1.lastName.trim()) {
    newErrors.lastName = "Le nom est requis";
  } else if (formStep1.lastName.trim().length < 4) {
    newErrors.lastName = "Le nom doit contenir au moins 4 caractères";
  }

  if (!formStep1.cin.trim()) {
    newErrors.cin = "Le CIN est requis";
  } else if (formStep1.cin.trim().length < 4) {
    newErrors.cin = "Le CIN doit contenir au moins 4 caractères";
  }

  if (!formStep1.email.trim()) {
    newErrors.email = "L'email est requis";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formStep1.email)) {
    newErrors.email = "Email invalide";
  }

  return newErrors;
};

export const validateFullStep1 = (formStep1) => {
  const newErrors = {};

  if (!formStep1.filiere) {
    newErrors.filiere = "Veuillez sélectionner une filière";
  }

  if (!formStep1.niveau) {
    newErrors.niveau = "Veuillez sélectionner un niveau d'étude";
  }

  const passwordError = validatePasswordRules(formStep1.password);
  if (passwordError) {
    newErrors.password = passwordError;
  }

  if (!formStep1.confirmPassword) {
    newErrors.confirmPassword = "Veuillez confirmer le mot de passe";
  } else if (formStep1.confirmPassword !== formStep1.password) {
    newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
  }

  return newErrors;
};

export const validateStep2 = (formStep2) => {
  const newErrors = {};

  if (!formStep2.localisation.trim()) {
    newErrors.localisation = "L'adresse est requise";
  }
  if (!formStep2.date_naissance) {
    newErrors.date_naissance = "La date de naissance est requise";
  }
  if (!formStep2.genre) {
    newErrors.genre = "Veuillez sélectionner un sexe";
  }
  if (!formStep2.matricule.trim()) {
    newErrors.matricule = "Le numéro de matricule est requis";
  }
  if (!formStep2.ville.trim()) {
    newErrors.ville = "La ville est requise";
  }
  if (!formStep2.universite.trim()) {
    newErrors.universite = "L'université est requise";
  }
  if (!formStep2.annee_universitaire) {
    newErrors.annee_universitaire = "L'année universitaire est requise";
  }
  if (!formStep2.semestre) {
    newErrors.semestre = "Le semestre est requis";
  }
  if (!formStep2.telephone.trim()) {
    newErrors.telephone = "Le téléphone est requis";
  }

  return newErrors;
};
