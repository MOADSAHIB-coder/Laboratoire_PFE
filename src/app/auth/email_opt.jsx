// src/app/auth/email_opt.jsx

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MailCheck, ShieldCheck, RotateCcw, Loader2 } from "lucide-react";
import api from "../api/API_Djando";

// ⚠️ Paramètres de sécurité globaux
import { useSecuritySettings } from "../components/componentAdmin/useSecuritySettings";

export default function EmailOTP({
  email,
  onStatusChange,
  onTicket,
  sendUrl = "etudiants/otp/send/",
  verifyUrl = "etudiants/otp/verify/",
}) {
  // 6 chiffres pour le code OTP
  const OTP_LEN = 6;
  // Cooldown entre deux envois (UI uniquement)
  const RESEND_COOLDOWN = 60;
  const HOME_PATH = "/";
  /*
  =====================================================
  PARAMÈTRES DE SÉCURITÉ (depuis SettingsContext)
  =====================================================
  */
  const { otpValidityMinutes, otpMaxAttempts } = useSecuritySettings();
  // otpValidityMinutes : durée pendant laquelle le code est valide (minutes)
  // otpMaxAttempts     : limite tentatives OTP

  /*
  =====================================================
  ÉTATS ORIGINAUX
  =====================================================
  */

  const isEmailValid = useMemo(() => {
    const v = (email || "").trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }, [email]);

  const [status, setStatus] = useState("idle"); // idle | code_sent | verified
  const [otp, setOtp] = useState("");

  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info"); // info | success | error

  const [remainingResends, setRemainingResends] = useState(null);
  const [codeError, setCodeError] = useState("");
  const [generalErrors, setGeneralErrors] = useState([]);
  const [verifyAttempts, setVerifyAttempts] = useState(0);

  // Cooldown pour RENVOYER un code
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(null);

  // ⚠️ NOUVEAU : durée de validité réelle du code OTP (en secondes)
  const [otpRemainingSeconds, setOtpRemainingSeconds] = useState(0);
  const otpTimerRef = useRef(null);

  const lastTriedOtpRef = useRef("");
  const autoVerifyTriggeredRef = useRef(false);

  /*
  =====================================================
  RESET QUAND L'EMAIL CHANGE (GARDÉ)
  =====================================================
  */
  useEffect(() => {
    setStatus("idle");
    setOtp("");
    setMessage("");
    setMessageType("info");
    setRemainingResends(null);
    setCodeError("");
    setGeneralErrors([]);
    setVerifyAttempts(0);
    lastTriedOtpRef.current = "";
    autoVerifyTriggeredRef.current = false;

    // reset cooldown renvoi
    if (cooldownRef.current) {
      clearInterval(cooldownRef.current);
      cooldownRef.current = null;
    }
    setCooldown(0);

    // reset timer de validité OTP
    if (otpTimerRef.current) {
      clearInterval(otpTimerRef.current);
      otpTimerRef.current = null;
    }
    setOtpRemainingSeconds(0);

    onStatusChange?.("idle");
    onTicket?.(null);
  }, [email, onStatusChange, onTicket]);

  /*
  =====================================================
  COOLDOWN RENVOI DE CODE (LOGIQUE ORIGINALE)
  =====================================================
  */
  useEffect(() => {
    if (cooldown <= 0) return;
    if (cooldownRef.current) return;

    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current);
          cooldownRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (cooldownRef.current) {
        clearInterval(cooldownRef.current);
        cooldownRef.current = null;
      }
    };
  }, [cooldown]);

  /*
  =====================================================
  TIMER DE VALIDITÉ DU CODE OTP (NOUVEAU)
  =====================================================
  */
  useEffect(() => {
    if (otpRemainingSeconds <= 0) return;
    if (otpTimerRef.current) return;

    otpTimerRef.current = setInterval(() => {
      setOtpRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(otpTimerRef.current);
          otpTimerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (otpTimerRef.current) {
        clearInterval(otpTimerRef.current);
        otpTimerRef.current = null;
      }
    };
  }, [otpRemainingSeconds]);

  /*
  =====================================================
  PARSEUR D'ERREURS (ORIGINALE)
  =====================================================
  */
  const parseErrors = (data) => {
    const payload =
      data?.errors && typeof data.errors === "object" ? data.errors : data;

    const fieldErrors = {};
    const nonField = [];

    if (!payload || typeof payload !== "object") {
      return { fieldErrors, nonField };
    }

    if (typeof payload.error === "string") nonField.push(payload.error);
    if (typeof payload.detail === "string") nonField.push(payload.detail);

    for (const [k, v] of Object.entries(payload)) {
      if (k === "error" || k === "detail") continue;

      const msg = Array.isArray(v)
        ? typeof v[0] === "string"
          ? v[0]
          : null
        : typeof v === "string"
          ? v
          : null;

      if (!msg) continue;

      if (k === "non_field_errors" || k === "__all__") nonField.push(msg);
      else fieldErrors[k] = msg;
    }

    return { fieldErrors, nonField };
  };

  const startCooldown = () => setCooldown(RESEND_COOLDOWN);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const redirectToHome = () => {
    window.location.assign(HOME_PATH);
  };

  /*
  =====================================================
  ENVOI DU CODE (ORIGINAL + démarrage timer OTP)
  =====================================================
  */
  const sendOtp = async () => {
    if (!isEmailValid) return;
    if (loadingVerify) return;

    setLoadingSend(true);
    setMessage("");
    setMessageType("info");
    setCodeError("");
    setGeneralErrors([]);
    setOtp("");
    setVerifyAttempts(0);
    lastTriedOtpRef.current = "";
    autoVerifyTriggeredRef.current = false;
    onTicket?.(null);
    onStatusChange?.("idle");
    setStatus("idle");

    // reset timer de validité
    if (otpTimerRef.current) {
      clearInterval(otpTimerRef.current);
      otpTimerRef.current = null;
    }
    setOtpRemainingSeconds(0);

    try {
      const res = await api.post(sendUrl, {
        email: email.trim(),
      });

      setStatus("code_sent");
      onStatusChange?.("code_sent");

      setRemainingResends(
        typeof res?.data?.remaining_resends === "number"
          ? res.data.remaining_resends
          : null,
      );

      setMessage(
        res?.data?.message ||
          "Un code de vérification a été envoyé à votre adresse électronique. Veuillez le saisir pour confirmer votre email.",
      );
      setMessageType("info");

      // démarre cooldown de renvoi (tjs 60s UI)
      startCooldown();

      // démarre la durée de validité OTP réelle (paramètre admin)
      setOtpRemainingSeconds(otpValidityMinutes * 60);
    } catch (err) {
      const { fieldErrors, nonField } = parseErrors(err?.response?.data);

      setMessageType("error");
      setMessage(
        "Une erreur est survenue,l’envoi du code de vérification n’a pas pu être effectué.",
      );

      setGeneralErrors(
        nonField.length
          ? nonField
          : [fieldErrors.email || "Veuillez réessayer ultérieurement."],
      );
    } finally {
      setLoadingSend(false);
    }
  };

  /*
  =====================================================
  RENVOI DU CODE (ORIGINAL)
  =====================================================
  */
  const resendOtp = async () => {
    if (loadingVerify) return;
    await sendOtp();
  };

  /*
  =====================================================
  VÉRIFICATION DU CODE (ORIGINAL + otpMaxAttempts + otpValidity)
  =====================================================
  */
  const verifyOtp = useCallback(
    async (code) => {
      if (status !== "code_sent") return;
      if (loadingVerify) return;
      if (!code || code.length !== OTP_LEN) return;
      if (lastTriedOtpRef.current === code) return;

      // Limite de tentatives basée sur paramètre admin
      if (verifyAttempts >= otpMaxAttempts) return;

      // Expiration basée sur otpValidityMinutes
      if (otpRemainingSeconds <= 0) {
        const msg = "Le code a expiré. Veuillez demander un nouveau code.";
        setMessageType("error");
        setMessage(msg);
        setCodeError(msg);
        return;
      }

      lastTriedOtpRef.current = code;

      setLoadingVerify(true);
      setCodeError("");
      setGeneralErrors([]);
      setMessage("");
      setMessageType("info");

      try {
        const res = await api.post(verifyUrl, {
          email: email.trim(),
          code,
        });

        const ticket = res?.data?.email_ticket;

        if (ticket) {
          setStatus("verified");
          onStatusChange?.("verified");
          onTicket?.(ticket);

          setMessageType("success");
          setMessage(
            "L’adresse électronique a été vérifiée avec succès. Vous pouvez poursuivre l’enregistrement.",
          );
          setCodeError("");
          setGeneralErrors([]);
          setVerifyAttempts(0);

          // stoppe le timer OTP
          if (otpTimerRef.current) {
            clearInterval(otpTimerRef.current);
            otpTimerRef.current = null;
          }
          setOtpRemainingSeconds(0);
        } else {
          const nextAttempts = verifyAttempts + 1;
          setVerifyAttempts(nextAttempts);

          const errorMsg = "Code de vérification invalide.";

          setMessageType("error");
          setMessage(errorMsg);
          setCodeError(errorMsg);

          if (nextAttempts >= otpMaxAttempts) {
            setGeneralErrors([
              "Nombre maximal de tentatives atteint. Redirection vers la page d’accueil...",
            ]);
            setTimeout(() => {
              redirectToHome();
            }, 1200);
          }
        }
      } catch (err) {
        const { fieldErrors, nonField } = parseErrors(err?.response?.data);
        const nextAttempts = verifyAttempts + 1;
        const msg =
          fieldErrors.code ||
          nonField[0] ||
          "La vérification du code a échoué.";

        setCooldown(0);
        if (cooldownRef.current) {
          clearInterval(cooldownRef.current);
          cooldownRef.current = null;
        }

        setVerifyAttempts(nextAttempts);
        setMessageType("error");
        setMessage(msg);
        setCodeError(msg);
        setGeneralErrors(
          nextAttempts >= otpMaxAttempts
            ? [...nonField, "Nombre maximal de tentatives atteint."]
            : nonField,
        );

        if (nextAttempts >= otpMaxAttempts) {
          setTimeout(() => {
            redirectToHome();
          }, 1200);
        }
      } finally {
        setLoadingVerify(false);
      }
    },
    [
      email,
      loadingVerify,
      onStatusChange,
      onTicket,
      verifyUrl,
      status,
      verifyAttempts,
      otpRemainingSeconds,
      otpMaxAttempts,
    ],
  );

  /*
  =====================================================
  AUTO-VERIFY (ORIGINAL)
  =====================================================
  */
  useEffect(() => {
    if (status !== "code_sent") return;
    if (otp.length !== OTP_LEN) {
      autoVerifyTriggeredRef.current = false;
      return;
    }

    if (autoVerifyTriggeredRef.current) return;

    autoVerifyTriggeredRef.current = true;
    verifyOtp(otp);
  }, [otp, status, verifyOtp]);

  if (!isEmailValid) return null;

  /*
  =====================================================
  CONDITIONS DE RENVOI (ORIGINAL + otpMaxAttempts)
  =====================================================
  */
  const canResend =
    status === "code_sent" &&
    !loadingSend &&
    !loadingVerify &&
    cooldown === 0 &&
    verifyAttempts < otpMaxAttempts &&
    (remainingResends === null || remainingResends > 0);

  const messageStyles = {
    info: "border-slate-200 bg-slate-50 text-slate-700",
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    error: "border-rose-200 bg-rose-50 text-rose-800",
  };

  const otpMinutes = Math.floor(otpRemainingSeconds / 60);
  const otpSeconds = otpRemainingSeconds % 60;

  /*
  =====================================================
  RENDER (ORIGINAL + affichage durée OTP)
  =====================================================
  */
  return (
    <div className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            {status === "verified" ? (
              <ShieldCheck className="h-5 w-5" />
            ) : (
              <MailCheck className="h-5 w-5" />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-slate-900">
              Vérification de l’adresse e-mail
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Une confirmation par code est requise afin de sécuriser
              l’enregistrement du compte.
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-5">
        {generalErrors.length > 0 && (
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
            <ul className="list-disc space-y-1 pl-5">
              {generalErrors.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {message && (
          <div
            className={`mb-4 rounded-xl border px-4 py-3 text-sm leading-6 ${messageStyles[messageType]}`}
          >
            {message}
          </div>
        )}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-slate-700">
              Statut de vérification
            </span>

            <span
              className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${
                status === "verified"
                  ? "bg-emerald-100 text-emerald-700"
                  : status === "code_sent"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-slate-100 text-slate-700"
              }`}
            >
              {status === "verified"
                ? "Adresse vérifiée"
                : status === "code_sent"
                  ? "Code envoyé"
                  : "En attente de validation"}
            </span>
          </div>

          <button
            type="button"
            onClick={sendOtp}
            disabled={loadingSend || loadingVerify || status === "verified"}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
          >
            {loadingSend ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : status === "verified" ? (
              "Adresse confirmée"
            ) : status === "code_sent" ? (
              "Code déjà envoyé"
            ) : (
              "Envoyer le code"
            )}
          </button>
        </div>

        {status === "code_sent" && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Saisir le code reçu
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Entrez le code à 6 chiffres envoyé à votre adresse e-mail.
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Tentatives de vérification : {verifyAttempts}/{otpMaxAttempts}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Durée de validité du code :{" "}
                  {otpMinutes.toString().padStart(2, "0")}:
                  {otpSeconds.toString().padStart(2, "0")} /{" "}
                  {otpValidityMinutes} minutes
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm">
                  <span className="text-slate-500">Nouvel envoi dans </span>
                  <span className="font-semibold text-slate-900">
                    {cooldown > 0 ? formatTime(cooldown) : "00:00"}
                  </span>
                </div>

                {remainingResends !== null && (
                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm">
                    <span className="text-slate-500">
                      Tentatives restantes{" "}
                    </span>
                    <span className="font-semibold text-slate-900">
                      {remainingResends}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mx-auto max-w-md">
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Code de vérification
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={OTP_LEN}
                value={otp}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "").slice(0, OTP_LEN);
                  setOtp(v);
                  setCodeError("");
                  setGeneralErrors([]);
                  lastTriedOtpRef.current = "";
                  autoVerifyTriggeredRef.current = false;
                }}
                placeholder="••••••"
                disabled={loadingVerify || verifyAttempts >= otpMaxAttempts}
                className={`w-full rounded-xl border px-4 py-3 text-center text-lg font-semibold tracking-[0.45em] shadow-sm outline-none transition ${
                  codeError
                    ? "border-rose-400 bg-rose-50 text-rose-700 focus:ring-4 focus:ring-rose-100"
                    : "border-slate-300 bg-white text-slate-900 focus:border-slate-900 focus:ring-4 focus:ring-slate-200"
                } disabled:cursor-not-allowed disabled:bg-slate-100`}
              />

              {codeError && (
                <p className="mt-2 text-sm font-medium text-rose-600">
                  {codeError}
                </p>
              )}

              {loadingVerify && (
                <div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Vérification du code en cours...
                </div>
              )}
            </div>

            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={resendOtp}
                disabled={!canResend}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-200 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                {loadingVerify
                  ? "Vérification en cours..."
                  : cooldown > 0
                    ? `Renvoyer le code (${formatTime(cooldown)})`
                    : "Renvoyer le code"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
