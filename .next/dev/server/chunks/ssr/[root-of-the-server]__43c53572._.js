module.exports = [
"[project]/src/features/trading/lib/marketUtils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatDynamicUsd",
    ()=>formatDynamicUsd,
    "formatMarketPair",
    ()=>formatMarketPair,
    "inferMarketCategory",
    ()=>inferMarketCategory,
    "inferTradingViewSymbol",
    ()=>inferTradingViewSymbol,
    "mergeMarketsWithOracle",
    ()=>mergeMarketsWithOracle
]);
const CATEGORY_ORDER = [
    'crypto',
    'forex',
    'indices',
    'commodities',
    'stocks'
];
const FOREX_BASES = [
    'EUR',
    'GBP',
    'JPY',
    'AUD',
    'NZD',
    'CAD',
    'CHF'
];
const STOCK_LIKE = [
    'AAPL',
    'GOOGL',
    'TSLA',
    'NVDA',
    'MSFT',
    'AMZN'
];
const INDEX_LIKE = [
    'SPY',
    'QQQ',
    'DXY'
];
const COMMODITY_LIKE = [
    'XAU',
    'XAG',
    'WTI',
    'BRENT'
];
function formatMarketPair(symbol) {
    const upper = symbol.toUpperCase();
    if (upper.endsWith('USD') && upper.length > 3) {
        const base = symbol.slice(0, -3);
        return `${base}/USD`;
    }
    return `${symbol}/USD`;
}
function inferMarketCategory(symbol) {
    const upper = symbol.toUpperCase();
    const base = upper.endsWith('USD') ? upper.slice(0, -3) : upper;
    if (FOREX_BASES.includes(base) && upper.endsWith('USD')) return 'forex';
    if (COMMODITY_LIKE.includes(base)) return 'commodities';
    if (INDEX_LIKE.includes(base)) return 'indices';
    if (STOCK_LIKE.includes(base)) return 'stocks';
    // Default: treat unknown as stocks if it looks like equity ticker, otherwise crypto
    if (upper.endsWith('USD') && base.length <= 5) return 'stocks';
    return 'crypto';
}
function inferTradingViewSymbol(symbol, category) {
    const upper = symbol.toUpperCase();
    const base = upper.endsWith('USD') ? upper.slice(0, -3) : upper;
    // Explicit mappings
    const explicit = {
        EURUSD: 'OANDA:EURUSD',
        GBPUSD: 'OANDA:GBPUSD',
        XAUUSD: 'OANDA:XAUUSD',
        XAGUSD: 'OANDA:XAGUSD',
        QQQUSD: 'NASDAQ:QQQ',
        SPYUSD: 'AMEX:SPY',
        AAPLUSD: 'NASDAQ:AAPL',
        GOOGLUSD: 'NASDAQ:GOOGL',
        NVDAUSD: 'NASDAQ:NVDA',
        TSLAUSD: 'NASDAQ:TSLA'
    };
    if (explicit[upper]) return explicit[upper];
    if (category === 'forex') return `OANDA:${upper}`;
    if (category === 'commodities') return `OANDA:${upper}`;
    if (category === 'indices') return `AMEX:${base}`;
    if (category === 'stocks') return `NASDAQ:${base}`;
    // Crypto fallback
    return `BINANCE:${base}USDT`;
}
function mergeMarketsWithOracle(baseMarkets, oracleSymbols) {
    const map = new Map();
    baseMarkets.forEach((m)=>map.set(m.symbol.toUpperCase(), m));
    oracleSymbols.forEach((rawSymbol)=>{
        const symbol = rawSymbol.toUpperCase();
        if (map.has(symbol)) return;
        const category = inferMarketCategory(symbol);
        map.set(symbol, {
            symbol,
            category,
            tradingViewSymbol: inferTradingViewSymbol(symbol, category),
            maxLeverage: 100
        });
    });
    const markets = Array.from(map.values());
    markets.sort((a, b)=>{
        const catOrder = CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);
        if (catOrder !== 0) return catOrder;
        return a.symbol.localeCompare(b.symbol);
    });
    return markets;
}
function formatDynamicUsd(value) {
    if (!Number.isFinite(value)) return '$--';
    const intPart = Math.floor(Math.abs(value));
    const digits = intPart >= 10 ? 2 : 5;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: digits,
        maximumFractionDigits: digits
    }).format(value);
}
}),
"[project]/src/contracts/abis/PositionManager.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v([{"type":"constructor","inputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"DEFAULT_ADMIN_ROLE","inputs":[],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"EXECUTOR_ROLE","inputs":[],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"calculatePnL","inputs":[{"name":"positionId","type":"uint256","internalType":"uint256"},{"name":"currentPrice","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"pnl","type":"int256","internalType":"int256"}],"stateMutability":"view"},{"type":"function","name":"closePosition","inputs":[{"name":"positionId","type":"uint256","internalType":"uint256"},{"name":"exitPrice","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"pnl","type":"int256","internalType":"int256"}],"stateMutability":"nonpayable"},{"type":"function","name":"createPosition","inputs":[{"name":"trader","type":"address","internalType":"address"},{"name":"symbol","type":"string","internalType":"string"},{"name":"isLong","type":"bool","internalType":"bool"},{"name":"collateral","type":"uint256","internalType":"uint256"},{"name":"leverage","type":"uint256","internalType":"uint256"},{"name":"entryPrice","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"positionId","type":"uint256","internalType":"uint256"}],"stateMutability":"nonpayable"},{"type":"function","name":"getPosition","inputs":[{"name":"positionId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"tuple","internalType":"struct PositionManager.Position","components":[{"name":"id","type":"uint256","internalType":"uint256"},{"name":"trader","type":"address","internalType":"address"},{"name":"symbol","type":"string","internalType":"string"},{"name":"isLong","type":"bool","internalType":"bool"},{"name":"collateral","type":"uint256","internalType":"uint256"},{"name":"size","type":"uint256","internalType":"uint256"},{"name":"leverage","type":"uint256","internalType":"uint256"},{"name":"entryPrice","type":"uint256","internalType":"uint256"},{"name":"openTimestamp","type":"uint256","internalType":"uint256"},{"name":"status","type":"uint8","internalType":"enum PositionManager.PositionStatus"}]}],"stateMutability":"view"},{"type":"function","name":"getPositionStatus","inputs":[{"name":"positionId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint8","internalType":"enum PositionManager.PositionStatus"}],"stateMutability":"view"},{"type":"function","name":"getRoleAdmin","inputs":[{"name":"role","type":"bytes32","internalType":"bytes32"}],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"getUserOpenPositions","inputs":[{"name":"user","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"tuple[]","internalType":"struct PositionManager.Position[]","components":[{"name":"id","type":"uint256","internalType":"uint256"},{"name":"trader","type":"address","internalType":"address"},{"name":"symbol","type":"string","internalType":"string"},{"name":"isLong","type":"bool","internalType":"bool"},{"name":"collateral","type":"uint256","internalType":"uint256"},{"name":"size","type":"uint256","internalType":"uint256"},{"name":"leverage","type":"uint256","internalType":"uint256"},{"name":"entryPrice","type":"uint256","internalType":"uint256"},{"name":"openTimestamp","type":"uint256","internalType":"uint256"},{"name":"status","type":"uint8","internalType":"enum PositionManager.PositionStatus"}]}],"stateMutability":"view"},{"type":"function","name":"getUserPositions","inputs":[{"name":"user","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256[]","internalType":"uint256[]"}],"stateMutability":"view"},{"type":"function","name":"grantRole","inputs":[{"name":"role","type":"bytes32","internalType":"bytes32"},{"name":"account","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"hasRole","inputs":[{"name":"role","type":"bytes32","internalType":"bytes32"},{"name":"account","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"liquidatePosition","inputs":[{"name":"positionId","type":"uint256","internalType":"uint256"},{"name":"liquidationPrice","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"nextPositionId","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"positionExists","inputs":[{"name":"positionId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"positions","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"id","type":"uint256","internalType":"uint256"},{"name":"trader","type":"address","internalType":"address"},{"name":"symbol","type":"string","internalType":"string"},{"name":"isLong","type":"bool","internalType":"bool"},{"name":"collateral","type":"uint256","internalType":"uint256"},{"name":"size","type":"uint256","internalType":"uint256"},{"name":"leverage","type":"uint256","internalType":"uint256"},{"name":"entryPrice","type":"uint256","internalType":"uint256"},{"name":"openTimestamp","type":"uint256","internalType":"uint256"},{"name":"status","type":"uint8","internalType":"enum PositionManager.PositionStatus"}],"stateMutability":"view"},{"type":"function","name":"renounceRole","inputs":[{"name":"role","type":"bytes32","internalType":"bytes32"},{"name":"callerConfirmation","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"revokeRole","inputs":[{"name":"role","type":"bytes32","internalType":"bytes32"},{"name":"account","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"supportsInterface","inputs":[{"name":"interfaceId","type":"bytes4","internalType":"bytes4"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"userPositions","inputs":[{"name":"","type":"address","internalType":"address"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"event","name":"PositionClosed","inputs":[{"name":"positionId","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"exitPrice","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"pnl","type":"int256","indexed":false,"internalType":"int256"}],"anonymous":false},{"type":"event","name":"PositionLiquidated","inputs":[{"name":"positionId","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"liquidationPrice","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"liquidator","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"event","name":"PositionOpened","inputs":[{"name":"positionId","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"trader","type":"address","indexed":true,"internalType":"address"},{"name":"symbol","type":"string","indexed":false,"internalType":"string"},{"name":"isLong","type":"bool","indexed":false,"internalType":"bool"},{"name":"collateral","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"size","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"leverage","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"entryPrice","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"RoleAdminChanged","inputs":[{"name":"role","type":"bytes32","indexed":true,"internalType":"bytes32"},{"name":"previousAdminRole","type":"bytes32","indexed":true,"internalType":"bytes32"},{"name":"newAdminRole","type":"bytes32","indexed":true,"internalType":"bytes32"}],"anonymous":false},{"type":"event","name":"RoleGranted","inputs":[{"name":"role","type":"bytes32","indexed":true,"internalType":"bytes32"},{"name":"account","type":"address","indexed":true,"internalType":"address"},{"name":"sender","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"RoleRevoked","inputs":[{"name":"role","type":"bytes32","indexed":true,"internalType":"bytes32"},{"name":"account","type":"address","indexed":true,"internalType":"address"},{"name":"sender","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"error","name":"AccessControlBadConfirmation","inputs":[]},{"type":"error","name":"AccessControlUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"},{"name":"neededRole","type":"bytes32","internalType":"bytes32"}]},{"type":"error","name":"ReentrancyGuardReentrantCall","inputs":[]}]);}),
"[project]/src/features/wallet/hooks/useEmbeddedWallet.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Hook to get Privy embedded wallet address
 */ __turbopack_context__.s([
    "useEmbeddedWallet",
    ()=>useEmbeddedWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/usePrivy-DDM76RFl.mjs [app-ssr] (ecmascript) <export u as usePrivy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
function useEmbeddedWallet() {
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"])();
    const embeddedWallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!user?.linkedAccounts) return null;
        const wallets = user.linkedAccounts.filter((account)=>{
            const acc = account;
            return acc.type === 'wallet' && acc.imported === false && acc.id !== undefined;
        });
        return wallets?.[0] || null;
    }, [
        user
    ]);
    return {
        address: embeddedWallet?.address,
        hasEmbeddedWallet: !!embeddedWallet,
        embeddedWallet
    };
}
}),
"[project]/src/hooks/data/usePositions.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/contracts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contracts$2f$abis$2f$PositionManager$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/contracts/abis/PositionManager.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$wallet$2f$hooks$2f$useEmbeddedWallet$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/wallet/hooks/useEmbeddedWallet.ts [app-ssr] (ecmascript)");
;
;
;
;
function useUserPositions() {
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$wallet$2f$hooks$2f$useEmbeddedWallet$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEmbeddedWallet"])();
    const { data: positionIds, isLoading: isLoadingIds, refetch: refetchIds } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["POSITION_MANAGER_ADDRESS"],
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
function usePosition(positionId) {
    const { data, isLoading, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["POSITION_MANAGER_ADDRESS"],
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
function useUserPositionsWithDetails() {
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
}),
"[project]/src/hooks/data/usePrices.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/contracts.ts [app-ssr] (ecmascript)");
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
        const wsUrl = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BACKEND_API_URL"].replace(/^http/, 'ws') + '/ws/price';
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
    fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BACKEND_API_URL"]}/api/price/all`).then((res)=>res.json()).then((result)=>{
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
    const [price, setPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(symbol && sharedPrices[symbol] ? sharedPrices[symbol] : null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!symbol) {
            setIsLoading(false);
            return;
        }
        // Update function
        const updatePrice = ()=>{
            const currentPrice = sharedPrices[symbol];
            if (currentPrice) {
                setPrice(currentPrice);
                setIsLoading(false);
            }
        };
        // Add listener
        priceListeners.add(updatePrice);
        // Start WebSocket stream
        startPriceStream();
        // Initial update
        updatePrice();
        // Cleanup
        return ()=>{
            priceListeners.delete(updatePrice);
            stopPriceStream();
        };
    }, [
        symbol
    ]);
    return {
        price,
        isLoading
    };
}
function useAllPrices() {
    const [prices, setPrices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(sharedPrices);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const updatePrices = ()=>{
            setPrices({
                ...sharedPrices
            });
            setIsLoading(false);
        };
        priceListeners.add(updatePrices);
        startPriceStream();
        updatePrices();
        return ()=>{
            priceListeners.delete(updatePrices);
            stopPriceStream();
        };
    }, []);
    return {
        prices,
        isLoading
    };
}
}),
"[project]/src/features/trading/hooks/useGaslessClose.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * HACKATHON MODE: Gasless close position via backend
 * Backend relayer pays gas, no user signature needed
 */ __turbopack_context__.s([
    "useGaslessClose",
    ()=>useGaslessClose
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$wallet$2f$hooks$2f$useEmbeddedWallet$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/wallet/hooks/useEmbeddedWallet.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
;
;
;
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
function useGaslessClose() {
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$wallet$2f$hooks$2f$useEmbeddedWallet$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEmbeddedWallet"])();
    const [isPending, setIsPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [txHash, setTxHash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])();
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const closePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (params)=>{
        try {
            setIsPending(true);
            setError(null);
            setTxHash(undefined);
            if (!address) {
                throw new Error('Wallet not connected');
            }
            // Call backend endpoint
            const response = await fetch(`${BACKEND_URL}/api/relay/close-position`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userAddress: address,
                    positionId: params.positionId.toString(),
                    symbol: params.symbol
                })
            });
            const result = await response.json();
            if (!response.ok || !result.success) {
                throw new Error(result.error || result.message || 'Failed to close position');
            }
            const hash = result.data.txHash;
            setTxHash(hash);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(`Position closed! TX: ${hash.slice(0, 10)}...`, {
                duration: 5000
            });
            return hash;
        } catch (err) {
            console.error('❌ Error closing position gaslessly:', err);
            setError(err);
            const errorMsg = err.message || 'Unknown error';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`Failed to close: ${errorMsg}`, {
                duration: 7000
            });
            throw err;
        } finally{
            setIsPending(false);
        }
    }, [
        address
    ]);
    return {
        closePosition,
        isPending,
        txHash,
        error
    };
}
}),
"[project]/src/components/layout/ResponsiveSidebar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ResponsiveSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$SidebarContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/SidebarContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function ResponsiveSidebar({ children, className = '' }) {
    const { isExpanded, isMobileOpen, closeMobileSidebar } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$SidebarContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSidebar"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `hidden lg:flex shrink-0 transition-all duration-300 flex-col ${className}`,
                style: {
                    width: isExpanded ? '16vw' : '5vw',
                    minWidth: isExpanded ? '120px' : '50px',
                    maxWidth: isExpanded ? '200px' : '80px'
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/layout/ResponsiveSidebar.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            isMobileOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden fixed inset-0 z-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/80 transition-opacity",
                        onClick: closeMobileSidebar,
                        "aria-label": "Close sidebar"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/ResponsiveSidebar.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-0 top-0 bottom-0 w-64 bg-[#0B1017] transform transition-transform duration-300 ease-out",
                        onClick: (e)=>e.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: closeMobileSidebar,
                                className: "absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors z-10",
                                "aria-label": "Close sidebar",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/ResponsiveSidebar.tsx",
                                    lineNumber: 48,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/ResponsiveSidebar.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Children.map(children, (child)=>/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isValidElement(child) ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].cloneElement(child, {
                                        forceExpanded: true
                                    }) : child)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/ResponsiveSidebar.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/ResponsiveSidebar.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/ResponsiveSidebar.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/components/layout/SidebarContent.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SidebarContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$candlestick$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CandlestickChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-candlestick.js [app-ssr] (ecmascript) <export default as CandlestickChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$vault$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Vault$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/vault.js [app-ssr] (ecmascript) <export default as Vault>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/coins.js [app-ssr] (ecmascript) <export default as Coins>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list.js [app-ssr] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$2x2$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid2x2Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grid-2x2-plus.js [app-ssr] (ecmascript) <export default as Grid2x2Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$SidebarContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/SidebarContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function SidebarContent({ navItems = [
    {
        href: '/trade',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$2x2$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid2x2Plus$3e$__["Grid2x2Plus"],
        label: 'Tap to Trade'
    },
    {
        href: '/market',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$candlestick$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CandlestickChart$3e$__["CandlestickChart"],
        label: 'Market'
    },
    {
        href: '/vaults',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$vault$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Vault$3e$__["Vault"],
        label: 'Vaults'
    },
    {
        href: '/stake',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__["Coins"],
        label: 'Stake'
    },
    {
        href: '/positions',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"],
        label: 'Positions'
    },
    {
        href: '/copy-trade',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"],
        label: 'Copy Trade'
    }
], logoSrc = '/dash-logo.png', logoAlt = 'Dash Logo', brandName = 'Dash', showToggle = true, showBaseBadge = true, forceExpanded = false }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const { isExpanded: contextExpanded, toggleSidebar } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$SidebarContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSidebar"])();
    // Use forceExpanded on mobile, otherwise use context state
    const isExpanded = forceExpanded || contextExpanded;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: `flex flex-col items-start bg-[#0D1017] text-gray-300 h-full pt-6 pb-3 relative w-full rounded-lg ${isExpanded ? 'px-3' : 'px-2'}`,
        children: [
            showToggle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: toggleSidebar,
                className: "hidden lg:flex absolute -right-3 top-8 bg-[#0D1017] border border-gray-700/50 rounded-full p-1.5 text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200 z-10 shadow-lg hover:cursor-pointer",
                "aria-label": isExpanded ? 'Collapse sidebar' : 'Expand sidebar',
                children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                    size: 16
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/SidebarContent.tsx",
                    lineNumber: 66,
                    columnNumber: 25
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                    size: 16
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/SidebarContent.tsx",
                    lineNumber: 66,
                    columnNumber: 53
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/SidebarContent.tsx",
                lineNumber: 61,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "/trade",
                className: `flex items-center mb-8 w-full cursor-pointer hover:opacity-80 transition-opacity ${isExpanded ? 'space-x-3' : 'justify-center'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        src: logoSrc,
                        alt: logoAlt,
                        width: 40,
                        height: 40,
                        className: "rounded-lg",
                        onError: (e)=>{
                            e.currentTarget.style.display = 'none';
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/SidebarContent.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-2xl font-bold text-white tracking-tight whitespace-nowrap",
                        children: brandName
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/SidebarContent.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/SidebarContent.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex flex-col space-y-1 flex-1 w-full",
                children: navItems.map((item)=>{
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: item.href,
                        className: `flex items-center rounded-lg transition-all duration-200 cursor-pointer group relative ${isExpanded ? 'space-x-3 px-3 py-3' : 'justify-center py-3'} ${isActive ? 'bg-blue-300/15 text-blue-300' : 'text-gray-400 hover:bg-gray-800/40 hover:text-white'}`,
                        title: !isExpanded ? item.label : '',
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                className: `transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'} ${isExpanded ? 'w-5 h-5' : 'w-5 h-5'}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SidebarContent.tsx",
                                lineNumber: 109,
                                columnNumber: 15
                            }, this),
                            isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-semibold whitespace-nowrap",
                                children: item.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SidebarContent.tsx",
                                lineNumber: 114,
                                columnNumber: 17
                            }, this),
                            !isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg border border-gray-700",
                                children: item.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SidebarContent.tsx",
                                lineNumber: 119,
                                columnNumber: 17
                            }, this)
                        ]
                    }, item.href, true, {
                        fileName: "[project]/src/components/layout/SidebarContent.tsx",
                        lineNumber: 99,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/layout/SidebarContent.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            showBaseBadge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-auto w-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-lg hover:shadow-blue-300/20 transition-all duration-300 cursor-pointer ${isExpanded ? 'justify-center px-3 py-2.5' : 'justify-center p-2.5'}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            src: "/icons/base.png",
                            alt: "Base Logo",
                            width: 18,
                            height: 18,
                            className: "rounded-full",
                            onError: (e)=>{
                                e.currentTarget.style.display = 'none';
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/SidebarContent.tsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this),
                        isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs font-bold text-white tracking-wide whitespace-nowrap",
                            children: "Build on Base"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/SidebarContent.tsx",
                            lineNumber: 146,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/SidebarContent.tsx",
                    lineNumber: 131,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/SidebarContent.tsx",
                lineNumber: 130,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/SidebarContent.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/layout/MobileHeader.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MobileHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$SidebarContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/SidebarContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function MobileHeader({ logoSrc = '/dash-logo.png', logoAlt = 'Dash', rightContent, className = '' }) {
    const { toggleMobileSidebar } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$SidebarContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSidebar"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `lg:hidden flex items-center justify-between p-3 bg-[#0B1017] flex-shrink-0 rounded-lg mb-2 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: toggleMobileSidebar,
                        className: "p-2 hover:bg-[#1A2332] rounded-lg transition-colors",
                        "aria-label": "Toggle menu",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                            size: 24
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/MobileHeader.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/MobileHeader.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        src: logoSrc,
                        alt: logoAlt,
                        width: 50,
                        height: 50,
                        className: "w-12 h-12",
                        onError: (e)=>{
                            e.currentTarget.style.display = 'none';
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/MobileHeader.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/MobileHeader.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            rightContent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: rightContent
            }, void 0, false, {
                fileName: "[project]/src/components/layout/MobileHeader.tsx",
                lineNumber: 48,
                columnNumber: 24
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/MobileHeader.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/src/components/ui/dialog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Dialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
function DialogClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"], {
        "data-slot": "dialog-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        "data-slot": "dialog-portal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-lg", className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"], {
                        "data-slot": "dialog-close",
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/dialog.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
function DialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-lg leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 focus-visible:ring-offset-trading-bg", {
    variants: {
        variant: {
            // Primary button - uses custom button-primary color
            default: 'bg-button-primary text-text-primary hover:bg-button-primary-hover',
            // Destructive/Error button
            destructive: 'bg-error text-text-primary hover:bg-error-dark',
            // Outline button - uses trading surface colors
            outline: 'border border-border-default bg-transparent hover:bg-trading-elevated hover:text-text-primary',
            // Secondary button - uses custom button-secondary color
            secondary: 'bg-button-secondary text-text-primary hover:bg-button-secondary-hover',
            // Ghost button - transparent with hover
            ghost: 'bg-button-ghost hover:bg-button-ghost-hover hover:text-text-primary',
            // Link button
            link: 'text-info underline-offset-4 hover:underline hover:text-info-light',
            // Trading-specific variants
            long: 'bg-long text-text-primary hover:bg-long-hover',
            short: 'bg-short text-text-primary hover:bg-short-hover',
            swap: 'bg-swap text-text-primary hover:bg-swap-hover',
            // Success/Warning variants
            success: 'bg-success text-text-primary hover:bg-success-dark',
            warning: 'bg-warning text-text-inverse hover:bg-warning-dark'
        },
        size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            xl: 'h-12 rounded-lg px-8 has-[>svg]:px-6 text-base',
            icon: 'size-9',
            'icon-sm': 'size-8',
            'icon-lg': 'size-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
function Button({ className, variant = 'default', size = 'default', asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        "data-variant": variant,
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/components/layout/wallet/NetworkSwitcher.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @next/next/no-img-element */ __turbopack_context__.s([
    "NetworkSwitcher",
    ()=>NetworkSwitcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
'use client';
;
;
const NetworkSwitcher = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative group ml-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                className: "flex items-center justify-center w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg",
                title: "Sepolia Base",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: "data:image/svg+xml,%3Csvg width='111' height='111' viewBox='0 0 111 111' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.921 110.034C85.359 110.034 110.034 85.402 110.034 55.017C110.034 24.6319 85.359 0 54.921 0C26.0432 0 2.35281 22.1714 0 50.3923H72.8467V59.6416H3.9565e-07C2.35281 87.8625 26.0432 110.034 54.921 110.034Z' fill='%230052FF'/%3E%3C/svg%3E",
                    alt: "Base",
                    className: "w-6 h-6"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/wallet/NetworkSwitcher.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/layout/wallet/NetworkSwitcher.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none",
                children: "Sepolia Base"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/wallet/NetworkSwitcher.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/wallet/NetworkSwitcher.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/hooks/wallet/useWalletBalance.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWalletBalance",
    ()=>useWalletBalance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/usePrivy-DDM76RFl.mjs [app-ssr] (ecmascript) <export u as usePrivy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/clients/createPublicClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/clients/transports/http.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatUnits.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/chains/definitions/baseSepolia.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/contracts.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const useWalletBalance = ()=>{
    const { authenticated, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"])();
    const [usdcBalance, setUsdcBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoadingBalance, setIsLoadingBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchUsdcBalance = async ()=>{
            if (!authenticated || !user) return;
            const embeddedWallets = user.linkedAccounts?.filter((account)=>account.type === 'wallet' && account.imported === false && account.id !== undefined);
            const embeddedWalletAddress = embeddedWallets?.[0]?.address || user?.wallet?.address;
            if (!embeddedWalletAddress) return;
            setIsLoadingBalance(true);
            try {
                const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPublicClient"])({
                    chain: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["baseSepolia"],
                    transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"])()
                });
                const balance = await publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["USDC_ADDRESS"],
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
                const formattedBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUnits"])(balance, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["USDC_DECIMALS"]);
                setUsdcBalance(parseFloat(formattedBalance).toFixed(2));
            } catch (error) {
                setUsdcBalance('0.00');
            } finally{
                setIsLoadingBalance(false);
            }
        };
        if (authenticated && user) {
            fetchUsdcBalance();
        }
    }, [
        authenticated,
        user
    ]);
    return {
        usdcBalance,
        isLoadingBalance
    };
};
}),
"[project]/src/hooks/wallet/useWalletActions.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWalletActions",
    ()=>useWalletActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/usePrivy-DDM76RFl.mjs [app-ssr] (ecmascript) <export u as usePrivy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
;
;
const useWalletActions = ()=>{
    const { user, exportWallet, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"])();
    const getEmbeddedWalletAddress = ()=>{
        const embeddedWallets = user?.linkedAccounts?.filter((account)=>account.type === 'wallet' && account.imported === false && account.id !== undefined);
        return embeddedWallets?.[0]?.address || user?.wallet?.address;
    };
    const handleCopyAddress = ()=>{
        const address = getEmbeddedWalletAddress();
        if (address) {
            navigator.clipboard.writeText(address);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Address copied!');
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
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Embedded wallet not found. Please reconnect your wallet.');
                return;
            }
            const embeddedWalletAddress = embeddedWallets[0]?.address;
            if (!embeddedWalletAddress) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Embedded wallet address not found');
                return;
            }
            await exportWallet({
                address: embeddedWalletAddress
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Private key exported successfully!');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(error?.message || 'Failed to export private key');
        }
    };
    const handleDisconnect = ()=>{
        logout();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Wallet disconnected');
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
}),
"[project]/src/hooks/wallet/useUSDCFaucet.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUSDCFaucet",
    ()=>useUSDCFaucet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/usePrivy-DDM76RFl.mjs [app-ssr] (ecmascript) <export u as usePrivy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$SignRequestScreen$2d$BQBgOoh_$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__ae__as__useWallets$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/SignRequestScreen-BQBgOoh_.mjs [app-ssr] (ecmascript) <export ae as useWallets>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeFunctionData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/abi/encodeFunctionData.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/contracts.ts [app-ssr] (ecmascript)");
;
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
    const { authenticated, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"])();
    const { wallets } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$SignRequestScreen$2d$BQBgOoh_$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__ae__as__useWallets$3e$__["useWallets"])();
    const [isClaiming, setIsClaiming] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleClaimUSDC = async ()=>{
        if (!authenticated || !user) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Please connect your wallet first');
            return;
        }
        const embeddedWallet = wallets.find((w)=>w.walletClientType === 'privy');
        if (!embeddedWallet) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Embedded wallet not found');
            return;
        }
        const walletAddress = embeddedWallet.address;
        setIsClaiming(true);
        const loadingToast = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].loading('Checking claim status...');
        try {
            const provider = await embeddedWallet.getEthereumProvider();
            if (!provider) throw new Error('Could not get wallet provider');
            // Check if user has already claimed
            const hasClaimedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeFunctionData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeFunctionData"])({
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
                        to: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["USDC_ADDRESS"],
                        data: hasClaimedData
                    },
                    'latest'
                ]
            });
            const alreadyClaimed = hasClaimedResult !== '0x0000000000000000000000000000000000000000000000000000000000000000';
            if (alreadyClaimed) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('You have already claimed USDC from the faucet. Each wallet can only claim once.', {
                    id: loadingToast,
                    duration: 5000
                });
                return;
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].loading('Claiming USDC from faucet...', {
                id: loadingToast
            });
            const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeFunctionData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeFunctionData"])({
                abi: MOCK_USDC_ABI,
                functionName: 'faucet',
                args: []
            });
            const txHash = await provider.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: walletAddress,
                        to: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["USDC_ADDRESS"],
                        data: data
                    }
                ]
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('USDC claimed successfully! 🎉', {
                id: loadingToast,
                duration: 4000
            });
            // Show transaction link
            setTimeout(()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "View on Explorer:"
                        }, void 0, false, {
                            fileName: "[project]/src/hooks/wallet/useUSDCFaucet.tsx",
                            lineNumber: 120,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorMessage, {
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
}),
"[project]/src/components/layout/wallet/WalletDialogContent.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletDialogContent",
    ()=>WalletDialogContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-ssr] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-ssr] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.js [app-ssr] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/key.js [app-ssr] (ecmascript) <export default as Key>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-ssr] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$wallet$2f$useWalletBalance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/wallet/useWalletBalance.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$wallet$2f$useWalletActions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/wallet/useWalletActions.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$wallet$2f$useUSDCFaucet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/wallet/useUSDCFaucet.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const WalletDialogContent = ()=>{
    const { usdcBalance, isLoadingBalance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$wallet$2f$useWalletBalance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWalletBalance"])();
    const { shortAddress, handleCopyAddress, handleViewExplorer, handleExportPrivateKey, handleDisconnect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$wallet$2f$useWalletActions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWalletActions"])();
    const { isClaiming, handleClaimUSDC } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$wallet$2f$useUSDCFaucet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUSDCFaucet"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-5 border-b border-slate-700/50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-bold text-slate-100",
                                children: "Dash Wallet"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogClose"], {
                                asChild: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "text-slate-400 hover:text-slate-200 transition-colors cursor-pointer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                        lineNumber: 29,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                    lineNumber: 28,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                lineNumber: 27,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2.5 px-3 py-2.5 bg-slate-800/50 rounded-xl flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                            className: "w-3.5 h-3.5 text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                            lineNumber: 39,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                        lineNumber: 38,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-100 font-medium text-sm",
                                        children: shortAddress
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                        lineNumber: 41,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleCopyAddress,
                                        className: "p-1 hover:bg-slate-700/50 rounded-md transition-colors ml-auto cursor-pointer",
                                        title: "Copy Address",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                            className: "w-3.5 h-3.5 text-slate-400 hover:text-slate-200"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                            lineNumber: 47,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                        lineNumber: 42,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleViewExplorer,
                                className: "p-2.5 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl transition-colors cursor-pointer",
                                title: "View on Explorer",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                    className: "w-4 h-4 text-slate-400 hover:text-slate-200"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleExportPrivateKey,
                                className: "p-2.5 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl transition-colors cursor-pointer",
                                title: "Export Private Key",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__["Key"], {
                                    className: "w-4 h-4 text-slate-400 hover:text-slate-200"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleDisconnect,
                                className: "p-2.5 bg-red-500 hover:bg-red-600 rounded-xl transition-colors cursor-pointer",
                                title: "Disconnect",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                    className: "w-4 h-4 text-white hover:text-white"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-5 border-b border-slate-700/50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-slate-400 text-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Balance"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                    lineNumber: 82,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-white text-[10px] font-bold",
                                            children: "$"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                            lineNumber: 86,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                        lineNumber: 85,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-100 text-sm font-medium",
                                        children: "USDC"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                        lineNumber: 88,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-4xl font-bold text-slate-100 mb-5",
                        children: isLoadingBalance ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-slate-400 text-2xl",
                            children: "Loading..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                "$",
                                usdcBalance || '0.00'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "py-3 px-4 bg-slate-700/50 hover:bg-slate-700 rounded-xl text-slate-100 font-medium transition-colors cursor-pointer",
                                children: "Deposit"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "py-3 px-4 bg-slate-700/50 hover:bg-slate-700 rounded-xl text-slate-100 font-medium transition-colors cursor-pointer",
                                children: "Withdraw"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleClaimUSDC,
                                disabled: isClaiming,
                                className: "py-3 px-4 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-colors cursor-pointer flex items-center justify-center gap-2",
                                title: "Claim 100 Mock USDC",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                        lineNumber: 114,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    isClaiming ? 'Claiming...' : 'Claim'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-semibold text-slate-100 mb-3",
                        children: "Funding Activity"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Search",
                                className: "w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-slate-600 transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                    lineNumber: 137,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-8 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-500 text-sm",
                            children: "No funding activity yet"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                            lineNumber: 148,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/wallet/WalletDialogContent.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
}),
"[project]/src/components/layout/WalletConnectButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @next/next/no-img-element */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/usePrivy-DDM76RFl.mjs [app-ssr] (ecmascript) <export u as usePrivy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useSwitchChain.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useChainId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useChainId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/chains/definitions/baseSepolia.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.js [app-ssr] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$wallet$2f$NetworkSwitcher$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/wallet/NetworkSwitcher.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$wallet$2f$WalletDialogContent$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/wallet/WalletDialogContent.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$wallet$2f$useWalletActions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/wallet/useWalletActions.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
const WalletConnectButton = ()=>{
    const { ready, authenticated, login, user, createWallet } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"])();
    const { switchChain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSwitchChain"])();
    const chainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useChainId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChainId"])();
    const { shortAddress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$wallet$2f$useWalletActions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWalletActions"])();
    // Auto-create embedded wallet when user connects with external wallet
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const autoCreateEmbeddedWallet = async ()=>{
            if (!authenticated || !user) return;
            const embeddedWallets = user.linkedAccounts?.filter((account)=>account.type === 'wallet' && account.imported === false && account.id !== undefined);
            if (!embeddedWallets || embeddedWallets.length === 0) {
                const toastId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].loading('Setting up your embedded wallet...');
                try {
                    await createWallet();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Embedded wallet created successfully!', {
                        id: toastId,
                        duration: 3000
                    });
                } catch (error) {
                    if (error?.message?.includes('already has')) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].dismiss(toastId);
                    } else {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Failed to create embedded wallet', {
                            id: toastId
                        });
                    }
                }
            }
        };
        autoCreateEmbeddedWallet();
    }, [
        authenticated,
        user,
        createWallet
    ]);
    // Auto-switch to Base when authenticated
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (authenticated && chainId !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["baseSepolia"].id) {
            switchChain({
                chainId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["baseSepolia"].id
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Switching to Base Sepolia network...');
        }
    }, [
        authenticated,
        chainId,
        switchChain
    ]);
    if (!ready) {
        return null;
    }
    if (authenticated) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTrigger"], {
                            asChild: true,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg px-5 py-3 text-base font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/WalletConnectButton.tsx",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    shortAddress
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/WalletConnectButton.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/WalletConnectButton.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                            className: "w-full max-w-[520px] bg-[#16181D] border-slate-700/50 text-slate-100 p-0 overflow-hidden",
                            showCloseButton: false,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$wallet$2f$WalletDialogContent$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WalletDialogContent"], {}, void 0, false, {
                                fileName: "[project]/src/components/layout/WalletConnectButton.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/WalletConnectButton.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/WalletConnectButton.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$wallet$2f$NetworkSwitcher$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NetworkSwitcher"], {}, void 0, false, {
                    fileName: "[project]/src/components/layout/WalletConnectButton.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/WalletConnectButton.tsx",
            lineNumber: 69,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: login,
                className: "flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg md:px-5 px-3 md:py-3 py-1 text-base font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/WalletConnectButton.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    "Connect wallet"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/WalletConnectButton.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative group",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "flex items-center justify-center w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg",
                        title: "Sepolia Base",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "data:image/svg+xml,%3Csvg width='111' height='111' viewBox='0 0 111 111' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.921 110.034C85.359 110.034 110.034 85.402 110.034 55.017C110.034 24.6319 85.359 0 54.921 0C26.0432 0 2.35281 22.1714 0 50.3923H72.8467V59.6416H3.9565e-07C2.35281 87.8625 26.0432 110.034 54.921 110.034Z' fill='%230052FF'/%3E%3C/svg%3E",
                            alt: "Base",
                            className: "w-6 h-6"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/WalletConnectButton.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/WalletConnectButton.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none",
                        children: "Sepolia Base"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/WalletConnectButton.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/WalletConnectButton.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/WalletConnectButton.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = WalletConnectButton;
}),
"[project]/src/components/layout/Navbar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$WalletConnectButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/WalletConnectButton.tsx [app-ssr] (ecmascript)");
"use client";
;
;
function Navbar({ title, subtitle, leftContent, centerContent, rightContent, showWalletButton = true, className = "", variant = "default" }) {
    const getVariantClasses = ()=>{
        switch(variant){
            case "transparent":
                return "bg-transparent";
            case "gradient":
                return "bg-gradient-to-r from-slate-900 to-slate-800";
            case "default":
            default:
                return "bg-[#0B1017]";
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: `hidden lg:flex items-center justify-between px-4 py-3 rounded-lg ${getVariantClasses()} ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 flex-1",
                children: leftContent ? leftContent : title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-xl font-bold text-white",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Navbar.tsx",
                            lineNumber: 49,
                            columnNumber: 13
                        }, this),
                        subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-400",
                            children: subtitle
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Navbar.tsx",
                            lineNumber: 50,
                            columnNumber: 26
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Navbar.tsx",
                    lineNumber: 48,
                    columnNumber: 11
                }, this) : null
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Navbar.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            centerContent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center flex-1",
                children: centerContent
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Navbar.tsx",
                lineNumber: 57,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 flex-1 justify-end",
                children: rightContent ? rightContent : showWalletButton ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$WalletConnectButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/components/layout/Navbar.tsx",
                    lineNumber: 67,
                    columnNumber: 11
                }, this) : null
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Navbar.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Navbar.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/layout/PageLayout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PageLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$ResponsiveSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/ResponsiveSidebar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SidebarContent$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/SidebarContent.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$MobileHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/MobileHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Navbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/Navbar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$WalletConnectButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/WalletConnectButton.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function PageLayout({ children, navbar, mobileHeader, showNavbar = true, showSidebar = true, showMobileHeader = true, className = '', contentClassName = '', mobileHeaderContent }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: `min-h-screen bg-black text-white p-2 ${className}`,
        children: [
            showMobileHeader && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$MobileHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                rightContent: mobileHeader?.rightContent || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$WalletConnectButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/components/layout/PageLayout.tsx",
                    lineNumber: 53,
                    columnNumber: 55
                }, void 0),
                logoSrc: mobileHeader?.logoSrc,
                logoAlt: mobileHeader?.logoAlt
            }, void 0, false, {
                fileName: "[project]/src/components/layout/PageLayout.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex w-full h-screen gap-2",
                children: [
                    showSidebar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$ResponsiveSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SidebarContent$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/components/layout/PageLayout.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/PageLayout.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto lg:p-0 p-2 flex flex-col gap-2",
                        children: [
                            showNavbar && navbar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Navbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                title: navbar.title,
                                subtitle: navbar.subtitle,
                                leftContent: navbar.leftContent,
                                centerContent: navbar.centerContent,
                                rightContent: navbar.rightContent,
                                showWalletButton: navbar.showWalletButton,
                                variant: navbar.variant
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/PageLayout.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex-1 overflow-y-auto lg:p-6 p-4 ${contentClassName}`,
                                children: [
                                    mobileHeaderContent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-6 lg:hidden",
                                        children: mobileHeaderContent
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/PageLayout.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this) : navbar?.title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-6 lg:hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-3xl font-bold mb-2",
                                                children: navbar.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/PageLayout.tsx",
                                                lineNumber: 89,
                                                columnNumber: 17
                                            }, this),
                                            navbar.subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-400 text-sm",
                                                children: navbar.subtitle
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/PageLayout.tsx",
                                                lineNumber: 90,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/PageLayout.tsx",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this) : null,
                                    children
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/PageLayout.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/PageLayout.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/PageLayout.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/PageLayout.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/trading/hooks/useTPSL.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAllTPSL",
    ()=>useAllTPSL,
    "useTPSL",
    ()=>useTPSL,
    "useTPSLConfig",
    ()=>useTPSLConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/contracts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
;
;
;
function useTPSL() {
    const [isPending, setIsPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    /**
   * Set or update TP/SL for a position
   */ const setTPSL = async (request)=>{
        setIsPending(true);
        setError(null);
        try {
            const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BACKEND_API_URL"]}/api/tpsl/set`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to set TP/SL');
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('✅ TP/SL saved successfully!');
            return true;
        } catch (err) {
            const errorMsg = err.message || 'Failed to set TP/SL';
            setError(errorMsg);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorMsg);
            return false;
        } finally{
            setIsPending(false);
        }
    };
    /**
   * Get TP/SL config for a position
   */ const getTPSL = async (positionId)=>{
        try {
            const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BACKEND_API_URL"]}/api/tpsl/${positionId}`);
            const data = await response.json();
            if (!response.ok || !data.success) {
                return null;
            }
            return data.data;
        } catch (err) {
            console.error('Error fetching TP/SL:', err);
            return null;
        }
    };
    /**
   * Delete TP/SL config for a position
   */ const deleteTPSL = async (positionId, trader)=>{
        setIsPending(true);
        setError(null);
        try {
            const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BACKEND_API_URL"]}/api/tpsl/${positionId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    trader
                })
            });
            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to delete TP/SL');
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('TP/SL removed');
            return true;
        } catch (err) {
            const errorMsg = err.message || 'Failed to delete TP/SL';
            setError(errorMsg);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorMsg);
            return false;
        } finally{
            setIsPending(false);
        }
    };
    return {
        setTPSL,
        getTPSL,
        deleteTPSL,
        isPending,
        error
    };
}
function useAllTPSL() {
    // This is now just a wrapper for backward compatibility
    // Real implementation is in TPSLContext
    console.warn('useAllTPSL is deprecated. Use useTPSLContext from TPSLContext instead.');
    const [configs, setConfigs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return {
        configs,
        isLoading,
        refresh: async ()=>{}
    };
}
function useTPSLConfig(positionId) {
    // Simple non-context version for components that don't have context yet
    // Returns empty config - components should migrate to use TPSLContext
    return {
        config: null,
        isLoading: false,
        refresh: ()=>{}
    };
}
}),
"[project]/src/features/trading/components/modals/TPSLModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$trading$2f$hooks$2f$useTPSL$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/trading/hooks/useTPSL.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$data$2f$usePrices$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/data/usePrices.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const TPSLModal = ({ isOpen, onClose, positionId, trader, symbol, entryPrice, isLong })=>{
    const [takeProfitPrice, setTakeProfitPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [stopLossPrice, setStopLossPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [takeProfitError, setTakeProfitError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [stopLossError, setStopLossError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const { setTPSL, getTPSL, deleteTPSL, isPending } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$trading$2f$hooks$2f$useTPSL$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTPSL"])();
    // Fetch real-time price from backend
    const { price: priceData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$data$2f$usePrices$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePrice"])(symbol);
    const currentPrice = priceData?.price || entryPrice; // Fallback to entry if no price
    // Load existing TP/SL on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen) {
            loadExistingTPSL();
        }
    }, [
        isOpen,
        positionId
    ]);
    const loadExistingTPSL = async ()=>{
        const config = await getTPSL(positionId);
        if (config) {
            // Convert from 8 decimals to readable price
            if (config.takeProfit) {
                const tpPrice = parseFloat(config.takeProfit) / 100000000;
                setTakeProfitPrice(tpPrice.toString());
            }
            if (config.stopLoss) {
                const slPrice = parseFloat(config.stopLoss) / 100000000;
                setStopLossPrice(slPrice.toString());
            }
        }
    };
    // Validate TP/SL prices - use CURRENT price, not entry price
    const validatePrices = ()=>{
        let isValid = true;
        setTakeProfitError('');
        setStopLossError('');
        if (takeProfitPrice) {
            const tp = parseFloat(takeProfitPrice);
            if (isNaN(tp) || tp <= 0) {
                setTakeProfitError('Invalid price');
                isValid = false;
            } else if (isLong && tp <= currentPrice) {
                setTakeProfitError('TP must be above current price for Long');
                isValid = false;
            } else if (!isLong && tp >= currentPrice) {
                setTakeProfitError('TP must be below current price for Short');
                isValid = false;
            }
        }
        if (stopLossPrice) {
            const sl = parseFloat(stopLossPrice);
            if (isNaN(sl) || sl <= 0) {
                setStopLossError('Invalid price');
                isValid = false;
            } else if (isLong && sl >= currentPrice) {
                setStopLossError('SL must be below current price for Long');
                isValid = false;
            } else if (!isLong && sl <= currentPrice) {
                setStopLossError('SL must be above current price for Short');
                isValid = false;
            }
        // SL+ is allowed: SL can be above entry (for profit lock) as long as below current
        }
        if (!takeProfitPrice && !stopLossPrice) {
            setTakeProfitError('At least one of TP or SL required');
            isValid = false;
        }
        return isValid;
    };
    const handleSave = async ()=>{
        if (!validatePrices()) return;
        const success = await setTPSL({
            positionId,
            trader,
            takeProfit: takeProfitPrice || undefined,
            stopLoss: stopLossPrice || undefined
        });
        if (success) {
            onClose(true);
        }
    };
    const handleDelete = async ()=>{
        const success = await deleteTPSL(positionId, trader);
        if (success) {
            setTakeProfitPrice('');
            setStopLossPrice('');
            onClose(true);
        }
    };
    const calculatePnL = (targetPrice)=>{
        if (!targetPrice || targetPrice <= 0) return {
            pnl: 0,
            percentage: 0
        };
        const priceDiff = isLong ? targetPrice - entryPrice : entryPrice - targetPrice;
        const percentage = priceDiff / entryPrice * 100;
        return {
            percentage
        };
    };
    if (!isOpen) return null;
    const tpPnL = calculatePnL(parseFloat(takeProfitPrice));
    const slPnL = calculatePnL(parseFloat(stopLossPrice));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#0F1419] border border-gray-700 rounded-lg shadow-2xl w-full max-w-md mx-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between p-4 border-b border-gray-700",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold text-white",
                                    children: "Set TP/SL"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-400",
                                    children: [
                                        symbol,
                                        "/USD • ",
                                        isLong ? 'Long' : 'Short',
                                        " • Entry: $",
                                        entryPrice.toFixed(2)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onClose(false),
                            className: "text-gray-400 hover:text-white transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                            lineNumber: 151,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                    lineNumber: 144,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-800/50 rounded-lg p-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-gray-400",
                                        children: "Current Price"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                                        lineNumber: 164,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white font-medium",
                                        children: [
                                            "$",
                                            currentPrice.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                                        lineNumber: 165,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                                lineNumber: 163,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm text-gray-400 mb-2",
                                    children: "Take Profit Price"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            step: "0.01",
                                            placeholder: `e.g., ${isLong ? (entryPrice * 1.1).toFixed(2) : (entryPrice * 0.9).toFixed(2)}`,
                                            value: takeProfitPrice,
                                            onChange: (e)=>{
                                                setTakeProfitPrice(e.target.value);
                                                setTakeProfitError('');
                                            },
                                            className: `w-full bg-[#1A2332] border ${takeProfitError ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2.5 text-white outline-none focus:border-blue-500 transition-colors`
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                                            lineNumber: 173,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        takeProfitPrice && !takeProfitError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `absolute right-3 top-1/2 -translate-y-1/2 text-sm ${tpPnL.percentage >= 0 ? 'text-green-400' : 'text-red-400'}`,
                                            children: [
                                                tpPnL.percentage >= 0 ? '+' : '',
                                                tpPnL.percentage.toFixed(2),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                                            lineNumber: 189,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                takeProfitError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-red-400 mt-1",
                                    children: takeProfitError
                                }, void 0, false, {
                                    fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                                    lineNumber: 199,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-gray-500 mt-1",
                                    children: isLong ? 'Must be above current price' : 'Must be below current price'
                                }, void 0, false, {
                                    fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                                    lineNumber: 200,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                            lineNumber: 170,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm text-gray-400 mb-2",
                                    children: "Stop Loss Price"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                                    lineNumber: 207,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            step: "0.01",
                                            placeholder: `e.g., ${isLong ? (entryPrice * 0.95).toFixed(2) : (entryPrice * 1.05).toFixed(2)}`,
                                            value: stopLossPrice,
                                            onChange: (e)=>{
                                                setStopLossPrice(e.target.value);
                                                setStopLossError('');
                                            },
                                            className: `w-full bg-[#1A2332] border ${stopLossError ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2.5 text-white outline-none focus:border-blue-500 transition-colors`
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                                            lineNumber: 209,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        stopLossPrice && !stopLossError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `absolute right-3 top-1/2 -translate-y-1/2 text-sm ${slPnL.percentage >= 0 ? 'text-green-400' : 'text-red-400'}`,
                                            children: [
                                                slPnL.percentage >= 0 ? '+' : '',
                                                slPnL.percentage.toFixed(2),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                                            lineNumber: 225,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                                    lineNumber: 208,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                stopLossError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-red-400 mt-1",
                                    children: stopLossError
                                }, void 0, false, {
                                    fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                                    lineNumber: 235,
                                    columnNumber: 31
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-gray-500 mt-1",
                                    children: isLong ? 'Must be below current price (can be above entry for SL+)' : 'Must be above current price (can be below entry for SL+)'
                                }, void 0, false, {
                                    fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                                    lineNumber: 236,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                            lineNumber: 206,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-blue-500/10 border border-blue-500/30 rounded-lg p-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-blue-400",
                                children: "💡 TP/SL will be monitored by the backend and executed automatically when price targets are hit. Settings are stored in memory and will be lost on backend restart."
                            }, void 0, false, {
                                fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                                lineNumber: 245,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                            lineNumber: 244,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                    lineNumber: 160,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2 p-4 border-t border-gray-700",
                    children: [
                        (takeProfitPrice || stopLossPrice) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleDelete,
                            disabled: isPending,
                            className: "px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors disabled:opacity-50",
                            children: "Remove"
                        }, void 0, false, {
                            fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                            lineNumber: 255,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onClose(false),
                            className: "flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                            lineNumber: 263,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSave,
                            disabled: isPending,
                            className: "flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50",
                            children: isPending ? 'Saving...' : 'Save TP/SL'
                        }, void 0, false, {
                            fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                            lineNumber: 269,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
                    lineNumber: 253,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
            lineNumber: 142,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/trading/components/modals/TPSLModal.tsx",
        lineNumber: 141,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = TPSLModal;
}),
"[project]/src/features/trading/constants/markets.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_MARKETS",
    ()=>ALL_MARKETS
]);
const letterLogo = (text, bg, fg = '#0B0F1A')=>`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><rect width='64' height='64' rx='32' ry='32' fill='${encodeURIComponent(bg)}'/><text x='50%' y='54%' font-family='Inter,Arial,sans-serif' font-size='28' font-weight='700' fill='${encodeURIComponent(fg)}' text-anchor='middle' dominant-baseline='middle'>${encodeURIComponent(text)}</text></svg>`;
const ALL_MARKETS = [
    {
        symbol: 'BTC',
        tradingViewSymbol: 'BINANCE:BTCUSDT',
        logoUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png',
        binanceSymbol: 'BTCUSDT',
        category: 'crypto',
        maxLeverage: 100
    },
    {
        symbol: 'ETH',
        tradingViewSymbol: 'BINANCE:ETHUSDT',
        logoUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
        binanceSymbol: 'ETHUSDT',
        category: 'crypto',
        maxLeverage: 100
    },
    {
        symbol: 'SOL',
        tradingViewSymbol: 'BINANCE:SOLUSDT',
        logoUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png',
        binanceSymbol: 'SOLUSDT',
        category: 'crypto',
        maxLeverage: 100
    },
    {
        symbol: 'AVAX',
        tradingViewSymbol: 'BINANCE:AVAXUSDT',
        logoUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanchex/info/logo.png',
        binanceSymbol: 'AVAXUSDT',
        category: 'crypto',
        maxLeverage: 100
    },
    {
        symbol: 'BNB',
        tradingViewSymbol: 'BINANCE:BNBUSDT',
        logoUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png',
        binanceSymbol: 'BNBUSDT',
        category: 'crypto',
        maxLeverage: 100
    },
    {
        symbol: 'XRP',
        tradingViewSymbol: 'BINANCE:XRPUSDT',
        logoUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ripple/info/logo.png',
        binanceSymbol: 'XRPUSDT',
        category: 'crypto',
        maxLeverage: 100
    },
    {
        symbol: 'AAVE',
        tradingViewSymbol: 'BINANCE:AAVEUSDT',
        logoUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png',
        binanceSymbol: 'AAVEUSDT',
        category: 'crypto',
        maxLeverage: 100
    },
    {
        symbol: 'ARB',
        tradingViewSymbol: 'BINANCE:ARBUSDT',
        logoUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png',
        binanceSymbol: 'ARBUSDT',
        category: 'crypto',
        maxLeverage: 100
    },
    {
        symbol: 'CRV',
        tradingViewSymbol: 'BINANCE:CRVUSDT',
        logoUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xD533a949740bb3306d119CC777fa900bA034cd52/logo.png',
        binanceSymbol: 'CRVUSDT',
        category: 'crypto',
        maxLeverage: 100
    },
    {
        symbol: 'DOGE',
        tradingViewSymbol: 'BINANCE:DOGEUSDT',
        logoUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/doge/info/logo.png',
        binanceSymbol: 'DOGEUSDT',
        category: 'crypto',
        maxLeverage: 100
    },
    {
        symbol: 'LINK',
        tradingViewSymbol: 'BINANCE:LINKUSDT',
        logoUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png',
        binanceSymbol: 'LINKUSDT',
        category: 'crypto',
        maxLeverage: 100
    },
    {
        symbol: 'PEPE',
        tradingViewSymbol: 'BINANCE:1000PEPEUSDT',
        logoUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6982508145454Ce325dDbE47a25d4ec3d2311933/logo.png',
        binanceSymbol: '1000PEPEUSDT',
        category: 'crypto',
        maxLeverage: 100
    },
    // Forex
    {
        symbol: 'EURUSD',
        tradingViewSymbol: 'OANDA:EURUSD',
        logoUrl: letterLogo('€', '#C7D2FE', '#111827'),
        category: 'forex',
        maxLeverage: 100
    },
    {
        symbol: 'GBPUSD',
        tradingViewSymbol: 'OANDA:GBPUSD',
        logoUrl: letterLogo('£', '#BFDBFE', '#0B0F1A'),
        category: 'forex',
        maxLeverage: 100
    },
    // Commodities
    {
        symbol: 'XAUUSD',
        tradingViewSymbol: 'OANDA:XAUUSD',
        logoUrl: letterLogo('Au', '#FDE68A', '#0B0F1A'),
        category: 'commodities',
        maxLeverage: 100
    },
    {
        symbol: 'XAGUSD',
        tradingViewSymbol: 'OANDA:XAGUSD',
        logoUrl: letterLogo('Ag', '#E5E7EB', '#0B0F1A'),
        category: 'commodities',
        maxLeverage: 100
    },
    // Indices / ETFs
    {
        symbol: 'QQQUSD',
        tradingViewSymbol: 'NASDAQ:QQQ',
        logoUrl: letterLogo('QQQ', '#C084FC', '#0B0F1A'),
        category: 'indices',
        maxLeverage: 100
    },
    {
        symbol: 'SPYUSD',
        tradingViewSymbol: 'AMEX:SPY',
        logoUrl: letterLogo('SPY', '#A7F3D0', '#0B0F1A'),
        category: 'indices',
        maxLeverage: 100
    },
    // Stocks
    {
        symbol: 'AAPLUSD',
        tradingViewSymbol: 'NASDAQ:AAPL',
        logoUrl: letterLogo('AAPL', '#D8B4FE', '#0B0F1A'),
        category: 'stocks',
        maxLeverage: 100
    },
    {
        symbol: 'GOOGLUSD',
        tradingViewSymbol: 'NASDAQ:GOOGL',
        logoUrl: letterLogo('GOOG', '#BFDBFE', '#0B0F1A'),
        category: 'stocks',
        maxLeverage: 100
    }
];
}),
"[project]/src/app/positions/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PositionsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$trading$2f$lib$2f$marketUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/trading/lib/marketUtils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$data$2f$usePositions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/data/usePositions.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$data$2f$usePrices$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/data/usePrices.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$trading$2f$hooks$2f$useGaslessClose$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/trading/hooks/useGaslessClose.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatUnits.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$PageLayout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/PageLayout.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$trading$2f$components$2f$modals$2f$TPSLModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/trading/components/modals/TPSLModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/contracts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contracts$2f$abis$2f$PositionManager$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/contracts/abis/PositionManager.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$trading$2f$constants$2f$markets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/trading/constants/markets.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// Component to display individual position
const PositionRow = ({ positionId, onClose, onTPSLClick, onPositionLoaded })=>{
    const { position, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$data$2f$usePositions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePosition"])(positionId);
    // Use shared price hook - all positions with same symbol share same price
    const { price: priceData, isLoading: loadingPrice } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$data$2f$usePrices$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePrice"])(position?.symbol);
    const currentPrice = priceData?.price || null;
    // Report position status when loaded
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isLoading && position && onPositionLoaded) {
            onPositionLoaded(positionId, position.status === 0);
        }
    }, [
        isLoading,
        position,
        positionId,
        onPositionLoaded
    ]);
    if (isLoading) {
        return null;
    }
    if (!position) {
        return null;
    }
    // Only show open positions
    if (position.status !== 0) {
        return null;
    }
    const entryPrice = parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUnits"])(position.entryPrice, 8));
    const collateral = parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUnits"])(position.collateral, 6));
    const size = parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUnits"])(position.size, 6));
    const leverage = Number(position.leverage);
    // Calculate unrealized PnL and net value
    let unrealizedPnl = 0;
    let pnlPercentage = 0;
    let netValue = collateral;
    const markPrice = currentPrice || entryPrice;
    if (currentPrice && entryPrice > 0) {
        const priceDiff = position.isLong ? currentPrice - entryPrice : entryPrice - currentPrice;
        unrealizedPnl = priceDiff / entryPrice * size;
        pnlPercentage = unrealizedPnl / collateral * 100;
        netValue = collateral + unrealizedPnl;
    }
    // Calculate liquidation price (simplified)
    const liqPriceRatio = collateral / size * 0.9;
    const liquidationPrice = position.isLong ? entryPrice * (1 - liqPriceRatio) : entryPrice * (1 + liqPriceRatio);
    const pnlColor = unrealizedPnl >= 0 ? 'text-green-400' : 'text-red-400';
    // Get crypto logo URL from ALL_MARKETS
    const getMarketLogo = (symbol)=>{
        const market = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$trading$2f$constants$2f$markets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ALL_MARKETS"].find((m)=>m.symbol === symbol);
        return market?.logoUrl || '';
    };
    // Handle TP/SL button click
    const handleTPSLClick = (e)=>{
        e.stopPropagation();
        onTPSLClick(position.id, position.trader, position.symbol, entryPrice, position.isLong);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        className: "border-t border-gray-800/50 hover:bg-gray-800/30 transition-colors",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-white font-mono text-sm",
                        children: [
                            position.trader.slice(0, 6),
                            "...",
                            position.trader.slice(-4)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/positions/page.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/app/positions/page.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/positions/page.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `text-sm font-semibold ${position.isLong ? 'text-green-400' : 'text-red-400'}`,
                    children: [
                        position.isLong ? 'LONG' : 'SHORT',
                        " ",
                        leverage.toFixed(0),
                        "x"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/positions/page.tsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/positions/page.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: getMarketLogo(position.symbol),
                            alt: position.symbol,
                            className: "w-6 h-6 rounded-full bg-slate-700",
                            onError: (e)=>{
                                const target = e.currentTarget;
                                target.onerror = null;
                                target.style.visibility = 'hidden';
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/positions/page.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-semibold text-white",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$trading$2f$lib$2f$marketUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMarketPair"])(position.symbol)
                        }, void 0, false, {
                            fileName: "[project]/src/app/positions/page.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/positions/page.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/positions/page.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-white",
                    children: [
                        collateral.toFixed(2),
                        " USDC"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/positions/page.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/positions/page.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-white",
                    children: [
                        size.toFixed(2),
                        " USDC"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/positions/page.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/positions/page.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `font-semibold ${pnlColor}`,
                            children: [
                                unrealizedPnl >= 0 ? '+' : '',
                                "$",
                                unrealizedPnl.toFixed(2)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/positions/page.tsx",
                            lineNumber: 151,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        currentPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `text-xs ${pnlColor}`,
                            children: [
                                "(",
                                pnlPercentage >= 0 ? '+' : '',
                                pnlPercentage.toFixed(2),
                                "%)"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/positions/page.tsx",
                            lineNumber: 155,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/positions/page.tsx",
                    lineNumber: 150,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/positions/page.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-white",
                    children: [
                        "$",
                        entryPrice.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/positions/page.tsx",
                    lineNumber: 165,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/positions/page.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/positions/page.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
function PositionsPageContent() {
    const { closePosition, isPending: isClosing, txHash } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$trading$2f$hooks$2f$useGaslessClose$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGaslessClose"])();
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const itemsPerPage = 10;
    // TP/SL Modal state
    const [tpslModalOpen, setTpslModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tpslModalData, setTpslModalData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tpslRefreshTrigger, setTpslRefreshTrigger] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // Track open positions
    const [openPositionIds, setOpenPositionIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Get the next position ID to know how many positions exist
    const { data: nextPositionId, isLoading: isLoadingNextId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["POSITION_MANAGER_ADDRESS"],
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contracts$2f$abis$2f$PositionManager$2e$json__$28$json$29$__["default"],
        functionName: 'nextPositionId',
        query: {
            refetchInterval: 5000
        }
    });
    // Generate array of all position IDs (newest first - descending order)
    const allPositionIds = nextPositionId ? Array.from({
        length: Number(nextPositionId) - 1
    }, (_, i)=>BigInt(Number(nextPositionId) - 1 - i)) : [];
    // Handle position loaded - track if position is open
    const handlePositionLoaded = (positionId, isOpen)=>{
        setOpenPositionIds((prev)=>{
            if (isOpen) {
                // Add to list if not already there
                if (!prev.includes(positionId)) {
                    return [
                        ...prev,
                        positionId
                    ].sort((a, b)=>Number(b) - Number(a)); // Sort descending (newest first)
                }
                return prev;
            } else {
                // Remove from list if closed
                return prev.filter((id)=>id !== positionId);
            }
        });
    };
    // Calculate pagination based on open positions
    const totalOpenPositions = openPositionIds.length;
    const totalPages = Math.ceil(totalOpenPositions / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPositionIds = openPositionIds.slice(startIndex, endIndex);
    // Reset to page 1 when positions change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(1);
        }
    }, [
        totalPages,
        currentPage
    ]);
    // Listen for TP/SL updates from other components
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleTPSLUpdate = ()=>{
            setTpslRefreshTrigger((prev)=>prev + 1);
        };
        window.addEventListener('tpsl-updated', handleTPSLUpdate);
        return ()=>window.removeEventListener('tpsl-updated', handleTPSLUpdate);
    }, []);
    // Handle TP/SL modal open
    const handleTPSLModalOpen = (positionId, trader, symbol, entryPrice, isLong)=>{
        setTpslModalData({
            positionId: Number(positionId),
            trader,
            symbol,
            entryPrice,
            isLong
        });
        setTpslModalOpen(true);
    };
    // Handle TP/SL modal close - trigger refetch
    const handleTPSLModalClose = ()=>{
        setTpslModalOpen(false);
        // Trigger refetch by incrementing counter
        setTpslRefreshTrigger((prev)=>prev + 1);
    };
    // Handle close position - GASLESS via backend
    const handleClosePosition = async (positionId, symbol)=>{
        if (isClosing) return;
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].loading('Closing position gaslessly...', {
                id: 'close-position'
            });
            await closePosition({
                positionId,
                symbol
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].dismiss('close-position');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].dismiss('close-position');
        }
    };
    const isLoading = isLoadingNextId;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#0D1017] rounded-lg overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-b border-gray-800 px-6 py-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-400 mt-1",
                                    children: isLoading ? 'Loading positions...' : `${totalOpenPositions} open position${totalOpenPositions !== 1 ? 's' : ''}`
                                }, void 0, false, {
                                    fileName: "[project]/src/app/positions/page.tsx",
                                    lineNumber: 305,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/positions/page.tsx",
                                lineNumber: 304,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/positions/page.tsx",
                            lineNumber: 303,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/positions/page.tsx",
                        lineNumber: 302,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-16 text-gray-500",
                            children: "Loading positions..."
                        }, void 0, false, {
                            fileName: "[project]/src/app/positions/page.tsx",
                            lineNumber: 317,
                            columnNumber: 13
                        }, this) : totalOpenPositions === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-gray-500 mb-2",
                                    children: "No open positions"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/positions/page.tsx",
                                    lineNumber: 320,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600",
                                    children: "Open positions will appear here once traders create them."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/positions/page.tsx",
                                    lineNumber: 321,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/positions/page.tsx",
                            lineNumber: 319,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-sm text-left text-gray-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "text-xs text-gray-500 uppercase bg-[#16191E]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-gray-800",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left font-medium",
                                                children: "ADDRESS"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/positions/page.tsx",
                                                lineNumber: 329,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left font-medium",
                                                children: "LEVERAGE"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/positions/page.tsx",
                                                lineNumber: 330,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left font-medium",
                                                children: "MARKET"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/positions/page.tsx",
                                                lineNumber: 331,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left font-medium",
                                                children: "MARGIN"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/positions/page.tsx",
                                                lineNumber: 332,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left font-medium",
                                                children: "SIZE"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/positions/page.tsx",
                                                lineNumber: 333,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left font-medium",
                                                children: "NET PNL"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/positions/page.tsx",
                                                lineNumber: 334,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left font-medium",
                                                children: "ENTRY PRICE"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/positions/page.tsx",
                                                lineNumber: 335,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/positions/page.tsx",
                                        lineNumber: 328,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/positions/page.tsx",
                                    lineNumber: 327,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: currentPositionIds.map((positionId)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PositionRow, {
                                            positionId: positionId,
                                            onClose: handleClosePosition,
                                            onTPSLClick: handleTPSLModalOpen,
                                            onPositionLoaded: handlePositionLoaded
                                        }, `${positionId.toString()}-${tpslRefreshTrigger}`, false, {
                                            fileName: "[project]/src/app/positions/page.tsx",
                                            lineNumber: 340,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/positions/page.tsx",
                                    lineNumber: 338,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/positions/page.tsx",
                            lineNumber: 326,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/positions/page.tsx",
                        lineNumber: 315,
                        columnNumber: 9
                    }, this),
                    !isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden",
                        children: allPositionIds.map((positionId)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PositionRow, {
                                positionId: positionId,
                                onClose: handleClosePosition,
                                onTPSLClick: handleTPSLModalOpen,
                                onPositionLoaded: handlePositionLoaded
                            }, `loader-${positionId.toString()}`, false, {
                                fileName: "[project]/src/app/positions/page.tsx",
                                lineNumber: 357,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/positions/page.tsx",
                        lineNumber: 355,
                        columnNumber: 11
                    }, this),
                    !isLoading && totalOpenPositions > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-gray-800 px-6 py-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-gray-400",
                                    children: [
                                        "Showing ",
                                        startIndex + 1,
                                        " to ",
                                        Math.min(endIndex, totalOpenPositions),
                                        " of",
                                        ' ',
                                        totalOpenPositions,
                                        " open positions"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/positions/page.tsx",
                                    lineNumber: 372,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setCurrentPage((prev)=>Math.max(1, prev - 1)),
                                            disabled: currentPage === 1,
                                            className: `px-3 py-1.5 rounded text-sm font-medium transition-colors ${currentPage === 1 ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`,
                                            children: "Previous"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/positions/page.tsx",
                                            lineNumber: 377,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1",
                                            children: Array.from({
                                                length: Math.min(5, totalPages)
                                            }, (_, i)=>{
                                                let pageNum;
                                                if (totalPages <= 5) {
                                                    pageNum = i + 1;
                                                } else if (currentPage <= 3) {
                                                    pageNum = i + 1;
                                                } else if (currentPage >= totalPages - 2) {
                                                    pageNum = totalPages - 4 + i;
                                                } else {
                                                    pageNum = currentPage - 2 + i;
                                                }
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setCurrentPage(pageNum),
                                                    className: `px-3 py-1.5 rounded text-sm font-medium transition-colors ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'}`,
                                                    children: pageNum
                                                }, pageNum, false, {
                                                    fileName: "[project]/src/app/positions/page.tsx",
                                                    lineNumber: 402,
                                                    columnNumber: 23
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/positions/page.tsx",
                                            lineNumber: 388,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setCurrentPage((prev)=>Math.min(totalPages, prev + 1)),
                                            disabled: currentPage === totalPages,
                                            className: `px-3 py-1.5 rounded text-sm font-medium transition-colors ${currentPage === totalPages ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`,
                                            children: "Next"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/positions/page.tsx",
                                            lineNumber: 416,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/positions/page.tsx",
                                    lineNumber: 376,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/positions/page.tsx",
                            lineNumber: 371,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/positions/page.tsx",
                        lineNumber: 370,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/positions/page.tsx",
                lineNumber: 300,
                columnNumber: 7
            }, this),
            tpslModalOpen && tpslModalData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$trading$2f$components$2f$modals$2f$TPSLModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: tpslModalOpen,
                onClose: handleTPSLModalClose,
                positionId: tpslModalData.positionId,
                trader: tpslModalData.trader,
                symbol: tpslModalData.symbol,
                entryPrice: tpslModalData.entryPrice,
                isLong: tpslModalData.isLong
            }, void 0, false, {
                fileName: "[project]/src/app/positions/page.tsx",
                lineNumber: 435,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
function PositionsPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$PageLayout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        navbar: {
            title: 'Positions',
            subtitle: 'View all open trading positions',
            showWalletButton: true
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PositionsPageContent, {}, void 0, false, {
            fileName: "[project]/src/app/positions/page.tsx",
            lineNumber: 458,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/positions/page.tsx",
        lineNumber: 451,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__43c53572._.js.map