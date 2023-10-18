import React from 'react'
import { useAccount, useConnect } from "@starknet-react/core"

function Home() {
  const { connect, connectors } = useConnect()
  const { address } = useAccount()

  return (
    <div>
      <div>Home</div>

      {connectors.map((connector) => (
        <button onClick={() => connect({ connector })}>
          Connect {connector.id}
        </button>
      ))}
      { address }
    </div>
  )
}

export default Home