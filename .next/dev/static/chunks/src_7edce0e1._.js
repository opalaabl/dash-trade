(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/types/gridTrading.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Grid Trading Types
__turbopack_context__.s([
    "DEFAULT_GRID_CONFIG",
    ()=>DEFAULT_GRID_CONFIG
]);
const DEFAULT_GRID_CONFIG = {
    timeMultiplier: 1,
    priceGridSize: 0.5,
    priceGridType: 'percentage',
    enabled: false,
    showLabels: true
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/GridTradingContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GridTradingProvider",
    ()=>GridTradingProvider,
    "useGridTradingContext",
    ()=>useGridTradingContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$trading$2f$hooks$2f$useGridTradingUI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/trading/hooks/useGridTradingUI.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const GridTradingContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const GridTradingProvider = ({ children })=>{
    _s();
    const gridTrading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$trading$2f$hooks$2f$useGridTradingUI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGridTrading"])({
        currentPrice: 0,
        interval: '60'
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GridTradingContext.Provider, {
        value: gridTrading,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/GridTradingContext.tsx",
        lineNumber: 13,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(GridTradingProvider, "bmDTfVoV1FjftlPKTs/22RxWsu4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$trading$2f$hooks$2f$useGridTradingUI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGridTrading"]
    ];
});
_c = GridTradingProvider;
const useGridTradingContext = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(GridTradingContext);
    if (!context) {
        throw new Error('useGridTradingContext must be used within GridTradingProvider');
    }
    return context;
};
_s1(useGridTradingContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "GridTradingProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/data/useUSDCBalance.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUSDCBalance",
    ()=>useUSDCBalance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/usePrivy-DDM76RFl.mjs [app-client] (ecmascript) <export u as usePrivy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/clients/createPublicClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/clients/transports/http.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatUnits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/chains/definitions/baseSepolia.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/contracts.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const useUSDCBalance = ()=>{
    _s();
    const { authenticated, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"])();
    const [usdcBalance, setUsdcBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('0.00');
    const [isLoadingBalance, setIsLoadingBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useUSDCBalance.useEffect": ()=>{
            const fetchUsdcBalance = {
                "useUSDCBalance.useEffect.fetchUsdcBalance": async ()=>{
                    if (!authenticated || !user) {
                        setUsdcBalance('0.00');
                        return;
                    }
                    // Get embedded wallet address (same logic as WalletConnectButton)
                    const embeddedWallets = user.linkedAccounts?.filter({
                        "useUSDCBalance.useEffect.fetchUsdcBalance": (account)=>account.type === 'wallet' && account.imported === false && account.id !== undefined
                    }["useUSDCBalance.useEffect.fetchUsdcBalance"]);
                    const embeddedWalletAddress = embeddedWallets?.[0]?.address || user?.wallet?.address;
                    if (!embeddedWalletAddress) {
                        setUsdcBalance('0.00');
                        return;
                    }
                    setIsLoadingBalance(true);
                    try {
                        const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPublicClient"])({
                            chain: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseSepolia"],
                            transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])()
                        });
                        const balance = await publicClient.readContract({
                            address: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_ADDRESS"],
                            abi: [
                                {
                                    constant: true,
                                    inputs: [
                                        {
                                            name: '_owner',
                                            type: 'address'
                                        }
                                    ],
                                    name: 'balanceOf',
                                    outputs: [
                                        {
                                            name: 'balance',
                                            type: 'uint256'
                                        }
                                    ],
                                    type: 'function'
                                }
                            ],
                            functionName: 'balanceOf',
                            args: [
                                embeddedWalletAddress
                            ]
                        });
                        // Format USDC balance using configured decimals
                        const formattedBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(balance, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_DECIMALS"]);
                        setUsdcBalance(parseFloat(formattedBalance).toFixed(2));
                    } catch (error) {
                        setUsdcBalance('0.00');
                    } finally{
                        setIsLoadingBalance(false);
                    }
                }
            }["useUSDCBalance.useEffect.fetchUsdcBalance"];
            if (authenticated && user) {
                fetchUsdcBalance();
                // Refresh balance every 5 seconds to keep it in sync
                const interval = setInterval(fetchUsdcBalance, 5000);
                return ({
                    "useUSDCBalance.useEffect": ()=>clearInterval(interval)
                })["useUSDCBalance.useEffect"];
            }
        }
    }["useUSDCBalance.useEffect"], [
        authenticated,
        user
    ]);
    return {
        usdcBalance,
        isLoadingBalance
    };
};
_s(useUSDCBalance, "xUW3h/tJfyI3y8NOWQ63tCMDLuA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/data/usePositions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Hook to fetch and manage user positions
 */ __turbopack_context__.s([
    "usePosition",
    ()=>usePosition,
    "useUserPositions",
    ()=>useUserPositions,
    "useUserPositionsWithDetails",
    ()=>useUserPositionsWithDetails
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/contracts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contracts$2f$abis$2f$PositionManager$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/contracts/abis/PositionManager.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$wallet$2f$hooks$2f$useEmbeddedWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/wallet/hooks/useEmbeddedWallet.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
;
;
;
;
function useUserPositions() {
    _s();
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$wallet$2f$hooks$2f$useEmbeddedWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEmbeddedWallet"])();
    const { data: positionIds, isLoading: isLoadingIds, refetch: refetchIds } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["POSITION_MANAGER_ADDRESS"],
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contracts$2f$abis$2f$PositionManager$2e$json__$28$json$29$__["default"],
        functionName: 'getUserPositions',
        args: address ? [
            address
        ] : undefined,
        query: {
            enabled: !!address,
            refetchInterval: 5000
        }
    });
    return {
        positionIds: positionIds || [],
        isLoading: isLoadingIds,
        refetch: refetchIds
    };
}
_s(useUserPositions, "5/EIom2yeCw1z21STPoGUDBtXMM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$wallet$2f$hooks$2f$useEmbeddedWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEmbeddedWallet"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"]
    ];
});
function usePosition(positionId) {
    _s1();
    const { data, isLoading, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["POSITION_MANAGER_ADDRESS"],
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contracts$2f$abis$2f$PositionManager$2e$json__$28$json$29$__["default"],
        functionName: 'getPosition',
        args: positionId !== undefined ? [
            positionId
        ] : undefined,
        query: {
            enabled: positionId !== undefined,
            refetchInterval: 5000
        }
    });
    // Parse position data from tuple
    if (!data) {
        return {
            position: null,
            isLoading,
            refetch
        };
    }
    // Try to parse as object first (wagmi v2 returns objects for structs)
    let position;
    if (typeof data === 'object' && !Array.isArray(data)) {
        // Data is returned as an object with named properties
        const dataObj = data;
        // Check if data has properties or is just keys (0,1,2,3...)
        // Wagmi sometimes returns object with numeric keys like {0: value, 1: value2}
        const hasNumericKeys = '0' in dataObj && '1' in dataObj;
        if (hasNumericKeys) {
            // Object with numeric keys - treat as array
            position = {
                id: dataObj[0],
                trader: dataObj[1],
                symbol: dataObj[2],
                isLong: dataObj[3],
                collateral: dataObj[4],
                size: dataObj[5],
                leverage: dataObj[6],
                entryPrice: dataObj[7],
                openTimestamp: dataObj[8],
                status: dataObj[9]
            };
        } else {
            // Object with named properties
            position = {
                id: dataObj.id,
                trader: dataObj.trader,
                symbol: dataObj.symbol,
                isLong: dataObj.isLong,
                collateral: dataObj.collateral,
                size: dataObj.size,
                leverage: dataObj.leverage,
                entryPrice: dataObj.entryPrice,
                openTimestamp: dataObj.openTimestamp,
                status: dataObj.status
            };
        }
    } else {
        // Data is returned as an array (fallback)
        const positionArray = data;
        position = {
            id: positionArray[0],
            trader: positionArray[1],
            symbol: positionArray[2],
            isLong: positionArray[3],
            collateral: positionArray[4],
            size: positionArray[5],
            leverage: positionArray[6],
            entryPrice: positionArray[7],
            openTimestamp: positionArray[8],
            status: positionArray[9]
        };
    }
    // Check if position has valid data
    if (!position.id || position.id === 0n) {
        return {
            position: null,
            isLoading,
            refetch
        };
    }
    return {
        position,
        isLoading,
        refetch
    };
}
_s1(usePosition, "E69MZ5hmciv61i97P7kLr0IBijs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"]
    ];
});
function useUserPositionsWithDetails() {
    _s2();
    const { positionIds, isLoading: isLoadingIds, refetch: refetchIds } = useUserPositions();
    // For now, just use the position IDs and fetch them individually in the component
    // This is a simpler approach that doesn't require a batch function
    return {
        positions: [],
        positionIds,
        allPositions: [],
        isLoading: isLoadingIds,
        refetch: refetchIds
    };
}
_s2(useUserPositionsWithDetails, "Bf9h8Nhr97FMFbozCAUGTSSRMBo=", false, function() {
    return [
        useUserPositions
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/wallet/useWalletBalance.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWalletBalance",
    ()=>useWalletBalance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/usePrivy-DDM76RFl.mjs [app-client] (ecmascript) <export u as usePrivy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/clients/createPublicClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/clients/transports/http.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatUnits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/chains/definitions/baseSepolia.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/contracts.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const useWalletBalance = ()=>{
    _s();
    const { authenticated, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"])();
    const [usdcBalance, setUsdcBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoadingBalance, setIsLoadingBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWalletBalance.useEffect": ()=>{
            const fetchUsdcBalance = {
                "useWalletBalance.useEffect.fetchUsdcBalance": async ()=>{
                    if (!authenticated || !user) return;
                    const embeddedWallets = user.linkedAccounts?.filter({
                        "useWalletBalance.useEffect.fetchUsdcBalance": (account)=>account.type === 'wallet' && account.imported === false && account.id !== undefined
                    }["useWalletBalance.useEffect.fetchUsdcBalance"]);
                    const embeddedWalletAddress = embeddedWallets?.[0]?.address || user?.wallet?.address;
                    if (!embeddedWalletAddress) return;
                    setIsLoadingBalance(true);
                    try {
                        const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPublicClient"])({
                            chain: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseSepolia"],
                            transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])()
                        });
                        const balance = await publicClient.readContract({
                            address: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_ADDRESS"],
                            abi: [
                                {
                                    constant: true,
                                    inputs: [
                                        {
                                            name: '_owner',
                                            type: 'address'
                                        }
                                    ],
                                    name: 'balanceOf',
                                    outputs: [
                                        {
                                            name: 'balance',
                                            type: 'uint256'
                                        }
                                    ],
                                    type: 'function'
                                }
                            ],
                            functionName: 'balanceOf',
                            args: [
                                embeddedWalletAddress
                            ]
                        });
                        const formattedBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(balance, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_DECIMALS"]);
                        setUsdcBalance(parseFloat(formattedBalance).toFixed(2));
                    } catch (error) {
                        setUsdcBalance('0.00');
                    } finally{
                        setIsLoadingBalance(false);
                    }
                }
            }["useWalletBalance.useEffect.fetchUsdcBalance"];
            if (authenticated && user) {
                fetchUsdcBalance();
            }
        }
    }["useWalletBalance.useEffect"], [
        authenticated,
        user
    ]);
    return {
        usdcBalance,
        isLoadingBalance
    };
};
_s(useWalletBalance, "h3WTvnoKRiVJ5tAv2rj8o5NCHGc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/wallet/useWalletActions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWalletActions",
    ()=>useWalletActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/usePrivy-DDM76RFl.mjs [app-client] (ecmascript) <export u as usePrivy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
const useWalletActions = ()=>{
    _s();
    const { user, exportWallet, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"])();
    const getEmbeddedWalletAddress = ()=>{
        const embeddedWallets = user?.linkedAccounts?.filter((account)=>account.type === 'wallet' && account.imported === false && account.id !== undefined);
        return embeddedWallets?.[0]?.address || user?.wallet?.address;
    };
    const handleCopyAddress = ()=>{
        const address = getEmbeddedWalletAddress();
        if (address) {
            navigator.clipboard.writeText(address);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Address copied!');
        }
    };
    const handleViewExplorer = ()=>{
        const address = getEmbeddedWalletAddress();
        if (address) {
            window.open(`https://sepolia.basescan.org/address/${address}`, '_blank');
        }
    };
    const handleExportPrivateKey = async ()=>{
        try {
            const embeddedWallets = user?.linkedAccounts?.filter((account)=>account.type === 'wallet' && account.imported === false && account.id !== undefined);
            if (!embeddedWallets || embeddedWallets.length === 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Embedded wallet not found. Please reconnect your wallet.');
                return;
            }
            const embeddedWalletAddress = embeddedWallets[0]?.address;
            if (!embeddedWalletAddress) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Embedded wallet address not found');
                return;
            }
            await exportWallet({
                address: embeddedWalletAddress
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Private key exported successfully!');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error?.message || 'Failed to export private key');
        }
    };
    const handleDisconnect = ()=>{
        logout();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Wallet disconnected');
    };
    const shortAddress = (()=>{
        const address = getEmbeddedWalletAddress();
        return address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : 'Connected';
    })();
    return {
        handleCopyAddress,
        handleViewExplorer,
        handleExportPrivateKey,
        handleDisconnect,
        shortAddress,
        getEmbeddedWalletAddress
    };
};
_s(useWalletActions, "zjN6W+ppP1a5gmTnUqlJLx52rK0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/wallet/useUSDCFaucet.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUSDCFaucet",
    ()=>useUSDCFaucet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/usePrivy-DDM76RFl.mjs [app-client] (ecmascript) <export u as usePrivy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$SignRequestScreen$2d$BQBgOoh_$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ae__as__useWallets$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/SignRequestScreen-BQBgOoh_.mjs [app-client] (ecmascript) <export ae as useWallets>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeFunctionData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/abi/encodeFunctionData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/contracts.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
// Mock USDC ABI with faucet function
const MOCK_USDC_ABI = [
    {
        inputs: [],
        name: 'faucet',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'hasClaimed',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
const useUSDCFaucet = ()=>{
    _s();
    const { authenticated, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"])();
    const { wallets } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$SignRequestScreen$2d$BQBgOoh_$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ae__as__useWallets$3e$__["useWallets"])();
    const [isClaiming, setIsClaiming] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleClaimUSDC = async ()=>{
        if (!authenticated || !user) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Please connect your wallet first');
            return;
        }
        const embeddedWallet = wallets.find((w)=>w.walletClientType === 'privy');
        if (!embeddedWallet) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Embedded wallet not found');
            return;
        }
        const walletAddress = embeddedWallet.address;
        setIsClaiming(true);
        const loadingToast = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].loading('Checking claim status...');
        try {
            const provider = await embeddedWallet.getEthereumProvider();
            if (!provider) throw new Error('Could not get wallet provider');
            // Check if user has already claimed
            const hasClaimedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeFunctionData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeFunctionData"])({
                abi: MOCK_USDC_ABI,
                functionName: 'hasClaimed',
                args: [
                    walletAddress
                ]
            });
            const hasClaimedResult = await provider.request({
                method: 'eth_call',
                params: [
                    {
                        to: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_ADDRESS"],
                        data: hasClaimedData
                    },
                    'latest'
                ]
            });
            const alreadyClaimed = hasClaimedResult !== '0x0000000000000000000000000000000000000000000000000000000000000000';
            if (alreadyClaimed) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('You have already claimed USDC from the faucet. Each wallet can only claim once.', {
                    id: loadingToast,
                    duration: 5000
                });
                return;
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].loading('Claiming USDC from faucet...', {
                id: loadingToast
            });
            const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeFunctionData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeFunctionData"])({
                abi: MOCK_USDC_ABI,
                functionName: 'faucet',
                args: []
            });
            const txHash = await provider.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: walletAddress,
                        to: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_ADDRESS"],
                        data: data
                    }
                ]
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('USDC claimed successfully! 🎉', {
                id: loadingToast,
                duration: 4000
            });
            // Show transaction link
            setTimeout(()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "View on Explorer:"
                        }, void 0, false, {
                            fileName: "[project]/src/hooks/wallet/useUSDCFaucet.tsx",
                            lineNumber: 120,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: `https://sepolia.basescan.org/tx/${txHash}`,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "underline text-blue-400 hover:text-blue-300",
                            children: "Click here"
                        }, void 0, false, {
                            fileName: "[project]/src/hooks/wallet/useUSDCFaucet.tsx",
                            lineNumber: 121,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/hooks/wallet/useUSDCFaucet.tsx",
                    lineNumber: 119,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)), {
                    duration: 5000
                });
            }, 500);
            // Reload the page to refresh balance
            setTimeout(()=>{
                window.location.reload();
            }, 2000);
            return txHash;
        } catch (error) {
            let errorMessage = 'Failed to claim USDC from faucet';
            if (error?.message?.includes('user rejected')) {
                errorMessage = 'Transaction was rejected';
            } else if (error?.message) {
                errorMessage = error.message;
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorMessage, {
                id: loadingToast
            });
        } finally{
            setIsClaiming(false);
        }
    };
    return {
        isClaiming,
        handleClaimUSDC
    };
};
_s(useUSDCFaucet, "UZ1TAFmqH2MXOJx6sUZpsrj6SlM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$SignRequestScreen$2d$BQBgOoh_$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ae__as__useWallets$3e$__["useWallets"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/data/usePrices.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Hook to fetch and manage real-time prices from backend
 * Uses WebSocket for instant real-time updates
 */ __turbopack_context__.s([
    "useAllPrices",
    ()=>useAllPrices,
    "usePrice",
    ()=>usePrice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/contracts.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
let sharedPrices = {};
const priceListeners = new Set();
let ws = null;
let reconnectTimeout = null;
// WebSocket connection
function connectWebSocket() {
    if (ws && ws.readyState === WebSocket.OPEN) {
        return; // Already connected
    }
    try {
        // Convert http/https to ws/wss
        const wsUrl = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BACKEND_API_URL"].replace(/^http/, 'ws') + '/ws/price';
        ws = new WebSocket(wsUrl);
        ws.onopen = ()=>{};
        ws.onmessage = (event)=>{
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'price_update' && data.data) {
                    // Update all prices at once (backend uses 'data' field)
                    sharedPrices = data.data;
                    // Notify all listeners
                    priceListeners.forEach((listener)=>listener());
                }
            } catch (error) {}
        };
        ws.onerror = (error)=>{};
        ws.onclose = ()=>{
            ws = null;
            // Reconnect after 2 seconds
            reconnectTimeout = setTimeout(()=>{
                if (priceListeners.size > 0) {
                    connectWebSocket();
                }
            }, 2000);
        };
    } catch (error) {}
}
// Start WebSocket if not already started
function startPriceStream() {
    connectWebSocket();
    // Also fetch initial prices via REST as fallback
    fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BACKEND_API_URL"]}/api/price/all`).then((res)=>res.json()).then((result)=>{
        if (result.success && result.data) {
            sharedPrices = result.data;
            priceListeners.forEach((listener)=>listener());
        }
    }).catch((err)=>{});
}
// Stop WebSocket if no more listeners
function stopPriceStream() {
    if (priceListeners.size === 0) {
        if (ws) {
            ws.close();
            ws = null;
        }
        if (reconnectTimeout) {
            clearTimeout(reconnectTimeout);
            reconnectTimeout = null;
        }
    }
}
function usePrice(symbol) {
    _s();
    const [price, setPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(symbol && sharedPrices[symbol] ? sharedPrices[symbol] : null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePrice.useEffect": ()=>{
            if (!symbol) {
                setIsLoading(false);
                return;
            }
            // Update function
            const updatePrice = {
                "usePrice.useEffect.updatePrice": ()=>{
                    const currentPrice = sharedPrices[symbol];
                    if (currentPrice) {
                        setPrice(currentPrice);
                        setIsLoading(false);
                    }
                }
            }["usePrice.useEffect.updatePrice"];
            // Add listener
            priceListeners.add(updatePrice);
            // Start WebSocket stream
            startPriceStream();
            // Initial update
            updatePrice();
            // Cleanup
            return ({
                "usePrice.useEffect": ()=>{
                    priceListeners.delete(updatePrice);
                    stopPriceStream();
                }
            })["usePrice.useEffect"];
        }
    }["usePrice.useEffect"], [
        symbol
    ]);
    return {
        price,
        isLoading
    };
}
_s(usePrice, "h+Yr5atrX1TD7D6HJ0k+kEeXSL4=");
function useAllPrices() {
    _s1();
    const [prices, setPrices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(sharedPrices);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAllPrices.useEffect": ()=>{
            const updatePrices = {
                "useAllPrices.useEffect.updatePrices": ()=>{
                    setPrices({
                        ...sharedPrices
                    });
                    setIsLoading(false);
                }
            }["useAllPrices.useEffect.updatePrices"];
            priceListeners.add(updatePrices);
            startPriceStream();
            updatePrices();
            return ({
                "useAllPrices.useEffect": ()=>{
                    priceListeners.delete(updatePrices);
                    stopPriceStream();
                }
            })["useAllPrices.useEffect"];
        }
    }["useAllPrices.useEffect"], []);
    return {
        prices,
        isLoading
    };
}
_s1(useAllPrices, "DIIg7CBrThr/amHwJiG0zwvl4eI=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/utils/useDynamicTitle.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDynamicTitle",
    ()=>useDynamicTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const useDynamicTitle = (price, pair)=>{
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDynamicTitle.useEffect": ()=>{
            if (price !== null && !isNaN(price)) {
                document.title = `${price.toLocaleString('en-US', {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1
                })} | ${pair} | Trade | Dash`;
            } else {
                document.title = 'Dash';
            }
        }
    }["useDynamicTitle.useEffect"], [
        price,
        pair
    ]);
};
_s(useDynamicTitle, "OD7bBpZva5O2jO+Puf00hKivP7c=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/priceApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Price API Utilities
 * Handle communication with backend for signed prices
 */ __turbopack_context__.s([
    "getSignedPrice",
    ()=>getSignedPrice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/contracts.ts [app-client] (ecmascript)");
;
async function getSignedPrice(symbol) {
    try {
        const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BACKEND_API_URL"]}/api/price/signed/${symbol}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to get signed price: ${response.statusText}`);
        }
        const result = await response.json();
        if (!result.success || !result.data) {
            throw new Error(result.error || 'Failed to get signed price');
        }
        return result.data;
    } catch (error) {
        throw error;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/relayApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * API client for gasless transaction relay service
 */ __turbopack_context__.s([
    "getLimitExecutionFee",
    ()=>getLimitExecutionFee,
    "relayTransaction",
    ()=>relayTransaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/contracts.ts [app-client] (ecmascript)");
;
async function relayTransaction(params) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BACKEND_API_URL"]}/api/relay/transaction`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });
    const result = await response.json();
    if (!result.success) {
        throw new Error(result.error || result.message || 'Failed to relay transaction');
    }
    return result.data;
}
async function getLimitExecutionFee(orderType = 'limit_open', options = {}) {
    const params = new URLSearchParams({
        orderType
    });
    if (options.estimatedGas) {
        params.set('estimatedGas', options.estimatedGas);
    }
    if (options.bufferBps !== undefined) {
        params.set('bufferBps', options.bufferBps.toString());
    }
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BACKEND_API_URL"]}/api/relay/limit/execution-fee?${params.toString()}`);
    const result = await response.json();
    if (!result.success) {
        throw new Error(result.error || 'Failed to estimate execution fee');
    }
    return result.data;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/limitOrderApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "submitLimitOpenOrder",
    ()=>submitLimitOpenOrder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/contracts.ts [app-client] (ecmascript)");
;
async function submitLimitOpenOrder(payload) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BACKEND_API_URL"]}/api/limit-orders/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
        throw new Error(result.error || result.message || 'Failed to submit limit order');
    }
    return result.data;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/market/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MarketPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$trading$2f$contexts$2f$MarketContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/trading/contexts/MarketContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GridTradingContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/GridTradingContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$trading$2f$contexts$2f$TapToTradeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/trading/contexts/TapToTradeContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$trading$2f$components$2f$market$2d$content$2f$MarketPageContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/trading/components/market-content/MarketPageContent.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
;
function MarketPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$trading$2f$contexts$2f$MarketContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarketProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GridTradingContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GridTradingProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$trading$2f$contexts$2f$TapToTradeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TapToTradeProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$trading$2f$components$2f$market$2d$content$2f$MarketPageContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/app/market/page.tsx",
                    lineNumber: 13,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/market/page.tsx",
                lineNumber: 12,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/market/page.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/market/page.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = MarketPage;
var _c;
__turbopack_context__.k.register(_c, "MarketPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_7edce0e1._.js.map