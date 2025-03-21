import { useState, useEffect } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import { LoadingScreen } from "../LoadingScreen";

export const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false); // State to track loading completion
  const [displayText, setDisplayText] = useState("ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃ");
  const finalText = "Hi, I'm Nilesh. 👋🏼";
  const japaneseChars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ";

  useEffect(() => {
    if (!isLoaded) return; // Start animation only after loading is complete

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= finalText.length) {
        setDisplayText((prevText) => {
          const revealedText = finalText.slice(0, currentIndex);
          const remainingLength = finalText.length - revealedText.length;
          const randomChars = Array.from(
            { length: remainingLength },
            () =>
              japaneseChars[Math.floor(Math.random() * japaneseChars.length)]
          ).join("");
          return revealedText + randomChars;
        });
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [isLoaded]); // Dependency on `isLoaded`

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />} {/* Show LoadingScreen */}
      {isLoaded && ( // Render Home content only after loading is complete
        <section
          id="home"
          className="min-h-screen flex items-center justify-center relative"
        >
          <RevealOnScroll>
            <div className="text-center z-10 px-4">
              {/* Animated Text Section */}
              <div className="glitch-wrapper mb-4">
                <h1
                  className="text-5xl md:text-7xl font-bold glitch layers text-center sm:text-left bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent"
                  data-text={displayText}
                >
                  <span>
                    {displayText.split("").map((char, index) => (
                      <span key={index}>{char}</span>
                    ))}
                  </span>
                </h1>
              </div>

              {/* Description Section */}
              <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
                I'm a full-stack developer passionate about building clean, scalable web applications.
                I focus on delivering high-performance solutions with a seamless user experience
                while leveraging data structures and algorithms to solve complex problems efficiently.
              </p>

              {/* Buttons Section */}
              <div className="flex justify-center space-x-4">
                <a
                  href="#projects"
                  className="bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                >
                  View Projects
                </a>

                <a
                  href="#contact"
                  className="border border-blue-500/50 text-blue-500 py-3 px-6 rounded font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-blue-500/10"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </section>
      )}
    </>
  );
};