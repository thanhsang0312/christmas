document.addEventListener("DOMContentLoaded", function () {
  const currentDate = new Date();
  const startSnowfallDate = new Date(currentDate.getFullYear(), 10, 1);
  const endSnowfallDate = new Date(currentDate.getFullYear() + 1, 0, 6);

  if (currentDate >= startSnowfallDate && currentDate <= endSnowfallDate) {
    const maxFlakes = 50;
    const flakes = [];
    const snowflakeCharacters = ["❅", "❄", "❆"];

    setInterval(() => {
      if (flakes.length < maxFlakes) {
        createSnowflake();
      }
    }, 300);

    function createSnowflake() {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";

      const randomChar =
        snowflakeCharacters[
          Math.floor(Math.random() * snowflakeCharacters.length)
        ];
      snowflake.innerHTML = randomChar;

      document.body.appendChild(snowflake);
      flakes.push(snowflake);

      const startPos = Math.random() * window.innerWidth;
      const startOpacity = Math.random();
      const duration = Math.random() * 3 + 5;
      const size = Math.random() * 20 + 10;

      snowflake.style.fontSize = `${size}px`;
      snowflake.style.opacity = startOpacity;
      snowflake.style.position = "fixed";
      snowflake.style.top = "0";
      snowflake.style.left = `${startPos}px`;

      const rotationDirection = Math.random() > 0.5 ? 1 : -1;

      snowflake.animate(
        [
          { transform: `translate(0, 0) rotate(0deg)` },
          {
            transform: `translate(0, 100vh) rotate(${
              rotationDirection * 360
            }deg)`,
          },
        ],
        {
          duration: duration * 1000,
          easing: "linear",
          iterations: Infinity,
        }
      );
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  window.addEventListener("load", () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".wrapper",
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1.5,
          markers: true,
        },
      })
      .to("#zoom-in", {
        scale: 12,
        z: 350,
        transformOrigin: "center center",
        ease: "power1.inOut",
      })
      .to("#pre-loading", {
        opacity: 0,
        visibility: "hidden",
        duration: "1",
      })
      .to("#scene1", {
        background:
          "radial-gradient(circle, rgba(237,28,37,1) 0%, rgba(229,30,38,1) 23%, rgba(209,34,42,1) 58%, rgba(175,42,48,1) 100%)",
        duration: "1",
      });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#scene1",
          start: "top top",
          end: "bottom top",
          pin: true,
          // scrub: false,
          markers: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            console.log("Progress:", self.progress); // Theo dõi tiến trình
          },
        },
      })
      .fromTo(
        "#moon",
        {
          y: "100%",
          visibility: "visible",
        },
        {
          y: "-30%",
          scrollTrigger: {
            scrub: 2,
            markers: true,
          },
        }
      )
      // ease: "power2.out",})
      .fromTo(
        "#tree3",
        { y: "100%", visibility: "visible" },
        {
          y: "26%",
          scrollTrigger: {
            scrub: 1,
            markers: true,
          },
        }
      )
      .fromTo(
        "#tree2",
        {
          y: "100%",
          visibility: "visible",
        },
        {
          y: "40%",
          scrollTrigger: {
            scrub: 1,
            markers: true,
          },
        }
      )
      .fromTo(
        "#tree1",
        {
          y: "100%",
          visibility: "visible",
        },
        {
          y: "22%",
          scrollTrigger: {
            scrub: 1,
            markers: true,
          },
        },
        "-=0.2"
      );
  });
});
