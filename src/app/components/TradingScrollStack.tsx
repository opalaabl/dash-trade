"use client";

import ScrollStack from "./ScrollStack";

const tradingSections = [
  {
    title: "Professional Trading Interface",
    subtitle: "Advanced Tools",
    description:
      "Experience institutional-grade trading tools with real-time market data, advanced charting, and professional order execution.",
    features: [
      "Real-time order book and trade history",
      "Advanced charting with 50+ technical indicators",
      "One-click trading with instant execution",
      "Professional risk management tools",
    ],
    image: "/DEX.png",
    bgColor: "#000000",
    textColor: "#ffffff",
  },
  {
    title: "Smart Position Management",
    subtitle: "Intelligent Trading",
    description:
      "Manage your positions with precision using our advanced tools. Set automated take-profit and stop-loss levels with a single tap.",
    features: [
      "Tap-to-position on chart for instant orders",
      "Automated profit-taking when price crosses",
      "Dynamic risk/reward visualization",
      "Portfolio-wide position monitoring",
    ],
    image: "/TapPosition.png",
    bgColor: "#000000",
    textColor: "#ffffff",
  },
  {
    title: "Instant Profit Execution",
    subtitle: "One Tap Trading",
    description:
      "Take profits instantly when the market moves in your favor. Our intelligent system executes your trades automatically when price targets are hit.",
    features: [
      "Automatic execution at target levels",
      "Zero slippage on limit orders",
      "Multi-position management",
      "Real-time P&L tracking",
    ],
    image: "/TapProfit.png",
    bgColor: "#000000",
    textColor: "#ffffff",
  },
];

export default function TradingScrollStack() {
  return (
    <div className="relative">
      <ScrollStack sections={tradingSections} />
    </div>
  );
}
