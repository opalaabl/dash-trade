'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TradingScrollStack from "./components/TradingScrollStack";
import BestScrollStack from "./components/BestScrollStack";
import Squares from "./components/Squares";
import { sdk } from '@farcaster/miniapp-sdk';

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Header visibility state
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Hero scroll progress for slide animation
  const [heroScrollProgress, setHeroScrollProgress] = useState(0);

  // Supported chains animation state
  const [isChainsVisible, setIsChainsVisible] = useState(false);
  const [isChainsAnimating, setIsChainsAnimating] = useState(false);
  const chainsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    // Set window height only on client side
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);
      
      const handleResize = () => {
        setWindowHeight(window.innerHeight);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  // Handle scroll and header visibility based on scroll direction
  useEffect(() => {
    // Skip this effect on server-side
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrollY state
      setScrollY(currentScrollY);

      // Calculate hero scroll progress (0 to 1 over first viewport height)
      const progress = Math.min(currentScrollY / (windowHeight || window.innerHeight), 1);
      setHeroScrollProgress(progress);

      // Show header at top of page
      if (currentScrollY < 100) {
        setIsHeaderVisible(true);
      } else {
        // Hide header when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setIsHeaderVisible(false);
        } else {
          // Scrolling up
          setIsHeaderVisible(true);
        }
      }

      // Update last scroll position
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [windowHeight]);

  useEffect(() => {
    // Skip this effect on server-side
    if (typeof window === 'undefined') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? "#06b6d4" : "#10b981",
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = (1 - distance / 150) * 0.1;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (typeof window !== 'undefined') {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Chains animation on scroll
  useEffect(() => {
    // Skip this effect on server-side
    if (typeof window === 'undefined') return;
    
    const handleChainsScroll = () => {
      if (!chainsRef.current) return;

      const rect = chainsRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Show chains when section is visible (60% threshold)
      // Hide chains when scrolled past the section
      if (rect.top <= windowHeight * 0.6 && rect.bottom >= windowHeight * 0.4) {
        if (!isChainsVisible) {
          setIsChainsVisible(true);
          // Trigger fast animation when first visible
          setIsChainsAnimating(true);
          // Reset animation state after fast rotation completes
          setTimeout(() => {
            setIsChainsAnimating(false);
          }, 1000); // 1 second of fast rotation
        }
      } else {
        setIsChainsVisible(false);
        setIsChainsAnimating(false);
      }
    };

    window.addEventListener("scroll", handleChainsScroll);
    handleChainsScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleChainsScroll);
  }, [isChainsVisible, isChainsAnimating]);

  return (
    <div className="w-full bg-black text-white overflow-hidden">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-30 flex justify-center transition-all duration-700 p-8 md:px-12 ${
          isHeaderVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <nav
          className={`flex items-center justify-between transition-all duration-700 ${
            scrollY > 50
              ? "bg-black/90 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 backdrop-blur-sm rounded-2xl px-6 py-3 max-w-5xl w-full"
              : "bg-transparent border-transparent w-full px-0 py-0"
          }`}
        >
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/dash-polos.png"
              alt="Dash Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="font-semibold text-xl">Dash</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-gray-300">
            <Link
              href="#features"
              className="hover:text-white transition-colors duration-200"
            >
              Features
            </Link>
            <Link
              href="#chains"
              className="hover:text-white transition-colors duration-200"
            >
              Chains
            </Link>
            <Link
              href="#smart-contracts"
              className="hover:text-white transition-colors duration-200"
            >
              Smart Contract
            </Link>
          </div>

          <Link
            href="/trade"
            className="font-semibold text-white py-2 px-6 rounded-lg
                       bg-gradient-to-r from-cyan-500 to-emerald-500
                       hover:from-cyan-600 hover:to-emerald-600
                       transition-all duration-300 ease-in-out
                       hover:shadow-lg hover:shadow-cyan-500/30"
          >
            Launch App
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen bg-black overflow-hidden">
        <div className="relative h-full flex">
          {/* Left Half - Text Content with Black Background */}
          <div className="w-1/2 bg-black flex items-center justify-start pl-8 md:pl-12 lg:pl-16 pr-8 relative z-10">
            <div className="space-y-3 max-w-3xl">
              <div className="space-y-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-[family-name:var(--font-cinzel-decorative)] leading-tight">
                  One Tap Gasless
                </h1>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-[family-name:var(--font-cinzel-decorative)] leading-tight">
                  Trading
                </h1>
              </div>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                One Look. One Tap. One Trade.
              </p>
              <p className="text-xs md:text-sm text-gray-400">
                Powered by Account Abstraction
              </p>
              <div className="pt-4">
                <Link
                  href="/trade"
                  className="inline-block font-semibold text-cyan-400 py-3 px-8
                             border-2 border-cyan-400
                             hover:bg-cyan-400 hover:text-black
                             transition-all duration-300 ease-in-out"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          {/* Right Half - Squares Background - Slides to the right on scroll */}
          <div
            className="w-1/2 absolute right-0 top-0 h-full transition-transform duration-300 ease-out"
            style={{
              backgroundColor: '#0a1929',
              transform: `translateX(${heroScrollProgress * 100}%)`
            }}
          >
            <div className="absolute inset-0">
              <Squares
                direction="right"
                speed={0.2}
                borderColor="rgba(59, 130, 246, 0.3)"
                squareSize={40}
                hoverFillColor="rgba(59, 130, 246, 0.1)"
              />
            </div>

            {/* Trading Chart Line Overlay - Drawing Animation with Smooth Curves */}
            <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none overflow-hidden">
              <svg
                className="w-full h-3/4"
                viewBox="0 0 800 400"
                preserveAspectRatio="none"
              >
                {/* Glow filter for the circle */}
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Main price line - smooth curve with drawing effect */}
                <path
                  d="M 0,250 C 50,235 75,215 100,220 C 125,225 150,250 200,260 C 250,270 275,210 300,200 C 325,190 350,220 400,240 C 450,260 475,170 500,180 C 525,190 550,200 600,210 C 650,220 675,140 700,150 C 725,160 750,180 800,190"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="100"
                    to="0"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </path>

                {/* Group for circles - both animated together along the path */}
                <g>
                  {/* Outer pulse circle */}
                  <circle
                    r="6"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  >
                    <animate
                      attributeName="r"
                      values="6;12;6"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="1;0;1"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Inner solid circle */}
                  <circle
                    r="6"
                    fill="#FFFFFF"
                    filter="url(#glow)"
                  />

                  {/* Animate the entire group along the path */}
                  <animateMotion
                    dur="4s"
                    repeatCount="indefinite"
                    calcMode="linear"
                    path="M 0,250 C 50,235 75,215 100,220 C 125,225 150,250 200,260 C 250,270 275,210 300,200 C 325,190 350,220 400,240 C 450,260 475,170 500,180 C 525,190 550,200 600,210 C 650,220 675,140 700,150 C 725,160 750,180 800,190"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Trading Interface - Scroll Stack */}
      <section id="features" className="relative z-20">
        <TradingScrollStack />
      </section>

      {/* Supported Chains Section */}
      <section
        ref={chainsRef}
        id="supported-chains"
        className="relative py-32 px-4 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
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

        <div className="container mx-auto max-w-6xl relative z-10" id="chains">
          {/* Section Title */}
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
            {/* Center Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="relative group cursor-pointer focus:outline-none"
                aria-label="Back to top"
              >
                {/* Text Only - No Background or Circle */}
                <div className="flex flex-col items-center justify-center">
                  <div className="text-cyan-400 text-2xl md:text-3xl font-bold font-[family-name:var(--font-cinzel-decorative)] group-hover:scale-110 transition-transform duration-300">
                    Powered By
                  </div>
                  <div className="text-emerald-400 text-3xl md:text-4xl font-bold font-[family-name:var(--font-cinzel-decorative)] group-hover:scale-110 transition-transform duration-300">
                    Dash
                  </div>
                </div>
              </button>
            </div>

            {/* Chain Logos in Circle - With Rotation Animation */}
            <div
              className="relative w-full max-w-2xl mx-auto aspect-square"
              style={{
                animation: isChainsVisible
                  ? (isChainsAnimating ? "rotateChainsFast 1s linear" : "rotateChains 60s linear infinite")
                  : "none",
              }}
              key={isChainsAnimating ? "fast" : "slow"} // Force re-render when animation changes
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
                const angle = (chain.position * 360) / totalChains - 90; // -90 to start from top
                const radius = 45; // percentage
                const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

                return (
                  <div
                    key={chain.name}
                    className={`absolute group/chain cursor-pointer transition-all duration-1000 ease-out ${
                      isChainsVisible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      left: isChainsVisible ? `${x}%` : "50%",
                      top: isChainsVisible ? `${y}%` : "50%",
                      transform: "translate(-50%, -50%)",
                      transitionDelay: `${index * 50}ms`, // Faster initial appearance
                    }}
                  >
                    {/* Connection Line to Center */}
                    <div
                      className="absolute w-0.5 bg-gradient-to-r from-cyan-500/20 to-transparent opacity-0 group-hover/chain:opacity-100 transition-opacity duration-300"
                      style={{
                        height: `${radius * 2}%`,
                        transformOrigin: "top center",
                        transform: `rotate(${angle + 90}deg)`,
                        top: "50%",
                        left: "50%",
                      }}
                    />

                    {/* Chain Logo Container */}
                    <div
                      className="relative"
                      style={{
                        animation: isChainsVisible
                          ? (isChainsAnimating ? "rotateChainsFast 1s linear reverse" : "rotateChains 60s linear infinite reverse")
                          : "none",
                      }}
                      key={isChainsAnimating ? "fast" : "slow"} // Force re-render when animation changes
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
        </div>


      </section>

      {/* Features Scroll Stack Section */}
      <section className="relative bg-black">
        <BestScrollStack
          sections={[
            {
              title: "Tap-to-Trade Experience",
              subtitle: "SEAMLESS",
              description: "Place positions instantly by tapping directly on the chart.No forms, no complex inputs — just intuitive, visual trading.",
              bgColor: "#000000",
              textColor: "#ffffff",
            },
            {
              title: "High Execution Success",
              subtitle: "DEEP POOLS",
              description: "Range-based orders adapt to market movement, delivering a significantly higher execution rate compared to exact-price orders.",
              bgColor: "#000000",
              textColor: "#ffffff",
            },
            {
              title: "Frictionless Onboarding",
              subtitle: "PRO FEATURES",
              description: "Log in with email or social accounts, get an embedded wallet instantly, and pay gas fees with USDC — no ETH or extensions required.",
              bgColor: "#000000",
              textColor: "#ffffff",
            },
            {
              title: "Zero-Popup Trading Sessions",
              subtitle: "STREAMLINED UX",
              description: "Enable a secure trading session and place multiple trades without repeated confirmations, keeping your focus on the market.",
              bgColor: "#000000",
              textColor: "#ffffff",
            },
          ]}
        />
      </section>

      {/* Smart Contract Code Section */}
      <section
        id="smart-contracts"
        className="relative py-20 px-6 sm:px-15 bg-black overflow-hidden"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - VS Code Style Editor */}
            <div className="relative">
              {/* VS Code Window */}
              <div className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-gray-700 shadow-2xl">
                {/* Title Bar */}
                <div className="bg-[#323233] px-4 py-2 flex items-center justify-between border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                    </div>
                    <span className="text-gray-400 text-sm ml-4">
                      OneTapProfit.sol
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 text-gray-500">
                      <svg fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Tab Bar */}
                <div className="bg-[#252526] px-2 py-1 flex items-center gap-2 border-b border-gray-800">
                  <div className="bg-[#1e1e1e] px-3 py-1 rounded-t text-gray-300 text-xs flex items-center gap-2 border-t-2 border-cyan-500">
                    <span>OneTapProfit.sol</span>
                    <span className="text-gray-500">×</span>
                  </div>
                </div>

                {/* Code Editor */}
                <div className="bg-[#1e1e1e] p-4 font-mono text-xs md:text-sm overflow-x-auto">
                  <pre className="text-gray-300">
                    <code>
                      {`1  // SPDX-License-Identifier: MIT
2  pragma solidity ^0.8.20;
3
4  import "@openzeppelin/contracts/access/AccessControl.sol";
5  import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
6  import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
7
8  /**
9   * @title OneTapProfit
10  * @notice Binary option-style trading
11  * @dev Users tap grid, pay USDC, win if price hits
12  */
13 contract OneTapProfit is AccessControl {
14
15    IERC20 public immutable usdc;
16    ITreasuryManager public treasuryManager;
17
18    uint256 public constant GRID_DURATION = 10;
19    uint256 public constant BASE_MULTIPLIER = 110;
20    uint256 public constant TRADING_FEE_BPS = 5;
21
22    mapping(uint256 => Bet) public bets;
23
24    function `}
                      <span className="text-cyan-400">placeBet</span>
                      {`(
25       uint256 targetPrice,
26       uint256 amount
27    ) external {
28       // Tap to profit logic
29    }
30 }`}
                    </code>
                  </pre>
                </div>

                {/* Status Bar */}
                <div className="bg-[#007acc] px-4 py-1 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4 text-white">
                    <span>Solidity</span>
                    <span>UTF-8</span>
                    <span>LF</span>
                  </div>
                  <div className="text-white">
                    <span>Ln 24, Col 14</span>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 blur-2xl -z-10"></div>
            </div>

            {/* Right Side - Description */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Smart Contracts
              </h2>

              <p className="text-xl text-gray-300 leading-relaxed">
                Built with security and efficiency in mind. Our smart contracts
                power the entire trading ecosystem.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Audited & Secure
                    </h3>
                    <p className="text-gray-400">
                      Thoroughly tested and audited smart contracts
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Gas Optimized
                    </h3>
                    <p className="text-gray-400">
                      Minimal transaction costs for maximum efficiency
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Non-Custodial
                    </h3>
                    <p className="text-gray-400">
                      You always maintain full control of your assets
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="https://github.com/Dash-Trade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4 mt-20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/dash-polos.png"
                alt="Dash Logo"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="text-gray-400">
                © 2026 Dash. All rights reserved.
              </span>
            </div>
            <div className="flex gap-6 text-gray-400">
              <span className="hover:text-white transition-colors">
                Twitter
              </span>
              <span className="hover:text-white transition-colors">
                Discord
              </span>
              <Link href="https://github.com/Dash-Trade" target="_blank" className="hover:text-white transition-colors">
                GitHub
              </Link>
              <span className="hover:text-white transition-colors">
                Docs
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style jsx global>{`
        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        body::-webkit-scrollbar {
          width: 8px;
        }

        body::-webkit-scrollbar-track {
          background: #000;
        }

        body::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #10b981);
          border-radius: 4px;
        }

        body::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0891b2, #059669);
        }

        @keyframes gradientShift {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1) rotate(5deg);
          }
        }

        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes floatSlow {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(20px, -40px) rotate(90deg);
          }
          50% {
            transform: translate(-30px, -20px) rotate(180deg);
          }
          75% {
            transform: translate(-10px, 30px) rotate(270deg);
          }
        }

        @keyframes rotate {
          0% {
            offset-distance: 0%;
          }
          100% {
            offset-distance: 100%;
          }
        }

        @keyframes squareRotate {
          0%, 100% {
            top: 0%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          12.5% {
            top: 0%;
            left: 100%;
            transform: translate(-50%, -50%);
          }
          25% {
            top: 50%;
            left: 100%;
            transform: translate(-50%, -50%);
          }
          37.5% {
            top: 100%;
            left: 100%;
            transform: translate(-50%, -50%);
          }
          50% {
            top: 100%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          62.5% {
            top: 100%;
            left: 0%;
            transform: translate(-50%, -50%);
          }
          75% {
            top: 50%;
            left: 0%;
            transform: translate(-50%, -50%);
          }
          87.5% {
            top: 0%;
            left: 0%;
            transform: translate(-50%, -50%);
          }
        }

        @keyframes rotateChains {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rotateChainsFast {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg); /* 1 full rotation in 1 second */
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        /* Enhance existing animations */
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        /* Scroll-based animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        /* Glow effect */
        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(6, 182, 212, 0.6),
              0 0 60px rgba(16, 185, 129, 0.4);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}