import { useSettings } from "./SettingsContext";

export function useSecuritySettings() {
  const { getSetting } = useSettings();

  // Durée validité OTP (minutes)
  const otpValidityMinutes = Number(
    getSetting("security", "Durée validité OTP (minutes)") || 10,
  );

  // Limite tentatives OTP
  const otpMaxAttempts = Number(
    getSetting("security", "Limite tentatives OTP") || 5,
  );

  // Limite tentatives connexion
  const loginMaxAttempts = Number(
    getSetting("security", "Limite tentatives connexion") || 5,
  );

  // Expiration access token (minutes)
  const accessTokenExpirationMinutes = Number(
    getSetting("security", "Expiration access token (minutes)") || 30,
  );

  // Expiration refresh token (jours)
  const refreshTokenExpirationDays = Number(
    getSetting("security", "Expiration refresh token (jours)") || 7,
  );

  return {
    otpValidityMinutes,
    otpMaxAttempts,
    loginMaxAttempts,
    accessTokenExpirationMinutes,
    refreshTokenExpirationDays,
  };
}
