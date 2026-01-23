(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/features/wallet/hooks/useSessionKey.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSessionKey",
    ()=>useSessionKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/hash/keccak256.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$hashMessage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/signature/hashMessage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodePacked$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/abi/encodePacked.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$privateKeyToAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/accounts/privateKeyToAccount.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
const SESSION_STORAGE_KEY = 'dash_session_key';
const DEFAULT_SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
function useSessionKey() {
    _s();
    const [sessionKey, setSessionKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Load session key from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSessionKey.useEffect": ()=>{
            const stored = localStorage.getItem(SESSION_STORAGE_KEY);
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    // Check if expired
                    if (parsed.expiresAt > Date.now()) {
                        setSessionKey(parsed);
                    } else {
                        localStorage.removeItem(SESSION_STORAGE_KEY);
                    }
                } catch (err) {
                    console.error('Failed to parse session key:', err);
                    localStorage.removeItem(SESSION_STORAGE_KEY);
                }
            }
        }
    }["useSessionKey.useEffect"], []);
    /**
   * Check if current session is valid (exists and not expired)
   */ const isSessionValid = ()=>{
        if (!sessionKey) return false;
        if (sessionKey.expiresAt <= Date.now()) {
            clearSession();
            return false;
        }
        return true;
    };
    /**
   * Create a new session key
   * User must sign a message authorizing this ephemeral key
   */ const createSession = async (userAddress, walletClient, durationMs = DEFAULT_SESSION_DURATION)=>{
        try {
            setIsLoading(true);
            // Generate random private key for session
            const randomBytes = crypto.getRandomValues(new Uint8Array(32));
            const privateKey = `0x${Array.from(randomBytes).map((b)=>b.toString(16).padStart(2, '0')).join('')}`;
            // Derive address from private key
            const sessionAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$privateKeyToAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["privateKeyToAccount"])(privateKey);
            const sessionAddress = sessionAccount.address;
            const expiresAt = Date.now() + durationMs;
            const expiresAtSeconds = Math.floor(expiresAt / 1000);
            const authMessageHash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodePacked$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodePacked"])([
                'string',
                'address',
                'string',
                'uint256'
            ], [
                'Authorize session key ',
                sessionAddress,
                ' for Dash Tap-to-Trade until ',
                BigInt(expiresAtSeconds)
            ]));
            // User signs authorization (this is the ONLY signature needed!)
            const authSignature = await walletClient.request({
                method: 'personal_sign',
                params: [
                    authMessageHash,
                    userAddress
                ]
            });
            const newSession = {
                privateKey,
                address: sessionAddress,
                expiresAt,
                authorizedBy: userAddress.toLowerCase(),
                authSignature: authSignature,
                createdAt: Date.now()
            };
            // Store in state and localStorage
            setSessionKey(newSession);
            localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession));
            return newSession;
        } catch (err) {
            console.error('Session creation failed:', err);
            return null;
        } finally{
            setIsLoading(false);
        }
    };
    /**
   * Sign a message using the session key (no user prompt!)
   * IMPORTANT: Uses hashMessage to match ethers.verifyMessage behavior
   */ const signWithSession = async (messageHash)=>{
        if (!isSessionValid()) {
            return null;
        }
        try {
            const sessionAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$privateKeyToAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["privateKeyToAccount"])(sessionKey.privateKey);
            // Hash the message with Ethereum signed message prefix
            // This creates the same hash that ethers.verifyMessage expects
            const digest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$hashMessage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashMessage"])({
                raw: messageHash
            });
            // Sign the digest using raw ECDSA (no additional hashing)
            const signature = await sessionAccount.sign({
                hash: digest
            });
            return signature;
        } catch (err) {
            console.error('Failed to sign with session:', err);
            return null;
        }
    };
    /**
   * Clear current session
   */ const clearSession = ()=>{
        setSessionKey(null);
        localStorage.removeItem(SESSION_STORAGE_KEY);
    };
    /**
   * Get time remaining in session (milliseconds)
   */ const getTimeRemaining = ()=>{
        if (!sessionKey) return 0;
        return Math.max(0, sessionKey.expiresAt - Date.now());
    };
    return {
        sessionKey,
        isSessionValid,
        createSession,
        signWithSession,
        clearSession,
        getTimeRemaining,
        isLoading
    };
}
_s(useSessionKey, "njC+F4NysVXt3CZUcGj5cQ5qRwE=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/wallet/hooks/useEmbeddedWallet.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Hook to get Privy embedded wallet address
 */ __turbopack_context__.s([
    "useEmbeddedWallet",
    ()=>useEmbeddedWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/usePrivy-DDM76RFl.mjs [app-client] (ecmascript) <export u as usePrivy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useEmbeddedWallet() {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"])();
    const embeddedWallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useEmbeddedWallet.useMemo[embeddedWallet]": ()=>{
            if (!user?.linkedAccounts) return null;
            const wallets = user.linkedAccounts.filter({
                "useEmbeddedWallet.useMemo[embeddedWallet].wallets": (account)=>{
                    const acc = account;
                    return acc.type === 'wallet' && acc.imported === false && acc.id !== undefined;
                }
            }["useEmbeddedWallet.useMemo[embeddedWallet].wallets"]);
            return wallets?.[0] || null;
        }
    }["useEmbeddedWallet.useMemo[embeddedWallet]"], [
        user
    ]);
    return {
        address: embeddedWallet?.address,
        hasEmbeddedWallet: !!embeddedWallet,
        embeddedWallet
    };
}
_s(useEmbeddedWallet, "7y0D0Nq6adVDyApb1esN56sVEw0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/wallet/hooks/usePaymaster.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Hooks for USDC Paymaster interactions
 */ __turbopack_context__.s([
    "useApproveUSDCForPaymaster",
    ()=>useApproveUSDCForPaymaster,
    "useCalculateGasCost",
    ()=>useCalculateGasCost,
    "useDepositToPaymaster",
    ()=>useDepositToPaymaster,
    "usePaymasterBalance",
    ()=>usePaymasterBalance,
    "usePaymasterFlow",
    ()=>usePaymasterFlow,
    "usePaymasterRateInfo",
    ()=>usePaymasterRateInfo,
    "useWithdrawFromPaymaster",
    ()=>useWithdrawFromPaymaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWaitForTransactionReceipt.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWriteContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseUnits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatUnits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeFunctionData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/abi/encodeFunctionData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/chains/definitions/baseSepolia.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$SignRequestScreen$2d$BQBgOoh_$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ae__as__useWallets$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/SignRequestScreen-BQBgOoh_.mjs [app-client] (ecmascript) <export ae as useWallets>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/contracts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contracts$2f$abis$2f$USDCPaymaster$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/contracts/abis/USDCPaymaster.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contracts$2f$abis$2f$MockUSDC$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/contracts/abis/MockUSDC.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$wallet$2f$hooks$2f$useEmbeddedWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/wallet/hooks/useEmbeddedWallet.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
;
function usePaymasterBalance() {
    _s();
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$wallet$2f$hooks$2f$useEmbeddedWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEmbeddedWallet"])();
    const { data: balance, isLoading, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_PAYMASTER_ADDRESS"],
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contracts$2f$abis$2f$USDCPaymaster$2e$json__$28$json$29$__["default"],
        functionName: 'getUserDeposit',
        args: address ? [
            address
        ] : undefined,
        query: {
            enabled: !!address
        }
    });
    return {
        balance: balance ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(balance, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_DECIMALS"]) : '0',
        balanceRaw: balance,
        isLoading,
        refetch
    };
}
_s(usePaymasterBalance, "Lpt39IX3oqbKFPAY8smTib2uPBQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$wallet$2f$hooks$2f$useEmbeddedWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEmbeddedWallet"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"]
    ];
});
function useDepositToPaymaster() {
    _s1();
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$wallet$2f$hooks$2f$useEmbeddedWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEmbeddedWallet"])();
    const { wallets } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$SignRequestScreen$2d$BQBgOoh_$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ae__as__useWallets$3e$__["useWallets"])();
    const [hash, setHash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [isPending, setIsPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { isLoading: isConfirming, isSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash
    });
    const deposit = async (amount)=>{
        try {
            setIsPending(true);
            setError(null);
            const embeddedWallet = wallets.find((w)=>w.walletClientType === 'privy' && w.address === address);
            if (!embeddedWallet) {
                throw new Error('Embedded wallet not found');
            }
            await embeddedWallet.switchChain(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseSepolia"].id);
            const walletClient = await embeddedWallet.getEthereumProvider();
            if (!walletClient) {
                throw new Error('Could not get wallet client');
            }
            const amountBigInt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUnits"])(amount, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_DECIMALS"]);
            const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeFunctionData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeFunctionData"])({
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contracts$2f$abis$2f$USDCPaymaster$2e$json__$28$json$29$__["default"],
                functionName: 'deposit',
                args: [
                    amountBigInt
                ]
            });
            const txHash = await walletClient.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: address,
                        to: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_PAYMASTER_ADDRESS"],
                        data
                    }
                ]
            });
            setHash(txHash);
        } catch (err) {
            console.error('❌ Deposit error:', err);
            setError(err);
        } finally{
            setIsPending(false);
        }
    };
    return {
        deposit,
        isPending,
        isConfirming,
        isSuccess,
        error,
        hash
    };
}
_s1(useDepositToPaymaster, "8/tPCBNWqEPJnuKwY+r9zaltObE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$wallet$2f$hooks$2f$useEmbeddedWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEmbeddedWallet"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$SignRequestScreen$2d$BQBgOoh_$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ae__as__useWallets$3e$__["useWallets"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"]
    ];
});
function useWithdrawFromPaymaster() {
    _s2();
    const { writeContractAsync, data: hash, isPending, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { isLoading: isConfirming, isSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash
    });
    const withdraw = async (amount)=>{
        const amountBigInt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUnits"])(amount, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_DECIMALS"]);
        await writeContractAsync({
            address: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_PAYMASTER_ADDRESS"],
            abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contracts$2f$abis$2f$USDCPaymaster$2e$json__$28$json$29$__["default"],
            functionName: 'withdraw',
            args: [
                amountBigInt
            ],
            chainId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseSepolia"].id
        });
    };
    return {
        withdraw,
        isPending,
        isConfirming,
        isSuccess,
        error,
        hash
    };
}
_s2(useWithdrawFromPaymaster, "UsOPuxQE1IsStisbfnq2dpyGPCQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"]
    ];
});
function useApproveUSDCForPaymaster() {
    _s3();
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$wallet$2f$hooks$2f$useEmbeddedWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEmbeddedWallet"])();
    const { wallets } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$SignRequestScreen$2d$BQBgOoh_$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ae__as__useWallets$3e$__["useWallets"])();
    const [hash, setHash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [isPending, setIsPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { isLoading: isConfirming, isSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash
    });
    // Check current allowance
    const { data: allowance, refetch: refetchAllowance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_ADDRESS"],
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contracts$2f$abis$2f$MockUSDC$2e$json__$28$json$29$__["default"],
        functionName: 'allowance',
        args: address ? [
            address,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_PAYMASTER_ADDRESS"]
        ] : undefined,
        query: {
            enabled: !!address
        }
    });
    const approve = async (amount)=>{
        try {
            setIsPending(true);
            setError(null);
            // Find embedded wallet
            const embeddedWallet = wallets.find((w)=>w.walletClientType === 'privy' && w.address === address);
            if (!embeddedWallet) {
                throw new Error('Embedded wallet not found');
            }
            const amountBigInt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUnits"])(amount, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_DECIMALS"]);
            // Switch to correct chain first
            await embeddedWallet.switchChain(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseSepolia"].id);
            // Get wallet client
            const walletClient = await embeddedWallet.getEthereumProvider();
            if (!walletClient) {
                throw new Error('Could not get wallet client');
            }
            // Encode approve function call
            const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeFunctionData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeFunctionData"])({
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contracts$2f$abis$2f$MockUSDC$2e$json__$28$json$29$__["default"],
                functionName: 'approve',
                args: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_PAYMASTER_ADDRESS"],
                    amountBigInt
                ]
            });
            // Send transaction using provider
            const txHash = await walletClient.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: address,
                        to: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_ADDRESS"],
                        data
                    }
                ]
            });
            setHash(txHash);
        } catch (err) {
            console.error('❌ Approve error:', err);
            setError(err);
        } finally{
            setIsPending(false);
        }
    };
    const hasAllowance = (requiredAmount)=>{
        if (!allowance) return false;
        const required = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUnits"])(requiredAmount, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_DECIMALS"]);
        return allowance >= required;
    };
    return {
        approve,
        isPending,
        isConfirming,
        isSuccess,
        error,
        hash,
        allowance: allowance,
        hasAllowance,
        refetchAllowance
    };
}
_s3(useApproveUSDCForPaymaster, "3kkM2ljleyOPA/nHc4AVjtX7UwM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$wallet$2f$hooks$2f$useEmbeddedWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEmbeddedWallet"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$SignRequestScreen$2d$BQBgOoh_$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ae__as__useWallets$3e$__["useWallets"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"]
    ];
});
function usePaymasterRateInfo() {
    _s4();
    const { data, isLoading, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_PAYMASTER_ADDRESS"],
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contracts$2f$abis$2f$USDCPaymaster$2e$json__$28$json$29$__["default"],
        functionName: 'getRateInfo'
    });
    const rateData = data;
    return {
        usdcPerEth: rateData?.[0],
        premiumBps: rateData?.[1],
        isLoading,
        refetch
    };
}
_s4(usePaymasterRateInfo, "E69MZ5hmciv61i97P7kLr0IBijs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"]
    ];
});
function useCalculateGasCost(gasAmount) {
    _s5();
    const { data: cost, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_PAYMASTER_ADDRESS"],
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contracts$2f$abis$2f$USDCPaymaster$2e$json__$28$json$29$__["default"],
        functionName: 'calculateUsdcCost',
        args: gasAmount ? [
            gasAmount
        ] : undefined,
        query: {
            enabled: !!gasAmount && gasAmount > 0n
        }
    });
    return {
        cost: cost,
        costFormatted: cost ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(cost, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_DECIMALS"]) : '0',
        isLoading
    };
}
_s5(useCalculateGasCost, "2Qn6Xup2mne91jdQTbAuTRJht1s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"]
    ];
});
function usePaymasterFlow() {
    _s6();
    const [isApproving, setIsApproving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDepositing, setIsDepositing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { balance, balanceRaw, refetch: refetchBalance } = usePaymasterBalance();
    const { approve, isSuccess: isApproveSuccess, hasAllowance, refetchAllowance } = useApproveUSDCForPaymaster();
    const { deposit, isSuccess: isDepositSuccess } = useDepositToPaymaster();
    // Refetch balance when deposit is successful
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePaymasterFlow.useEffect": ()=>{
            if (isDepositSuccess) {
                refetchBalance();
                setIsDepositing(false);
            }
        }
    }["usePaymasterFlow.useEffect"], [
        isDepositSuccess,
        refetchBalance
    ]);
    // Refetch allowance when approve is successful
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePaymasterFlow.useEffect": ()=>{
            if (isApproveSuccess) {
                refetchAllowance();
                setIsApproving(false);
            }
        }
    }["usePaymasterFlow.useEffect"], [
        isApproveSuccess,
        refetchAllowance
    ]);
    /**
   * Ensure paymaster has sufficient balance
   * Will approve and deposit if needed
   */ const ensurePaymasterBalance = async (requiredAmount)=>{
        try {
            // Check if balance is sufficient
            const balanceNum = parseFloat(balance);
            const requiredNum = parseFloat(requiredAmount);
            if (balanceNum >= requiredNum) {
                return true; // Already have enough balance
            }
            const depositAmount = (requiredNum - balanceNum + 10).toFixed(6); // Add 10 USDC buffer
            // Check allowance
            if (!hasAllowance(depositAmount)) {
                setIsApproving(true);
                await approve(depositAmount);
                // Wait for approval to complete
                return false; // Need to retry after approval
            }
            // Deposit
            setIsDepositing(true);
            await deposit(depositAmount);
            return false; // Need to wait for deposit to complete
        } catch (error) {
            console.error('Error ensuring paymaster balance:', error);
            setIsApproving(false);
            setIsDepositing(false);
            return false;
        }
    };
    return {
        balance,
        balanceRaw,
        isApproving,
        isDepositing,
        ensurePaymasterBalance,
        refetchBalance
    };
}
_s6(usePaymasterFlow, "2iIrp7snHcYolSxcgNhmjGIkkKE=", false, function() {
    return [
        usePaymasterBalance,
        useApproveUSDCForPaymaster,
        useDepositToPaymaster
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/wallet/hooks/useTapToTradeApproval.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTapToTradeApproval",
    ()=>useTapToTradeApproval
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/usePrivy-DDM76RFl.mjs [app-client] (ecmascript) <export u as usePrivy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$SignRequestScreen$2d$BQBgOoh_$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ae__as__useWallets$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/SignRequestScreen-BQBgOoh_.mjs [app-client] (ecmascript) <export ae as useWallets>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseUnits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/contracts.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
const USDC_ABI = [
    {
        inputs: [
            {
                name: 'spender',
                type: 'address'
            },
            {
                name: 'amount',
                type: 'uint256'
            }
        ],
        name: 'approve',
        outputs: [
            {
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'owner',
                type: 'address'
            },
            {
                name: 'spender',
                type: 'address'
            }
        ],
        name: 'allowance',
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
function useTapToTradeApproval() {
    _s();
    const { authenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"])();
    const { wallets, ready: walletsReady } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$SignRequestScreen$2d$BQBgOoh_$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ae__as__useWallets$3e$__["useWallets"])();
    const [allowance, setAllowance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPending, setIsPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    /**
   * Fetch current USDC allowance for TapToTradeExecutor
   */ const fetchAllowance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTapToTradeApproval.useCallback[fetchAllowance]": async ()=>{
            if (!authenticated || !walletsReady) return;
            try {
                const embeddedWallet = wallets.find({
                    "useTapToTradeApproval.useCallback[fetchAllowance].embeddedWallet": (w)=>w.walletClientType === 'privy'
                }["useTapToTradeApproval.useCallback[fetchAllowance].embeddedWallet"]);
                if (!embeddedWallet) return;
                const walletClient = await embeddedWallet.getEthereumProvider();
                if (!walletClient) return;
                const userAddress = embeddedWallet.address;
                // Encode allowance call
                const allowanceData = `0xdd62ed3e${userAddress.slice(2).padStart(64, '0')}${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TAP_TO_TRADE_EXECUTOR_ADDRESS"].slice(2).padStart(64, '0')}`;
                const result = await walletClient.request({
                    method: 'eth_call',
                    params: [
                        {
                            to: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_ADDRESS"],
                            data: allowanceData
                        },
                        'latest'
                    ]
                });
                const allowanceValue = result === '0x' || !result ? BigInt(0) : BigInt(result);
                setAllowance(allowanceValue);
            } catch (error) {
                setAllowance(BigInt(0));
            }
        }
    }["useTapToTradeApproval.useCallback[fetchAllowance]"], [
        authenticated,
        walletsReady,
        wallets
    ]);
    /**
   * Approve USDC for TapToTradeExecutor
   */ const approve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTapToTradeApproval.useCallback[approve]": async (amount)=>{
            if (!authenticated || !walletsReady) {
                throw new Error('Wallet not ready');
            }
            const embeddedWallet = wallets.find({
                "useTapToTradeApproval.useCallback[approve].embeddedWallet": (w)=>w.walletClientType === 'privy'
            }["useTapToTradeApproval.useCallback[approve].embeddedWallet"]);
            if (!embeddedWallet) {
                throw new Error('Embedded wallet not found');
            }
            setIsPending(true);
            try {
                const walletClient = await embeddedWallet.getEthereumProvider();
                if (!walletClient) {
                    throw new Error('Wallet client not available');
                }
                // Encode approve function call
                const approveData = `0x095ea7b3${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TAP_TO_TRADE_EXECUTOR_ADDRESS"].slice(2).padStart(64, '0')}${BigInt(amount).toString(16).padStart(64, '0')}`;
                const txHash = await walletClient.request({
                    method: 'eth_sendTransaction',
                    params: [
                        {
                            from: embeddedWallet.address,
                            to: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_ADDRESS"],
                            data: approveData
                        }
                    ]
                });
                // Wait for confirmation
                let confirmed = false;
                let attempts = 0;
                while(!confirmed && attempts < 30){
                    await new Promise({
                        "useTapToTradeApproval.useCallback[approve]": (resolve)=>setTimeout(resolve, 2000)
                    }["useTapToTradeApproval.useCallback[approve]"]);
                    const receipt = await walletClient.request({
                        method: 'eth_getTransactionReceipt',
                        params: [
                            txHash
                        ]
                    });
                    if (receipt && receipt.status === '0x1') {
                        confirmed = true;
                    }
                    attempts++;
                }
                if (!confirmed) {
                    throw new Error('Transaction confirmation timeout');
                }
                // Refresh allowance
                await fetchAllowance();
                return txHash;
            } catch (error) {
                throw error;
            } finally{
                setIsPending(false);
            }
        }
    }["useTapToTradeApproval.useCallback[approve]"], [
        authenticated,
        walletsReady,
        wallets,
        fetchAllowance
    ]);
    /**
   * Check if user has sufficient allowance (> threshold)
   */ const hasAllowance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTapToTradeApproval.useCallback[hasAllowance]": (threshold = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUnits"])('10000', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USDC_DECIMALS"]))=>{
            return allowance !== null && allowance > threshold;
        }
    }["useTapToTradeApproval.useCallback[hasAllowance]"], [
        allowance
    ]);
    // Fetch allowance on mount and when dependencies change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTapToTradeApproval.useEffect": ()=>{
            if (authenticated && walletsReady) {
                fetchAllowance();
            }
        }
    }["useTapToTradeApproval.useEffect"], [
        authenticated,
        walletsReady,
        fetchAllowance
    ]);
    return {
        allowance,
        approve,
        hasAllowance,
        isPending,
        isLoading,
        refetch: fetchAllowance
    };
}
_s(useTapToTradeApproval, "AVYahJeoJR9iADsr8ETtaGod2gc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$SignRequestScreen$2d$BQBgOoh_$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ae__as__useWallets$3e$__["useWallets"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/wallet/hooks/useOneTapProfitApproval.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useOneTapProfitApproval",
    ()=>useOneTapProfitApproval
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/usePrivy-DDM76RFl.mjs [app-client] (ecmascript) <export u as usePrivy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$SignRequestScreen$2d$BQBgOoh_$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ae__as__useWallets$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/SignRequestScreen-BQBgOoh_.mjs [app-client] (ecmascript) <export ae as useWallets>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/clients/createWalletClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$custom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/clients/transports/custom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeFunctionData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/abi/encodeFunctionData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseUnits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/chains/definitions/baseSepolia.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const USDC_ADDRESS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_USDC_TOKEN_ADDRESS;
const ONE_TAP_PROFIT_ADDRESS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_ONE_TAP_PROFIT_ADDRESS;
const USDC_ABI = [
    {
        inputs: [
            {
                name: 'spender',
                type: 'address'
            },
            {
                name: 'amount',
                type: 'uint256'
            }
        ],
        name: 'approve',
        outputs: [
            {
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                name: 'owner',
                type: 'address'
            },
            {
                name: 'spender',
                type: 'address'
            }
        ],
        name: 'allowance',
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
const useOneTapProfitApproval = ()=>{
    _s();
    const { authenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"])();
    const { wallets } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$SignRequestScreen$2d$BQBgOoh_$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ae__as__useWallets$3e$__["useWallets"])();
    const [allowance, setAllowance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPending, setIsPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const embeddedWallet = wallets.find((w)=>w.walletClientType === 'privy');
    // Check current allowance
    const checkAllowance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useOneTapProfitApproval.useCallback[checkAllowance]": async ()=>{
            if (!authenticated || !embeddedWallet) {
                setAllowance(null);
                return;
            }
            try {
                setIsLoading(true);
                const ethereumProvider = await embeddedWallet.getEthereumProvider();
                const userAddress = embeddedWallet.address;
                const allowanceData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeFunctionData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeFunctionData"])({
                    abi: USDC_ABI,
                    functionName: 'allowance',
                    args: [
                        userAddress,
                        ONE_TAP_PROFIT_ADDRESS
                    ]
                });
                const result = await ethereumProvider.request({
                    method: 'eth_call',
                    params: [
                        {
                            to: USDC_ADDRESS,
                            data: allowanceData
                        },
                        'latest'
                    ]
                });
                const currentAllowance = BigInt(result);
                setAllowance(currentAllowance);
            } catch (error) {
                console.error('Failed to check OneTapProfit allowance:', error);
                setAllowance(null);
            } finally{
                setIsLoading(false);
            }
        }
    }["useOneTapProfitApproval.useCallback[checkAllowance]"], [
        authenticated,
        embeddedWallet
    ]);
    // Auto-check allowance on mount and when wallet changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useOneTapProfitApproval.useEffect": ()=>{
            checkAllowance();
        }
    }["useOneTapProfitApproval.useEffect"], [
        checkAllowance
    ]);
    // Approve USDC spending
    const approve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useOneTapProfitApproval.useCallback[approve]": async (amount)=>{
            if (!authenticated || !embeddedWallet) {
                throw new Error('Wallet not connected');
            }
            setIsPending(true);
            try {
                const ethereumProvider = await embeddedWallet.getEthereumProvider();
                const userAddress = embeddedWallet.address;
                const walletClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWalletClient"])({
                    account: userAddress,
                    chain: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseSepolia"],
                    transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$custom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["custom"])(ethereumProvider)
                });
                const approveData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeFunctionData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeFunctionData"])({
                    abi: USDC_ABI,
                    functionName: 'approve',
                    args: [
                        ONE_TAP_PROFIT_ADDRESS,
                        BigInt(amount)
                    ]
                });
                const txHash = await walletClient.sendTransaction({
                    account: userAddress,
                    to: USDC_ADDRESS,
                    data: approveData
                });
                // Wait a bit for transaction to be mined
                await new Promise({
                    "useOneTapProfitApproval.useCallback[approve]": (resolve)=>setTimeout(resolve, 3000)
                }["useOneTapProfitApproval.useCallback[approve]"]);
                // Refresh allowance
                await checkAllowance();
                return txHash;
            } catch (error) {
                console.error('Failed to approve USDC for OneTapProfit:', error);
                throw error;
            } finally{
                setIsPending(false);
            }
        }
    }["useOneTapProfitApproval.useCallback[approve]"], [
        authenticated,
        embeddedWallet,
        checkAllowance
    ]);
    // Check if user has sufficient allowance for a specific amount
    const hasAllowance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useOneTapProfitApproval.useCallback[hasAllowance]": (requiredAmount)=>{
            if (!allowance) return false;
            if (!requiredAmount) return allowance > 0n;
            try {
                const required = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUnits"])(requiredAmount, 6);
                return allowance >= required;
            } catch  {
                return false;
            }
        }
    }["useOneTapProfitApproval.useCallback[hasAllowance]"], [
        allowance
    ]);
    return {
        allowance,
        hasAllowance,
        approve,
        isPending,
        isLoading,
        checkAllowance
    };
};
_s(useOneTapProfitApproval, "EBjxBI9t4dqpKb0WjRaDBupTa04=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$DDM76RFl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$SignRequestScreen$2d$BQBgOoh_$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ae__as__useWallets$3e$__["useWallets"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_features_wallet_hooks_b45b7aa3._.js.map