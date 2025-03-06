import { useCallback } from "react";
import Particles from "@tsparticles/react";
// import { loadFull } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log("Particles initializing...");
    // await loadFull(engine);
    console.log("Particles loaded!");
  }, []);

  return (
    <Particles
      id="particles-js"
      init={particlesInit}
      options={{
        background: {
          color: "#111", // Dark background like CodePen
        },
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: { value: "#ff0000" }, // Red particles like in the CodePen
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 5,
            random: true,
          },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            outModes: "out",
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { quantity: 4 },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10"
    />
  );
};

export default ParticlesBackground;
