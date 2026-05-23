import {
  useState,
  useRef,
  useEffect,
  type KeyboardEvent,
  type ClipboardEvent,
  type CSSProperties,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, ChevronRight } from "lucide-react";
import skylineBg from "../assets/skyline-bg.mp4";

interface BirthdayGateProps {
  onEnter: () => void;
}

const VALID = {
  day: "23",
  month: "05",
  year: "2008",
};

export default function BirthdayGate({ onEnter }: BirthdayGateProps) {
  const [digits, setDigits] = useState(["", "", "", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [shake, setShake] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const char = value.slice(-1);
    const next = [...digits];

    next[index] = char;

    setDigits(next);
    setError(false);

    if (char && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }

    if (char && index === 7) {
      validate(next.join(""));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "Enter") {
      const full = digits.join("");

      if (full.length === 8) {
        validate(full);
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 8);

    const next = pasted.split("").concat(Array(8).fill("")).slice(0, 8);

    setDigits(next);

    if (pasted.length === 8) {
      validate(pasted);
    } else {
      inputRefs.current[pasted.length]?.focus();
    }
  };

  const validate = (full: string) => {
    const day = full.slice(0, 2);
    const month = full.slice(2, 4);
    const year = full.slice(4, 8);

    const isValid =
      day === VALID.day && month === VALID.month && year === VALID.year;

    if (isValid) {
      setUnlocked(true);
      setTimeout(onEnter, 1800);
      return;
    }

    setError(true);
    setShake(true);

    setTimeout(() => {
      setShake(false);
      setDigits(["", "", "", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }, 600);
  };

  return (
    <AnimatePresence>
      {!unlocked ? (
        <motion.div
          key="gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
          className="gate-root"
        >
          <style>{`
            .gate-root {
              position: fixed;
              inset: 0;
              z-index: 9999;
              background: #020617;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              padding: 16px;
              font-family: 'DM Sans', sans-serif;
            }

            .gate-video {
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center;
              z-index: 0;
              opacity: 1;
              filter: brightness(1.22) contrast(1.12) saturate(1.08);
            }

            .gate-video-overlay {
              position: absolute;
              inset: 0;
              z-index: 1;
              background:
                radial-gradient(circle at center, rgba(56, 189, 248, 0.08), transparent 58%),
                linear-gradient(to bottom, rgba(2, 6, 23, 0.18), rgba(2, 6, 23, 0.68)),
                linear-gradient(to right, rgba(2, 6, 23, 0.58), rgba(2, 6, 23, 0.12), rgba(2, 6, 23, 0.58));
              backdrop-filter: blur(0.4px);
            }

            .gate-focus-card {
              position: absolute;
              inset: 0;
              z-index: 2;
              background:
                radial-gradient(circle at center, transparent 0%, transparent 34%, rgba(2, 6, 23, 0.36) 78%),
                linear-gradient(to bottom, transparent 0%, rgba(2, 6, 23, 0.42) 100%);
              pointer-events: none;
            }

            .gate-lines {
              position: absolute;
              inset: 0;
              z-index: 3;
              pointer-events: none;
              overflow: hidden;
            }

            .gate-line {
              position: absolute;
              height: 1px;
              background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.38), transparent);
              width: 60%;
              left: -60%;
              animation: gateLine var(--dur) linear infinite var(--delay);
            }

            @keyframes gateLine {
              0% {
                transform: translateX(0) skewX(-12deg);
                opacity: 0;
              }

              10% {
                opacity: 1;
              }

              90% {
                opacity: 1;
              }

              100% {
                transform: translateX(280%) skewX(-12deg);
                opacity: 0;
              }
            }

            .gate-orb {
              position: absolute;
              border-radius: 50%;
              filter: blur(90px);
              pointer-events: none;
              z-index: 4;
            }

            .gate-content {
              position: relative;
              z-index: 10;
              display: flex;
              flex-direction: column;
              align-items: center;
              width: min(100%, 760px);
              padding: 28px;
              border: 1px solid rgba(255, 255, 255, 0.08);
              background: rgba(2, 6, 23, 0.42);
              box-shadow: 0 24px 80px rgba(0, 0, 0, 0.36);
              backdrop-filter: blur(10px);
            }

            .gate-lock {
              width: 56px;
              height: 56px;
              border: 1px solid rgba(56, 189, 248, 0.5);
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 24px;
              clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
              background: rgba(15, 23, 42, 0.65);
              box-shadow: 0 0 28px rgba(56, 189, 248, 0.2);
              backdrop-filter: blur(12px);
            }

            .gate-title {
              font-family: 'Bebas Neue', sans-serif;
              font-size: clamp(2.5rem, 8vw, 5rem);
              letter-spacing: 0.06em;
              color: #ffffff;
              text-align: center;
              line-height: 1;
              margin-bottom: 6px;
              text-shadow: 0 0 28px rgba(56, 189, 248, 0.22);
            }

            .gate-title span {
              color: #38bdf8;
            }

            .gate-sub {
              color: rgba(255, 255, 255, 0.52);
              font-size: 0.72rem;
              letter-spacing: 0.28em;
              text-transform: uppercase;
              text-align: center;
              margin-bottom: 44px;
            }

            .gate-hint {
              color: rgba(255, 255, 255, 0.42);
              font-size: 0.7rem;
              letter-spacing: 0.2em;
              text-transform: uppercase;
              text-align: center;
              margin-bottom: 20px;
            }

            .gate-inputs {
              display: flex;
              align-items: center;
              gap: 6px;
              padding: 14px;
              border: 1px solid rgba(56, 189, 248, 0.14);
              background: rgba(2, 6, 23, 0.5);
              backdrop-filter: blur(14px);
            }

            .gate-sep {
              color: rgba(255, 255, 255, 0.3);
              font-size: 1.2rem;
              margin: 0 2px;
              font-family: 'Bebas Neue', sans-serif;
            }

            .gate-digit {
              width: 44px;
              height: 56px;
              background: rgba(255, 255, 255, 0.06);
              border: 1px solid rgba(56, 189, 248, 0.3);
              color: #ffffff;
              font-family: 'Bebas Neue', sans-serif;
              font-size: 1.8rem;
              text-align: center;
              letter-spacing: 0.05em;
              outline: none;
              transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
              clip-path: polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px));
              caret-color: #38bdf8;
            }

            .gate-digit:focus {
              border-color: #38bdf8;
              background: rgba(56, 189, 248, 0.12);
              box-shadow: 0 0 18px rgba(56, 189, 248, 0.35);
            }

            .gate-digit.filled {
              border-color: rgba(56, 189, 248, 0.65);
              color: #38bdf8;
            }

            .gate-digit.error {
              border-color: rgba(255, 0, 51, 0.8);
              color: #ff335c;
              background: rgba(255, 0, 51, 0.12);
            }

            .gate-shake {
              animation: gateShake 0.5s ease;
            }

            @keyframes gateShake {
              0%, 100% {
                transform: translateX(0);
              }

              20% {
                transform: translateX(-8px);
              }

              40% {
                transform: translateX(8px);
              }

              60% {
                transform: translateX(-6px);
              }

              80% {
                transform: translateX(6px);
              }
            }

            .gate-error {
              color: #ff335c;
              font-size: 0.65rem;
              letter-spacing: 0.2em;
              text-transform: uppercase;
              text-align: center;
              margin-top: 14px;
              height: 16px;
            }

            .gate-btn {
              margin-top: 32px;
              display: inline-flex;
              align-items: center;
              gap: 8px;
              background: #0026ff;
              color: #fff;
              font-family: 'DM Sans', sans-serif;
              font-size: 0.7rem;
              font-weight: 700;
              letter-spacing: 0.2em;
              text-transform: uppercase;
              padding: 12px 28px;
              border: none;
              cursor: pointer;
              clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
              transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
              box-shadow: 0 0 28px rgba(255, 0, 51, 0.35);
            }

            .gate-btn:hover {
              background: #0065fc;
              box-shadow: 0 0 42px rgba(2, 80, 116, 0.55);
              transform: translateY(-1px);
            }

            .gate-btn:disabled {
              opacity: 0.3;
              cursor: default;
              transform: none;
            }

            .gate-bar {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              z-index: 10;
              height: 2px;
              background: linear-gradient(90deg, transparent, #ff0033, #38bdf8, #ff0033, transparent);
            }

            @media (min-width: 641px) and (max-width: 1024px) {
              .gate-video {
                object-position: center;
                filter: brightness(1.2) contrast(1.1) saturate(1.06);
              }

              .gate-content {
                width: min(100%, 680px);
                padding: 28px 24px;
              }

              .gate-title {
                font-size: clamp(3rem, 9vw, 5rem);
              }

              .gate-sub {
                margin-bottom: 38px;
              }
            }

            @media (max-width: 640px) {
              .gate-root {
                justify-content: center;
                padding: 14px;
              }

              .gate-video {
                object-position: center;
                filter: brightness(1.16) contrast(1.08) saturate(1.05);
              }

              .gate-video-overlay {
                background:
                  radial-gradient(circle at center, rgba(56, 189, 248, 0.06), transparent 60%),
                  linear-gradient(to bottom, rgba(2, 6, 23, 0.12), rgba(2, 6, 23, 0.7)),
                  linear-gradient(to right, rgba(2, 6, 23, 0.52), rgba(2, 6, 23, 0.1), rgba(2, 6, 23, 0.52));
              }

              .gate-content {
                width: 100%;
                padding: 24px 12px;
              }

              .gate-lock {
                width: 50px;
                height: 50px;
                margin-bottom: 18px;
              }

              .gate-title {
                font-size: clamp(2.55rem, 14vw, 4rem);
              }

              .gate-sub {
                margin-bottom: 28px;
                font-size: 0.64rem;
              }

              .gate-hint {
                max-width: 280px;
                margin-bottom: 16px;
                font-size: 0.62rem;
                line-height: 1.5;
              }

              .gate-inputs {
                max-width: 100%;
                gap: 3px;
                padding: 8px;
              }

              .gate-sep {
                margin: 0;
                font-size: 1rem;
              }

              .gate-digit {
                width: 30px;
                height: 44px;
                font-size: 1.35rem;
              }

              .gate-btn {
                width: min(100%, 260px);
                justify-content: center;
                margin-top: 26px;
                padding: 12px 18px;
              }

              .gate-sub,
              .gate-hint,
              .gate-btn {
                letter-spacing: 0.12em;
              }
            }

            @media (max-width: 360px) {
              .gate-digit {
                width: 28px;
                height: 42px;
                font-size: 1.25rem;
              }

              .gate-inputs {
                gap: 2px;
                padding: 8px;
              }
            }
          `}</style>

          <video
            className="gate-video"
            src={skylineBg}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />

          <div className="gate-video-overlay" />
          <div className="gate-focus-card" />

          <div
            className="gate-orb"
            style={{
              width: 300,
              height: 300,
              background: "rgba(255, 0, 51, 0.12)",
              top: "-80px",
              left: "-80px",
            }}
          />

          <div
            className="gate-orb"
            style={{
              width: 240,
              height: 240,
              background: "rgba(56, 189, 248, 0.1)",
              bottom: "-60px",
              right: "-60px",
            }}
          />

          <div className="gate-lines">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="gate-line"
                style={
                  {
                    top: `${8 + i * 13}%`,
                    "--dur": `${2.5 + i * 0.45}s`,
                    "--delay": `${i * 0.55}s`,
                  } as CSSProperties
                }
              />
            ))}
          </div>

          <div className="gate-content">
            <motion.div
              className="gate-lock"
              animate={unlocked ? { scale: 1.2 } : {}}
            >
              {unlocked ? (
                <Unlock size={22} color="#38bdf8" />
              ) : (
                <Lock size={22} color="#38bdf8" />
              )}
            </motion.div>

            <h1 className="gate-title">
              Acesso <span>Restrito</span>
            </h1>

            <p className="gate-sub">
              Conteúdo exclusivo &middot; Acesso autorizado
            </p>

            <p className="gate-hint">
              Digite sua data de nascimento &mdash; DD MM AAAA
            </p>

            <motion.div className={`gate-inputs ${shake ? "gate-shake" : ""}`}>
              {[0, 1].map((i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  className={`gate-digit ${digits[i] ? "filled" : ""} ${
                    error ? "error" : ""
                  }`}
                  maxLength={1}
                  value={digits[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  inputMode="numeric"
                  placeholder="0"
                  style={{
                    color: digits[i] ? undefined : "rgba(255,255,255,0.1)",
                  }}
                />
              ))}

              <span className="gate-sep">/</span>

              {[2, 3].map((i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  className={`gate-digit ${digits[i] ? "filled" : ""} ${
                    error ? "error" : ""
                  }`}
                  maxLength={1}
                  value={digits[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  inputMode="numeric"
                  placeholder="0"
                  style={{
                    color: digits[i] ? undefined : "rgba(255,255,255,0.1)",
                  }}
                />
              ))}

              <span className="gate-sep">/</span>

              {[4, 5, 6, 7].map((i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  className={`gate-digit ${digits[i] ? "filled" : ""} ${
                    error ? "error" : ""
                  }`}
                  maxLength={1}
                  value={digits[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  inputMode="numeric"
                  placeholder="0"
                  style={{
                    color: digits[i] ? undefined : "rgba(255,255,255,0.1)",
                  }}
                />
              ))}
            </motion.div>

            <p className="gate-error">
              {error ? "Data incorreta. Tente novamente." : ""}
            </p>

            <button
              className="gate-btn"
              disabled={digits.some((d) => d === "")}
              onClick={() => validate(digits.join(""))}
            >
              Confirmar
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="gate-bar" />
        </motion.div>
      ) : (
        <motion.div
          key="unlocked"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="gate-root"
        >
          <style>{`
            .gate-root {
              position: fixed;
              inset: 0;
              z-index: 9999;
              background: #020617;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 16px;
              font-family: 'DM Sans', sans-serif;
              overflow: hidden;
            }

            .gate-video {
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center;
              z-index: 0;
              opacity: 1;
              filter: brightness(1.22) contrast(1.12) saturate(1.08);
            }

            .gate-video-overlay {
              position: absolute;
              inset: 0;
              z-index: 1;
              background:
                linear-gradient(to bottom, rgba(2, 6, 23, 0.2), rgba(2, 6, 23, 0.68)),
                radial-gradient(circle at center, rgba(56, 189, 248, 0.1), transparent 58%);
              backdrop-filter: blur(0.4px);
            }

            .gate-focus-card {
              position: absolute;
              inset: 0;
              z-index: 2;
              background:
                radial-gradient(circle at center, transparent 0%, transparent 36%, rgba(2, 6, 23, 0.34) 82%),
                linear-gradient(to bottom, transparent 0%, rgba(2, 6, 23, 0.45) 100%);
              pointer-events: none;
            }

            .gate-unlocked-msg {
              position: relative;
              z-index: 5;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 12px;
              padding: 28px;
              border: 1px solid rgba(255, 255, 255, 0.08);
              background: rgba(2, 6, 23, 0.42);
              box-shadow: 0 24px 80px rgba(0, 0, 0, 0.36);
              backdrop-filter: blur(10px);
            }

            .gate-unlocked-text {
              font-family: 'Bebas Neue', sans-serif;
              font-size: clamp(2.2rem, 7vw, 4rem);
              letter-spacing: 0.08em;
              color: #38bdf8;
              text-align: center;
              text-shadow: 0 0 32px rgba(56, 189, 248, 0.4);
            }

            .gate-unlocked-sub {
              color: rgba(255, 255, 255, 0.52);
              font-size: 0.7rem;
              letter-spacing: 0.25em;
              text-transform: uppercase;
              text-align: center;
            }

            .text-racing-blue {
              color: #38bdf8;
            }

            @media (min-width: 641px) and (max-width: 1024px) {
              .gate-unlocked-msg {
                width: min(100%, 680px);
                padding: 28px 24px;
              }
            }

            @media (max-width: 640px) {
              .gate-video {
                filter: brightness(1.16) contrast(1.08) saturate(1.05);
              }

              .gate-unlocked-msg {
                width: 100%;
                padding: 24px 14px;
              }

              .gate-unlocked-text {
                font-size: clamp(2.2rem, 13vw, 3.4rem);
              }

              .gate-unlocked-sub {
                line-height: 1.7;
                letter-spacing: 0.12em;
              }
            }
          `}</style>

          <video
            className="gate-video"
            src={skylineBg}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />

          <div className="gate-video-overlay" />
          <div className="gate-focus-card" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="gate-unlocked-msg"
          >
            <Unlock size={36} color="#38bdf8" />

            <p className="gate-unlocked-text">Acesso liberado</p>

            <p className="gate-unlocked-sub">
              Bem-vinda <span className="text-racing-blue">Alice</span>{" "}
              &mdash; Feliz Aniversário
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}