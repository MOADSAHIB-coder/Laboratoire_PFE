export const hasTripleConsecutiveChar = (s) => /(.)\1\1/.test(s);

export const validatePasswordRules = (password) => {
  if (!password) return "Le mot de passe est requis";
  if (password.length < 8) return "Minimum 8 caractères";
  if (!/[A-Z]/.test(password)) return "Ajoutez au moins 1 majuscule";
  if (!/[a-z]/.test(password)) return "Ajoutez au moins 1 minuscule";
  if (!/[0-9]/.test(password)) return "Ajoutez au moins 1 chiffre";
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password)) {
    return "Ajoutez au moins 1 caractère spécial";
  }
  if (hasTripleConsecutiveChar(password)) {
    return "Pas 3 mêmes caractères consécutifs";
  }
  return "";
};
