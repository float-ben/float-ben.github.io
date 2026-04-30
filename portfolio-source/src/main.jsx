import { StrictMode, useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Lanyard from "./components/Lanyard/Lanyard.jsx";

const rootElement = document.getElementById("react-lanyard-root");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setUnlockedState(unlocked) {
  const scene = document.querySelector(".lanyard-scene");
  const article = document.querySelector(".prototype-lanyard");
  const scanner = document.querySelector("[data-scanner]");
  const scanOutput = document.querySelector("[data-scan-output]");
  const scanInstruction = document.querySelector(".scan-instruction");
  const unlockCopyPanel = document.querySelector(".unlock-copy-panel");
  const portfolioSection = document.querySelector(".prototype-lanyard .lab-section");

  scene?.classList.toggle("is-unlocked", unlocked);
  scene?.classList.remove("is-near");
  article?.classList.toggle("is-unlocked", unlocked);
  portfolioSection?.classList.toggle("is-visible", unlocked);
  scanner?.classList.remove("is-live");
  scanOutput?.setAttribute("aria-hidden", String(!unlocked));
  scanInstruction?.setAttribute("aria-hidden", String(unlocked));
  unlockCopyPanel?.setAttribute("aria-hidden", String(!unlocked));
}

function LanyardMount() {
  const [instance, setInstance] = useState(0);

  const unlockPortfolio = useCallback(() => {
    const scene = document.querySelector(".lanyard-scene");
    if (scene?.classList.contains("is-unlocked")) return;

    setUnlockedState(true);
    window.setTimeout(() => {
      document.querySelector(".prototype-lanyard .lab-section")?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }, reduceMotion ? 0 : 2600);
  }, []);

  useEffect(() => {
    const fallbackScan = document.querySelector("[data-fallback-scan]");
    fallbackScan?.addEventListener("click", unlockPortfolio);

    window.resetLanyardPhysics = () => {
      setUnlockedState(false);
      setInstance(value => value + 1);
    };

    return () => {
      fallbackScan?.removeEventListener("click", unlockPortfolio);
      if (window.resetLanyardPhysics) delete window.resetLanyardPhysics;
    };
  }, [unlockPortfolio]);

  return (
    <Lanyard
      key={instance}
      position={[0, 0, 20]}
      gravity={[0, -40, 0]}
      fov={20}
      transparent
      onScan={unlockPortfolio}
    />
  );
}

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <LanyardMount />
    </StrictMode>
  );
}
