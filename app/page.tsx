"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const grainyTexture = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4d5eXlzc3OLi4ubm5uVlZWPj4+NjY19fX2JiYl/f39ra2uRkZGZmZlpaWmXl5dvb29xcXGTk5NnZ2c8TV1mAAAAG3RSTlNAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAvEOwtAAAFVklEQVR4XpWWB67c2BUFb3g557T/hRo9/WUMZHlgr4Bg8Z4qQgQJlHI4A8SzFVrapvmTF9O7dmYRFZ60YiBhJRCgh1FYhiLAmdvX0CzTOpNE77ME0Zty/nWWzchDtiqrmQDeuv3powQ5ta2eN0FY0InkqDD73lT9c9lEzwUNqgFHs9VQce3TVClFCQrSTfOiYkVJQBmpbq2L6iZavPnAPcoU0dSw0SUTqz/GtrGuXfbyyBniKykOWQWGqwwMA7QiYAxi+IlPdqo+hYHnUt5ZPfnsHJyNiDtnpJyayNBkF6cWoYGAMY92U2hXHF/C1M8uP/ZtYdiuj26UdAdQQSXQErwSOMzt/XWRWAz5GuSBIkwG1H3FabJ2OsUOUhGC6tK4EMtJO0ttC6IBD3kM0ve0tJwMdSfjZo+EEISaeTr9P3wYrGjXqyC1krcKdhMpxEnt5JetoulscpyzhXN5FRpuPHvbeQaKxFAEB6EN+cYN6xD7RYGpXpNndMmZgM5Dcs3YSNFDHUo2LGfZuukSWyUYirJAdYbF3MfqEKmjM+I2EfhA94iG3L7uKrR+GdWD73ydlIB+6hgref1QTlmgmbM3/LeX5GI1Ux1RWpgxpLuZ2+I+IjzZ8wqE4nilvQdkUdfhzI5QDWy+kw5Wgg2pGpeEVeCCA7b85BO3F9DzxB3cdqvBzWcmzbyMiqhzuYqtHRVG2y4x+KOlnyqla8AoWWpuBoYRxzXrfKuILl6SfiWCbjxoZJUaCBj1CjH7GIaDbc9kqBY3W-Rgjda1iqQcOJu2WW+76pZC9QG7M00dffe9hNnseupFL53r8F7YHSwJWUKP2q+k7RdsxyOB11n0xtOvnW4irMMFNV4H0uqwS5ExsmP9AxbDTc9JwgneAT5vTiUSm1E7BSflSt3bfa1tv8Di3R8n3Af7MNWzs49hmauE2wP+ttrq+AsWpFG2awvsuOqbipWHgtuvuaAE+A1Z/7gC9hesnr+7wqCwG8c5yAg3AL1fm8T9AZtp/bbJGwl1pNrE7RuOX7PeMRUERVaPpEs+yqeoSmuOlokqw49pgomjLeh7icHNlG19yjs6XXOMedYm5xH2YxpV2tc0Ro2jJfxC50ApuxGob7lMsxfTbeUv07TyYxpeLucEH1gNd4IKH2LAg5TdVhlCafZvpskfncCfx8pOhJzd76bJWeYFnFciwcYfubRc12Ip+ppIhA1/mSZ/RxjFDrJC5xifFjJpY2Xl5zXdguFqYyTR1zSp1Y9p+tktDYYSNflcxI0iyO4TPBdlRcpeqjK/piF5bklq77VSEaA+z8qmJTFzIWiitbnzR794USKBUaT0NTEsVjZqLaFVqJoPN9ODG70IPbfBHKK+/q/AWR0tJzYHRULOa4MP+W/HfGadZUbfw177G7j/OGbIs8TahLyynl4X4RinF793Oz+BU0saXtUHrVBFT/DnA3ctNPoGbs4hRIjTok8i+algT1lTHi4SxFvONKNrgQFAq2/gFnWMXgwffgYMJpiKYkmW3tTg3ZQ9Jq+f8XN+A5eeUKHWvJWJ2sgJ1Sop+wwhqFVijqWaJhwtD8MNlSBeWNNWTa5Z5kPZw5+LbVT99wqTdx29lMUH4OIG/D86ruKEauBjvH5xy6um/Sfj7ei6UUVk4AIl3MyD4MSSTOFgSwsH/QJWaQ5as7ZcmgBZkzjjU1UrQ74ci1gWBCSGHtuV1H2mhSnO3Wp/3fEV5a+4wz//6qy8JxjZsmxxy5+4w9CDNJY09T072iKG0EnOS0arEYgXqYnXcYHwjTtUNAcMelOd4xpkoqiTYICWFq0JSiPfPDQdnt+4/wuqcXY47QILbgAAAABJRU5ErkJggg==`;

const frostedGlassStyle = {
  backdropFilter: "blur(12px)",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  backgroundImage: `url(${grainyTexture})`,
  backgroundBlendMode: "overlay",
};

export default function Page() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "/mum.js";
    script.async = true;
    script.setAttribute("data-title", "Support Chat");
    script.setAttribute("data-position", "bottom-right");
    script.setAttribute("data-font-family", "Arial, sans-serif");
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-gray-100 text-zinc-900 font-medium"
      style={{
        backgroundImage: "url('https://usb.whiteye.in/two.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Playfair Display, serif",
      }}
    >
      {showBanner && (
        <div className="fixed top-0 inset-x-0 bg-amber-100 text-zinc-900 p-3 text-center z-40 border-b border-amber-200">
          Everything is under work right now
        </div>
      )}

      <nav
        className="fixed top-4 inset-x-4 z-30 rounded-xl shadow-lg h-20"
        style={{
          ...frostedGlassStyle,
          width: "calc(100% - 2rem)", // Adjust width to be slightly larger
          maxWidth: "58rem", // Match code block width
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div
            className="text-3xl font-semibold bg-clip-text text-transparent bg-[url('/three.png')] bg-cover"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            UserBase
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-16 px-4 sm:px-6 lg:max-w-5xl mx-auto">
        <div className="text-center space-y-12">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            <span className="bg-clip-text text-transparent bg-[url('https://usb.whiteye.in/one.png')] bg-cover">
              Add AI chat to your website
            </span>
            <br />
            <span className="text-zinc-400">in seconds</span>
          </h1>

          <p
            className="text-xl text-zinc-600 md:text-2xl max-w-2xl mx-auto"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Simple script integration with native browser functionality
          </p>

          <div className="relative group mt-12">
            <div className="absolute -inset-[1px] bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-08%2001-37-50-RNix52nnjMnlP5LBjHaVMKLclgOCQ4.png')] bg-cover opacity-20 rounded-xl" />
            <div
              className="relative p-6 rounded-xl"
              style={{
                ...frostedGlassStyle,
                backgroundColor: "rgba(245, 240, 255, 0.3)", // Light purple-ish
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <pre className="overflow-x-auto text-left">
                <code
                  className="block font-mono text-sm sm:text-base text-zinc-600"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {`useEffect(() => {
  const script = document.createElement("script");
  script.type = "module";
  script.src = "https://cdn.jsdelivr.net/gh/maskjelly/Repset@main/v6.14/widget.js";
  script.async = true;
  script.setAttribute("data-title", "Support Chat");
  script.setAttribute("data-position", "bottom-right");
  script.setAttribute("data-font-family", "Arial, sans-serif");
  document.body.appendChild(script);
  return () => {
    document.body.removeChild(script);
  };
}, []);`}
                </code>
              </pre>
            </div>
          </div>

          <div className="pt-12 space-y-8">
            <Button
              className="h-14 px-10 text-lg relative group overflow-hidden rounded-lg border-0 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md transition-colors duration-300"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              <span className="relative z-10 flex items-center">
                Get Started
                <Sparkles className="ml-2" size={20} />
              </span>
            </Button>
            <p
              className="text-sm text-zinc-600"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Free for non-commercial use • Custom solutions available at{" "}
              <span className="bg-clip-text text-transparent bg-[url('https://usb.whiteye.in/one.png')] bg-cover">
                aaryan@whiteye.in
              </span>
            </p>
          </div>
        </div>
      </main>

      {/* News Headline */}
      <div
        className="fixed bottom-4 left-4 rounded-xl shadow-lg overflow-hidden h-24"
        style={{
          ...frostedGlassStyle,
          width: "calc(100% - 2rem)", // Adjust width to be slightly larger
          maxWidth: "58rem", // Match code block width
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          className="animate-marquee whitespace-nowrap py-4 px-6 text-zinc-800 text-xl h-full flex items-center"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Work in Progress • Work in Progress • Work in Progress • Work in
          Progress • Work in Progress • Work in Progress • Work in Progress •
          Work in Progress •
        </div>
      </div>
    </div>
  );
}
