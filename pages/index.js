import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CoolNumberContractABI from '../blockchain/abi'
import Web3 from 'web3'

export default function Home() {
  const CONTRACT_ADDRESS = "0x3b47994a0fC41fb60856e5E05e332cD8a83C9177";

  async function loadWeb3() {
    if (typeof window !== "undefined") {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
    }
  }

  async function loadContract() {
      return await new window.web3.eth.Contract(CoolNumberContractABI, CONTRACT_ADDRESS);
  }

  async function displayCoolNumber() {
      updateStatus('fetching Cool Number...');
      const coolNumber = await window.contract.methods.coolNumber().call();
      updateStatus(`coolNumber: ${coolNumber}`);
  }

  async function getCurrentAccount() {
      const accounts = await window.web3.eth.getAccounts();
      return accounts[0];
  }

  async function incrementCoolNumber() {
      const value = 1;
      updateStatus(`Incrementing coolNumber by ${value}`);
      const account = await getCurrentAccount();
      const coolNumber = await window.contract.methods.incrementCoolNumber().send({ from: account });
      updateStatus('Incremented by 1.');
  }

  async function decrementCoolNumber() {
      const value = 1;
      updateStatus(`Decrementing coolNumber by ${value}`);
      const account = await getCurrentAccount();
      const coolNumber = await window.contract.methods.decrementCoolNumber().send({ from: account });
      updateStatus('Decremented by 1.');
  }

  async function load() {
    if (typeof window !== "undefined") {
      await loadWeb3();
      window.contract = await loadContract();
      updateStatus('Ready!');
    }
  }

  function updateStatus(status) {
      const statusEl = document.getElementById('status');
      statusEl.innerHTML = status;
      console.log(status);
  }

  async function setCoolNumber() {
      const value = document.getElementById('coolNumber_input').value;
      updateStatus(`Setting coolNumber to ${value}`);
      const account = await getCurrentAccount();
      const coolNumber = await window.contract.methods.setCoolNumber(value).send({ from: account });
      updateStatus(`coolNumber set to ${value}`);
  }

  load();

  return (
    <div className={styles.container}>
      <Head>
        <title>CoolNumberContract Interface</title>
        <meta name="description" content="Bootstrapped by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Web 3 Demo (Goerli Testnet)</h1>
      <br />
      <button id= "displayCoolNumber" onClick={displayCoolNumber}>Display Cool Number</button><br/>
      <button id = "incrementCoolNumber" onClick={incrementCoolNumber}>Increment Cool Number</button><br/>
      <button id = "decrementCoolNumber" onClick={decrementCoolNumber}>Decrement Cool Number</button><br/>
      <button id = "setCoolNumber" onClick={setCoolNumber}>Reset Cool Number</button><input id='coolNumber_input' type='text' placeholder='Enter reset value...'/>
      <br /><br />
      Status: <span id="status">Loading...</span>
    </div>
  )
}
