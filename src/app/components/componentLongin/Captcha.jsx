import { useState, useEffect, useRef } from "react";
import { FiRefreshCw } from "react-icons/fi";

function CaptchaField({ onValidate, error }) {
  const canvasRef = useRef(null);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    let text = "";
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return text;
  };

  const [captchaText, setCaptchaText] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");

  // Dessiner le captcha
  const drawCaptcha = (text) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // fond
    const gradient = ctx.createLinearGradient(0, 0, 220, 60);
    gradient.addColorStop(0, "#f3f4f6");
    gradient.addColorStop(1, "#e5e7eb");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // bruit (points)
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = "#d1d5db";
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        1,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }

    // lignes de perturbation
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = "#9ca3af";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // texte
    ctx.font = "28px monospace";
    ctx.fillStyle = "#111827";

    text.split("").forEach((char, i) => {
      const x = 20 + i * 30;
      const y = 38;
      const angle = (Math.random() - 0.5) * 0.6;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    });
  };

  // redessiner quand le texte change
  useEffect(() => {
    drawCaptcha(captchaText);
  }, [captchaText]);

  // informer le parent
  useEffect(() => {
    const isValid =
      captchaInput && captchaInput.toLowerCase() === captchaText.toLowerCase();

    onValidate(isValid);
  }, [captchaInput, captchaText, onValidate]);

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setCaptchaInput("");
    onValidate(false);
  };

  return (
    <div className="relative ">
      <label className="block mb-2 text-gray-400">
        Vérification anti-robot<span className="text-red-500">*</span>
      </label>

      <div className="flex items-center gap-3 mb-3">
        <canvas
          ref={canvasRef}
          width={300}
          height={60}
          className="max-w-4xl border border-gray-300 shadow-sm"
        />

        <button type="button" onClick={refreshCaptcha}>
          <FiRefreshCw size={40} />
        </button>
      </div>

      <input
        type="text"
        placeholder="Recopiez le texte ici"
        value={captchaInput}
        onChange={(e) => setCaptchaInput(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default CaptchaField;
