"use client";

import Image from "next/image";

interface SupportedChainsSlideProps {
  progress: number;
}

export default function SupportedChainsSlide({ progress }: SupportedChainsSlideProps) {
  // Convert progress (0 to 1) to translateY (100% to 0%)
  const translateY = (1 - progress) * 100;
  const isActive = progress > 0.5; // Consider active when more than 50% visible

  return (
    <div
      className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-gray-900 to-black"
      style={{
        transform: `translateY(${translateY}%)`,
        opacity: progress,
        transition: 'none', // Remove transition for smooth scroll-driven animation
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-6xl relative z-10 h-full flex items-center">
        {/* Section Title */}
        <div className="w-full">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Supported Chains
            </h2>
            <p className="text-xl text-gray-400">
              Trade seamlessly across multiple blockchain networks
            </p>
          </div>

          {/* Chains Grid */}
          <div className="relative">
            {/* Center Logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="relative group cursor-pointer focus:outline-none"
                aria-label="Back to top"
              >
                {/* Animated Ring */}
                <div
                  className="absolute inset-0 rounded-full border-2 border-cyan-500/30 scale-125"
                  style={{
                    animation: "rotate 15s linear infinite",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full border-2 border-emerald-500/30 scale-150"
                  style={{
                    animation: "rotate 20s linear infinite reverse",
                  }}
                />

                {/* Glow Effect - Default */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-2xl scale-150 opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>

                {/* Glow Effect - Hover */}
                <div className="absolute inset-0 rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className="absolute inset-0 rounded-full blur-2xl"
                    style={{
                      background:
                        "conic-gradient(from 0deg, #06b6d4, #10b981, #06b6d4, #10b981, #06b6d4)",
                      animation: "rotate 3s linear infinite",
                    }}
                  ></div>
                </div>

                {/* Dash Logo */}
                <div className="relative bg-black rounded-full p-6 border-2 border-cyan-500/50 group-hover:border-cyan-500 group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.6)]">
                  <Image
                    src="/images/logo.png"
                    alt="Dash Finance"
                    width={120}
                    height={120}
                    className="w-32 h-32 md:w-44 md:h-44 drop-shadow-[0_0_30px_rgba(6,182,212,0.5)] group-hover:drop-shadow-[0_0_50px_rgba(6,182,212,0.8)] transition-all duration-500"
                  />
                </div>
              </button>
            </div>

            {/* Chain Logos in Circle */}
            <div
              className="relative w-full max-w-2xl mx-auto aspect-square"
              style={{
                animation: isActive ? "rotateChains 60s linear infinite" : "none",
              }}
            >
              {[
                {
                  name: "Bitcoin",
                  logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
                  position: 0,
                },
                {
                  name: "Ethereum",
                  logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
                  position: 1,
                },
                {
                  name: "Solana",
                  logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png",
                  position: 2,
                },
                {
                  name: "Avalanche",
                  logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanchex/info/logo.png",
                  position: 3,
                },
                {
                  name: "NEAR",
                  logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/near/info/logo.png",
                  position: 4,
                },
                {
                  name: "BNB",
                  logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png",
                  position: 5,
                },
                {
                  name: "Ripple",
                  logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ripple/info/logo.png",
                  position: 6,
                },
                {
                  name: "Arbitrum",
                  logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png",
                  position: 7,
                },
                {
                  name: "Polygon",
                  logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png",
                  position: 8,
                },
                {
                  name: "Dogecoin",
                  logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/doge/info/logo.png",
                  position: 9,
                },
              ].map((chain, index) => {
                const totalChains = 10;
                const angle = (chain.position * 360) / totalChains - 90;
                const radius = 45;
                const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

                return (
                  <div
                    key={chain.name}
                    className={`absolute group/chain cursor-pointer transition-all duration-1000 ease-out ${isActive ? "opacity-100" : "opacity-0"
                      }`}
                    style={{
                      left: isActive ? `${x}%` : "50%",
                      top: isActive ? `${y}%` : "50%",
                      transform: "translate(-50%, -50%)",
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    {/* Chain Logo Container */}
                    <div
                      className="relative"
                      style={{
                        animation: isActive
                          ? "rotateChains 60s linear infinite reverse"
                          : "none",
                      }}
                    >
                      {/* Glow on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-emerald-500/0 group-hover/chain:from-cyan-500/30 group-hover/chain:to-emerald-500/30 rounded-full blur-xl scale-150 transition-all duration-300"></div>

                      {/* Logo */}
                      <div className="relative bg-gray-900 rounded-full p-3 md:p-4 border border-gray-700 group-hover/chain:border-cyan-500/50 group-hover/chain:scale-110 transition-all duration-300">
                        <img
                          src={chain.logo}
                          alt={chain.name}
                          className="max-w-8 max-h-8 md:max-w-12 md:max-h-12"
                        />
                      </div>

                      {/* Chain Name */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover/chain:opacity-100 transition-opacity duration-300">
                        <span className="text-xs md:text-sm text-cyan-400 font-medium">
                          {chain.name}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-16">
            <p className="text-gray-400 text-lg">More chains coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
