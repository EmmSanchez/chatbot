"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
import { useTheme } from "next-themes";
const solanaConnectors = toSolanaWalletConnectors();

export default function PrivyContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: theme === "dark" ? "dark" : "light",
          accentColor: "#1091ea",
          logo: "https://pixteller.com/images/tools/example/logo-example8-480.png",
          showWalletLoginFirst: true,
          walletChainType: "solana-only",
        },
        externalWallets: {
          solana: { connectors: solanaConnectors },
        },
        loginMethods: ["email", "wallet", "twitter", "discord", "google"],
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
