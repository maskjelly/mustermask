"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Code } from "@/components/ui/code";
import { ArrowDown } from "lucide-react";

export default function Page() {
  const [showBanner, setShowBanner] = useState(false);
  const [highlightScript, setHighlightScript] = useState(false);

  useEffect(() => {
    // Show the highlight effect after a short delay
    const timer = setTimeout(() => setHighlightScript(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Remove highlight when user clicks anywhere on the screen
  useEffect(() => {
    const handleClick = () => {
      setHighlightScript(false);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // Dynamically load the widget script (version v9)
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://cdn.jsdelivr.net/gh/maskjelly/Repset@main/v4/widget.js";
    script.async = true;
    document.body.appendChild(script);

    // Note: We do NOT remove the script on unmount so that the widget remains
    // intact throughout the session.
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      {/* Dark Overlay (lower z-index so it doesn’t cover the widget) */}
      {highlightScript && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          style={{ pointerEvents: "none" }}
        />
      )}

      {/* Banner */}
      {showBanner && (
        <div className="absolute top-16 left-0 right-0 bg-blue-500 text-white p-2 text-center z-40">
          Everything is under work right now
        </div>
      )}

      {/* Navigation */}
      <nav className="border-b relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 font-bold text-xl">UserBase</div>
            <div className="hidden md:flex items-center space-x-8">
              {["Features", "Pricing", "Resources"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-600 hover:text-gray-900"
                  onMouseEnter={() => setShowBanner(true)}
                  onMouseLeave={() => setShowBanner(false)}
                >
                  {item}
                </a>
              ))}
              <Button
                variant="outline"
                onMouseEnter={() => setShowBanner(true)}
                onMouseLeave={() => setShowBanner(false)}
              >
                Dashboard →
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center py-20 md:py-32">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-8">
            Add AI chat to your website in seconds
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            All you need to get this chatbot up is a simple script tag
          </p>

          {/* Code Block */}
          <div
            className={`max-w-2xl mx-auto mb-12 bg-gray-50 p-4 rounded-lg relative ${
              highlightScript ? "z-40 ring-4 ring-blue-500 shadow-lg" : ""
            }`}
          >
            <Code className="text-sm md:text-base whitespace-pre-wrap break-all">
              {`<script
  type="module"
  src="https://cdn.jsdelivr.net/gh/maskjelly/Repset@main/v9/widget.js"
></script>`}
            </Code>
            {highlightScript && (
              <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 flex items-center animate-bounce z-50">
                <div className="bg-blue-500 text-white p-2 rounded-lg mr-2 text-sm">
                  Use this as it&apos;s being developed!
                </div>
                <ArrowDown className="text-blue-500" size={24} />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800">
              Get Started →
            </Button>
            <p className="text-sm text-gray-500 mt-4">No credit card required</p>
          </div>

          {/* Trusted By Section */}
          <div className="py-16 border-t">
            <p className="text-center text-sm text-gray-600 mb-8">
              Trusted by like ? 2 people ngl , this mad sus jk
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-50">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
