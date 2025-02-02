"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Code } from "@/components/ui/code";
import { ArrowDown, ArrowLeft } from "lucide-react";

export default function Page() {
  const [theme, setTheme] = useState("light");
  const [showBanner, setShowBanner] = useState(false);
  const [highlightScript, setHighlightScript] = useState(false);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    const timer = setTimeout(() => setHighlightScript(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClick = () => setHighlightScript(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://cdn.jsdelivr.net/gh/maskjelly/Repset@main/v5/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Monochrome theme variables
  const borderColor = theme === "light" ? "border-gray-200" : "border-gray-800";
  const bgColor = theme === "light" ? "bg-white" : "bg-black";
  const textColor = theme === "light" ? "text-gray-900" : "text-gray-100";
  const secondaryBg = theme === "light" ? "bg-gray-50" : "bg-gray-900";

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} font-medium`}>
      {/* Banner */}
      {showBanner && (
        <div
          className={`fixed top-0 inset-x-0 ${borderColor} p-3 text-center z-40 ${secondaryBg}`}
        >
          Everything is under work right now
        </div>
      )}

      {/* Navigation */}
      <nav
        className={`fixed top-0 inset-x-0 border-b ${borderColor} z-30 ${secondaryBg}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-xl font-semibold">UserBase</div>
          <div className="flex items-center gap-4">
            {["Features", "Pricing", "Resources"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-gray-600 transition-colors hidden md:inline-block"
                onMouseEnter={() => setShowBanner(true)}
                onMouseLeave={() => setShowBanner(false)}
              >
                {item}
              </a>
            ))}
            <Button
              variant="ghost"
              className={`border ${borderColor} rounded-lg`}
            >
              Dashboard →
            </Button>
            <Button
              onClick={toggleTheme}
              className={`rounded-lg ${
                theme === "light" ? "bg-gray-100" : "bg-gray-800"
              }`}
            >
              {theme === "light" ? "☀︎" : "☾"}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:max-w-4xl mx-auto">
        <div className="text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Add AI chat to your website
            <br />
            <span className="text-gray-500">in seconds</span>
          </h1>

          <p className="text-xl text-gray-600 md:text-2xl max-w-2xl mx-auto">
            Simple script integration with native browser functionality
          </p>

          {/* Code Snippet */}
          <div className="relative group mt-12">
            <div
              className={`p-6 rounded-xl ${secondaryBg} border ${borderColor} transition-all`}
            >
              <pre className="overflow-x-auto text-left">
                <code className="block font-mono text-sm sm:text-base">
                  {`<script type="module">\n  import { initChat } from 'https://cdn.jsdelivr.net/gh/maskjelly/Repset@main/v5/widget.js'\n  initChat({ theme: '${theme}' })\n</script>`}
                </code>
              </pre>
            </div>

            {highlightScript && (
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 hidden lg:flex items-center gap-2">
                <div
                  className={`px-3 py-1 rounded-lg text-xs ${secondaryBg} ${borderColor} border`}
                >
                  Active development version
                </div>
                <ArrowLeft className="animate-bounce" size={20} />
              </div>
            )}
          </div>

          <div className="pt-8 space-y-6">
            <Button
              className={`h-12 px-8 text-lg ${
                theme === "light"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              Get Started →
            </Button>
            <p className="text-sm text-gray-600">
              Free for non-commercial use • Custom solutions available at{" "}
              <span className="underline">aaryan@whiteye.in</span>
            </p>
          </div>

          {/* Trusted By */}
          <div className="pt-16 mt-16 border-t ${borderColor}">
            <div className="text-sm text-gray-600 mb-6">
              Trusted by forward-thinking teams
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 max-w-3xl mx-auto opacity-75">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-12 rounded-lg ${secondaryBg} border ${borderColor}`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
