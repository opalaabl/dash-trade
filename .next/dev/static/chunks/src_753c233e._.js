(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ui/sonner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const Toaster = ({ ...props })=>{
    _s();
    const { theme = 'system' } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
        theme: theme,
        className: "toaster group",
        toastOptions: {
            classNames: {
                toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
                description: 'group-[.toast]:text-muted-foreground',
                actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
                cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground'
            }
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/sonner.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Toaster, "bbCbBsvL7+LiaR8ofHlkcwveh/Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = Toaster;
;
var _c;
__turbopack_context__.k.register(_c, "Toaster");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/contracts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Smart Contract Addresses Configuration
 *
 * All contract addresses for Dash on Base Sepolia
 * These are loaded from environment variables for easy configuration
 */ // Token Contracts
__turbopack_context__.s([
    "ALL_ADDRESSES",
    ()=>ALL_ADDRESSES,
    "BACKEND_API_URL",
    ()=>BACKEND_API_URL,
    "CHAIN_ID",
    ()=>CHAIN_ID,
    "CONTRACTS",
    ()=>CONTRACTS,
    "DASH_DECIMALS",
    ()=>DASH_DECIMALS,
    "DASH_STAKING_ADDRESS",
    ()=>DASH_STAKING_ADDRESS,
    "DASH_TOKEN_ADDRESS",
    ()=>DASH_TOKEN_ADDRESS,
    "DEPLOYER_ADDRESS",
    ()=>DEPLOYER_ADDRESS,
    "LIMIT_EXECUTOR_ADDRESS",
    ()=>LIMIT_EXECUTOR_ADDRESS,
    "MARKET_EXECUTOR_ADDRESS",
    ()=>MARKET_EXECUTOR_ADDRESS,
    "NETWORK_NAME",
    ()=>NETWORK_NAME,
    "POSITION_MANAGER_ADDRESS",
    ()=>POSITION_MANAGER_ADDRESS,
    "PRICE_SIGNER_ADDRESS",
    ()=>PRICE_SIGNER_ADDRESS,
    "RISK_MANAGER_ADDRESS",
    ()=>RISK_MANAGER_ADDRESS,
    "RPC_URL",
    ()=>RPC_URL,
    "STABILITY_FUND_ADDRESS",
    ()=>STABILITY_FUND_ADDRESS,
    "TAP_TO_TRADE_EXECUTOR_ADDRESS",
    ()=>TAP_TO_TRADE_EXECUTOR_ADDRESS,
    "TREASURY_ADDRESS",
    ()=>TREASURY_ADDRESS,
    "USDC_ADDRESS",
    ()=>USDC_ADDRESS,
    "USDC_DECIMALS",
    ()=>USDC_DECIMALS,
    "USDC_PAYMASTER_ADDRESS",
    ()=>USDC_PAYMASTER_ADDRESS,
    "VAULT_POOL_ADDRESS",
    ()=>VAULT_POOL_ADDRESS,
    "getContractAddress",
    ()=>getContractAddress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const USDC_ADDRESS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_USDC_TOKEN_ADDRESS || '0x97e79F7189144F2A67d56ef9164B8230784014cD';
const DASH_TOKEN_ADDRESS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_DASH_TOKEN_ADDRESS || '0xe5A50E831695f4e438fFe877F4970f14778DeB28';
const MARKET_EXECUTOR_ADDRESS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_MARKET_EXECUTOR_ADDRESS || '0x169BD27456DEF7AF81Cee3F188e4C316aF7c3fE5';
const LIMIT_EXECUTOR_ADDRESS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_LIMIT_EXECUTOR_ADDRESS || '0x7690eBE5D0AF8eeBFdF7F18d0De2d4f568a1bf47';
const TAP_TO_TRADE_EXECUTOR_ADDRESS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_TAP_TO_TRADE_EXECUTOR_ADDRESS || '0xb7983AF018547Ef34Af65869cdB2E47264630532';
const POSITION_MANAGER_ADDRESS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_POSITION_MANAGER_ADDRESS || '0x45e985eE1d038d942536270c8662eb5cBFeCa6ef';
const RISK_MANAGER_ADDRESS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_RISK_MANAGER_ADDRESS || '0xB07eFBDd2c31cD97583C91679c9b7B244Db22F0D';
const VAULT_POOL_ADDRESS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_VAULT_POOL_ADDRESS || '0xA880d810Ab6fAc4c60A2b4B8D829fC37f41e2aF9';
const STABILITY_FUND_ADDRESS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_STABILITY_FUND_ADDRESS || '0x1A7763D20C262Faa477C376BFBfE1B712b51D5C8';
const DASH_STAKING_ADDRESS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_DASH_STAKING_ADDRESS || '0x583578f24DCC3f43eefa91bE1a530CBB06faf189';
const USDC_PAYMASTER_ADDRESS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_USDC_PAYMASTER_ADDRESS || '0x8b4AC6b2Dbb9fC97c62C0c086f2932c143DCCc91';
const DEPLOYER_ADDRESS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_DEPLOYER_ADDRESS || '0x722550Bb8Ec6416522AfE9EAf446F0DE3262f701';
const TREASURY_ADDRESS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_TREASURY_ADDRESS || '0x722550Bb8Ec6416522AfE9EAf446F0DE3262f701';
const PRICE_SIGNER_ADDRESS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_PRICE_SIGNER_ADDRESS || '0x722550Bb8Ec6416522AfE9EAf446F0DE3262f701';
const CHAIN_ID = parseInt(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CHAIN_ID || '84532');
const NETWORK_NAME = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_NETWORK_NAME || 'base-sepolia';
const RPC_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_RPC_URL || 'https://sepolia.base.org';
const BACKEND_API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
const USDC_DECIMALS = 6;
const DASH_DECIMALS = 18;
const CONTRACTS = {
    tokens: {
        usdc: USDC_ADDRESS,
        dash: DASH_TOKEN_ADDRESS
    },
    trading: {
        marketExecutor: MARKET_EXECUTOR_ADDRESS,
        limitExecutor: LIMIT_EXECUTOR_ADDRESS,
        tapToTradeExecutor: TAP_TO_TRADE_EXECUTOR_ADDRESS,
        positionManager: POSITION_MANAGER_ADDRESS,
        riskManager: RISK_MANAGER_ADDRESS,
        vaultPool: VAULT_POOL_ADDRESS,
        stabilityFund: STABILITY_FUND_ADDRESS
    },
    economic: {
        staking: DASH_STAKING_ADDRESS
    },
    utility: {
        paymaster: USDC_PAYMASTER_ADDRESS
    },
    config: {
        deployer: DEPLOYER_ADDRESS,
        treasury: TREASURY_ADDRESS,
        priceSigner: PRICE_SIGNER_ADDRESS
    }
};
function getContractAddress(contractName) {
    // Search through all contract categories
    for (const [categoryKey, categoryValue] of Object.entries(CONTRACTS)){
        if (contractName in categoryValue) {
            return categoryValue[contractName];
        }
    }
    throw new Error(`Contract "${contractName}" not found`);
}
const ALL_ADDRESSES = {
    USDC_ADDRESS,
    DASH_TOKEN_ADDRESS,
    MARKET_EXECUTOR_ADDRESS,
    LIMIT_EXECUTOR_ADDRESS,
    TAP_TO_TRADE_EXECUTOR_ADDRESS,
    POSITION_MANAGER_ADDRESS,
    RISK_MANAGER_ADDRESS,
    VAULT_POOL_ADDRESS,
    STABILITY_FUND_ADDRESS,
    DASH_STAKING_ADDRESS,
    USDC_PAYMASTER_ADDRESS,
    DEPLOYER_ADDRESS,
    TREASURY_ADDRESS,
    PRICE_SIGNER_ADDRESS
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/TPSLContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TPSLProvider",
    ()=>TPSLProvider,
    "useTPSLContext",
    ()=>useTPSLContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/contracts.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const TPSLContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function TPSLProvider({ children }) {
    _s();
    const [configs, setConfigs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastFetch, setLastFetch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const fetchAll = async ()=>{
        // Prevent rapid refetches (debounce)
        if (Date.now() - lastFetch < 1000) {
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BACKEND_API_URL"]}/api/tpsl/all`);
            const data = await response.json();
            if (response.ok && data.success && Array.isArray(data.data)) {
                // Convert array to map for O(1) lookup
                const configMap = {};
                data.data.forEach((config)=>{
                    configMap[config.positionId] = config;
                });
                setConfigs(configMap);
                setLastFetch(Date.now());
            }
        } catch (err) {
            console.error('Error fetching all TP/SL:', err);
        } finally{
            setIsLoading(false);
        }
    };
    // Initial fetch
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TPSLProvider.useEffect": ()=>{
            fetchAll();
        }
    }["TPSLProvider.useEffect"], []);
    // Listen to tpsl-updated events for real-time updates
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TPSLProvider.useEffect": ()=>{
            const handleTPSLUpdate = {
                "TPSLProvider.useEffect.handleTPSLUpdate": ()=>{
                    fetchAll();
                }
            }["TPSLProvider.useEffect.handleTPSLUpdate"];
            window.addEventListener('tpsl-updated', handleTPSLUpdate);
            return ({
                "TPSLProvider.useEffect": ()=>window.removeEventListener('tpsl-updated', handleTPSLUpdate)
            })["TPSLProvider.useEffect"];
        }
    }["TPSLProvider.useEffect"], []);
    // Auto-refresh every 5 seconds to catch new TP/SL configs
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TPSLProvider.useEffect": ()=>{
            const interval = setInterval({
                "TPSLProvider.useEffect.interval": ()=>{
                    fetchAll();
                }
            }["TPSLProvider.useEffect.interval"], 5000); // Refresh every 5 seconds
            return ({
                "TPSLProvider.useEffect": ()=>clearInterval(interval)
            })["TPSLProvider.useEffect"];
        }
    }["TPSLProvider.useEffect"], []);
    const getConfig = (positionId)=>{
        return configs[positionId] || null;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TPSLContext.Provider, {
        value: {
            configs,
            isLoading,
            refresh: fetchAll,
            getConfig
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/TPSLContext.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
_s(TPSLProvider, "hPLat94C8ogZROJuEmWN1vLqU4Y=");
_c = TPSLProvider;
function useTPSLContext() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(TPSLContext);
    if (context === undefined) {
        throw new Error('useTPSLContext must be used within a TPSLProvider');
    }
    return context;
}
_s1(useTPSLContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "TPSLProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers,
    "config",
    ()=>config
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$wagmi$2f$dist$2f$esm$2f$WagmiProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/wagmi/dist/esm/WagmiProvider.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@wagmi/core/dist/esm/createConfig.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/clients/transports/http.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/chains/definitions/baseSepolia.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sonner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/sonner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$TPSLContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/TPSLContext.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConfig"])({
    chains: [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseSepolia"]
    ],
    transports: {
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseSepolia"].id]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])()
    }
});
const queryClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]();
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PrivyProvider"], {
        appId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_PRIVY_APP_ID || 'cmghox4fe01ijib0ccdcmw7j5',
        config: {
            appearance: {
                theme: 'dark',
                accentColor: '#676FFF'
            },
            loginMethods: [
                'email',
                'google',
                'wallet'
            ],
            embeddedWallets: {
                ethereum: {
                    createOnLogin: 'all-users'
                }
            },
            defaultChain: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseSepolia"],
            supportedChains: [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseSepolia"]
            ]
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
            client: queryClient,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$wagmi$2f$dist$2f$esm$2f$WagmiProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WagmiProvider"], {
                config: config,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$TPSLContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPSLProvider"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sonner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {}, void 0, false, {
                            fileName: "[project]/src/app/providers.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this),
                        children
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/providers.tsx",
                    lineNumber: 40,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/providers.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/providers.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/providers.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/SidebarContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SidebarProvider",
    ()=>SidebarProvider,
    "useSidebar",
    ()=>useSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const SidebarContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function SidebarProvider({ children }) {
    _s();
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isMobileOpen, setIsMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMounted, setIsMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Load from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SidebarProvider.useEffect": ()=>{
            const savedState = localStorage.getItem('sidebar-expanded');
            if (savedState !== null) {
                setIsExpanded(savedState === 'true');
            }
            setIsMounted(true);
        }
    }["SidebarProvider.useEffect"], []);
    // Save to localStorage when state changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SidebarProvider.useEffect": ()=>{
            if (isMounted) {
                localStorage.setItem('sidebar-expanded', String(isExpanded));
            }
        }
    }["SidebarProvider.useEffect"], [
        isExpanded,
        isMounted
    ]);
    const toggleSidebar = ()=>{
        setIsExpanded((prev)=>!prev);
    };
    const openMobileSidebar = ()=>{
        setIsMobileOpen(true);
    };
    const closeMobileSidebar = ()=>{
        setIsMobileOpen(false);
    };
    const toggleMobileSidebar = ()=>{
        setIsMobileOpen((prev)=>!prev);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SidebarContext.Provider, {
        value: {
            isExpanded,
            isMobileOpen,
            toggleSidebar,
            openMobileSidebar,
            closeMobileSidebar,
            toggleMobileSidebar
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/SidebarContext.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_s(SidebarProvider, "XmuIOq28wjJEQJ4tPk3pic+mUds=");
_c = SidebarProvider;
function useSidebar() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SidebarContext);
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
}
_s1(useSidebar, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "SidebarProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_753c233e._.js.map