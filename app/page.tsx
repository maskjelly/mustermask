"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function Page() {
  const [showBanner, setShowBanner] = useState(false)
  
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
    <div className="min-h-screen bg-white text-zinc-900 font-medium">
      {showBanner && (
        <div className="fixed top-0 inset-x-0 border-zinc-100 p-3 text-center z-40 bg-white/80 backdrop-blur-md">
          Everything is under work right now
        </div>
      )}

      <nav className="fixed top-0 inset-x-0 border-b border-zinc-100 z-30 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-xl font-semibold bg-clip-text text-transparent bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-08%2001-37-50-RNix52nnjMnlP5LBjHaVMKLclgOCQ4.png')] bg-cover">
            UserBase
          </div>
          <div className="flex items-center gap-4">
            {["Features", "Pricing", "Resources"].map((item) => (
              <a
                key={item}
                href="#"
                className="relative group hidden md:inline-block"
                onMouseEnter={() => setShowBanner(true)}
                onMouseLeave={() => setShowBanner(false)}
              >
                <span className="text-zinc-600 hover:bg-clip-text hover:text-transparent hover:bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-08%2001-37-50-RNix52nnjMnlP5LBjHaVMKLclgOCQ4.png')] hover:bg-cover transition-all duration-300">
                  {item}
                </span>
              </a>
            ))}
            <Button variant="ghost" className="relative group overflow-hidden rounded-lg border border-zinc-200">
              <span className="relative z-10 text-zinc-600 group-hover:text-white transition-colors duration-300">
                Dashboard →
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-08%2001-37-50-RNix52nnjMnlP5LBjHaVMKLclgOCQ4.png')] bg-cover" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-16 px-4 sm:px-6 lg:max-w-5xl mx-auto">
        <div className="text-center space-y-12">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
            <span className="bg-clip-text text-transparent bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-08%2001-37-50-RNix52nnjMnlP5LBjHaVMKLclgOCQ4.png')] bg-cover">
              Add AI chat to your website
            </span>
            <br />
            <span className="text-zinc-400">in seconds</span>
          </h1>

          <p className="text-xl text-zinc-600 md:text-2xl max-w-2xl mx-auto">
            Simple script integration with native browser functionality
          </p>

          <div className="relative group mt-12">
            <div className="absolute -inset-[1px] bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-08%2001-37-50-RNix52nnjMnlP5LBjHaVMKLclgOCQ4.png')] bg-cover opacity-20 rounded-xl" />
            <div className="relative p-6 rounded-xl bg-white border border-zinc-200">
              <pre className="overflow-x-auto text-left">
                <code className="block font-mono text-sm sm:text-base text-zinc-600">
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
            <Button className="h-14 px-10 text-lg relative group overflow-hidden rounded-lg border-0">
              <span className="relative z-10 text-white flex items-center">
                Get Started
                <Sparkles className="ml-2" size={20} />
              </span>
              <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-08%2001-37-50-RNix52nnjMnlP5LBjHaVMKLclgOCQ4.png')] bg-cover" />
            </Button>
            <p className="text-sm text-zinc-500">
              Free for non-commercial use • Custom solutions available at{" "}
              <span className="bg-clip-text text-transparent bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-08%2001-37-50-RNix52nnjMnlP5LBjHaVMKLclgOCQ4.png')] bg-cover">
                aaryan@whiteye.in
              </span>
            </p>
          </div>

          <div className="pt-20 mt-20 border-t border-zinc-100">
            <div className="text-sm text-zinc-500 mb-8">Trusted by forward-thinking teams</div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-6 max-w-3xl mx-auto">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 rounded-lg bg-white border border-zinc-200 transition-all duration-300 hover:scale-105 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-08%2001-37-50-RNix52nnjMnlP5LBjHaVMKLclgOCQ4.png')] bg-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

