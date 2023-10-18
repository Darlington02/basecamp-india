import React from "react";

import { InjectedConnector } from "starknetkit/injected";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";
import { mainnet } from "@starknet-react/chains";
import { StarknetConfig, publicProvider } from "@starknet-react/core";

export default function StarknetProvider({children}) {
    const chains = [mainnet]
    const providers = [publicProvider()]
    const connectors = [
        new ArgentMobileConnector(),
        new InjectedConnector({ options: {id: "argentX", name: "Argent" }}),
        new InjectedConnector({ options: {id: "braavos", name: "Braavos" }}),
        new WebWalletConnector({ url: "https://web.argent.xyz" })
    ]

    return(
        <StarknetConfig
          chains={chains}
          providers={providers}
          connectors={connectors}
        >
            {children}
        </StarknetConfig>
    )
}