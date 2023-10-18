import './App.css'
import { connect, disconnect } from 'starknetkit'
import { useState } from 'react'
import { Contract, Provider, constants } from 'starknet'

import contractAbi from './abis/abi.json'
const contractAddress = "0x077e0925380d1529772ee99caefa8cd7a7017a823ec3db7c003e56ad2e85e300"

function App() {
  const [connection, setConnection] = useState();
  const [account, setAccount] = useState();
  const [address, setAddress] = useState();

  const [retrievedValue, setRetrievedValue] = useState('')

  const connectWallet = async() => {
    const connection = await connect({ webWalletUrl: "https://web.argent.xyz" })
    console.log(connection)

    if(connection && connection.isConnected) {
      setConnection(connection)
      setAccount(connection.account)
      setAddress(connection.selectedAddress)
    }

    if(connection && connection.id !== "argentWebWallet" && connection.chainId !== "SN_MAIN") {
      try {
        await window.starknet.request({
          type: "wallet_switchStarknetChain",
          params: {
            chainId: "SN_MAIN"
          }
        })
      }
      catch(error) {
        alert("please manually switch your wallet network to mainnet!")
      }
    }
  }

  const disconnectWallet = async() => {
    await disconnect()
    setConnection(undefined)
    setAccount(undefined)
    setAddress('')
  }

  const increaseCounter = async() => {
      try{
         const contract = new Contract(contractAbi, contractAddress, account)
         await contract.increment();
         alert("your counter has been increased successfully")
      }
      catch(error) {
        console.log(error.message)
      }
  }

  const decreaseCounter = async() => {
      try{
        const contract = new Contract(contractAbi, contractAddress, account)
        await contract.decrement()
        alert("your counter has been decreased successfully")
      }
      catch(error) {
        console.log(error.message)
      }
  }

  const getCounter = async() => {
    const provider = new Provider({
      sequencer: {
        network: constants.NetworkName.SN_MAIN
      }
    })

    try {
      const contract = new Contract(contractAbi, contractAddress, provider)
      const counter = await contract.get_current_count()
      setRetrievedValue(counter.toString())
    }
    catch(error) {
      console.log(error.message)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <main className="main">
          <h1 className="title">
            Starknet<a href="#"> Counter</a>
          </h1>
          {
            connection ?
              <button className="connect" onClick={disconnectWallet}>Disconnect wallet</button>
            :
              <button className="connect" onClick={connectWallet}>Connect wallet</button>
          }

          <p className="description">
          { address }
          </p>

          <div className="grid">
            <div href="#" className="card">
              <h2>Ensure to connect to Mainnet! &rarr;</h2>

              <p>Increase/Decrease Counter.</p>
              <div className="cardForm">
                <input type="submit" className="button" value="Increase" onClick={increaseCounter} />
                <input type="submit" className="button" value="Decrease" onClick={decreaseCounter} />
              </div>

              <hr />
              <div className="cardForm">
                <input type="submit" className="button" value="Get Count" onClick={getCounter} />
                <p>{retrievedValue}</p>
              </div>
            </div>
          </div>
        </main>
      </header>
    </div>
  );
}

export default App;