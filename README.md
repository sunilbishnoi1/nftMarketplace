# Aurora NFT Marketplace

A modern, decentralized NFT marketplace built on Ethereum, enabling users to mint, buy, sell, and manage digital collectibles with automated royalty distributions. This project demonstrates a full-stack Web3 implementation combining robust smart contract logic with a premium, responsive frontend.

---

## 🚀 Key Features

- **Decentralized Minting**: Users can transform their digital art into ERC-721 tokens directly from the platform.
- **Smart Marketplace**: Integrated listing and secondary sales functionality with real-time price updates.
- **Automated Royalties**: Immutable on-chain logic ensures original creators receive a percentage of every secondary sale, promoting fair compensation for artists.
- **Dynamic Pricing**: NFT owners can update sale prices anytime via secure blockchain transactions.
- **Transaction History**: Transparent tracking of all historical sales and ownership transfers directly from the ledger.
- **MetaMask Integration**: Secure, non-custodial wallet connection for seamless transaction signing and account management.
- **Decentralized Storage**: Leverages **IPFS** (InterPlanetary File System) via Filebase to ensure NFT metadata and assets are immutable and permanent.
- **Ultra-Responsive UI**: A premium user interface built with React and Tailwind CSS, featuring glassmorphism elements and smooth transitions.

---

## 🛠️ Technical Stack

### **Blockchain Layer**
- **Solidity**: Smart contract development (ERC-721 standard).
- **Truffle**: Development framework for compilation, testing, and deployment.
- **OpenZeppelin**: Industry-standard library for secure and audited contract components.
- **Web3.js**: Bridge for interacting with the Ethereum blockchain from the browser.

### **Frontend & UX**
- **React (TypeScript)**: Core framework for building a robust and type-safe user interface.
- **Tailwind CSS**: Utility-first CSS framework for high-performance, responsive design.
- **React Hooks Global State**: Lightweight and efficient state management.
- **React Icons & Identicons**: Enhancing visual identity and user distinguishability.

### **Storage & Infrastructure**
- **IPFS (Filebase)**: Decentralized storage for NFT media and JSON metadata.
- **Truffle HDWallet Provider**: Secure deployment and interaction with remote blockchain nodes.

---

## 🏗️ Architecture & Workflow

1.  **Minting Flow**: 
    - User uploads an image → Image is pinned to **IPFS**.
    - Metadata (JSON) containing the IPFS link is generated and pinned.
    - `payToMint` function is called on the **Aurora** contract, recording the asset on the blockchain.
2.  **Purchase Flow**: 
    - Buyer initiates `payToBuy`.
    - Smart contract calculates the **Royalty Fee** for the original creator.
    - Funds are split: Creator receives royalty, Seller receives the remainder.
    - Ownership is transferred atomically on-chain.
3.  **Governance**:
    - The contract owner can adjust platform minting costs through the `changeCost` function.

---

## 💻 Installation & Setup

### 1. Clone & Install
```bash
git clone https://github.com/sunilbishnoi1/nftMarketplace.git
cd nftMarketplace
yarn install
```

### 2. Local Blockchain Setup
To run the marketplace locally, you need a development blockchain environment:
- **Start Ganache**: In a separate terminal window, start the local node:
  ```bash
  ganache -d # Uses deterministic accounts for consistent testing
  ```
- **Deploy Contracts**: Compile and deploy the smart contracts to Ganache:
  ```bash
  truffle migrate --reset
  ```

### 3. Environment Configuration
Create a `.env` file in the root directory and add the following (replace the address with the one from the terminal output after migration):
```env
REACT_APP_AURORA_ADDRESS=<deployed_contract_address>
REACT_APP_CHAIN_ID=1337
# Optional: IPFS credentials if you want to test minting with Filebase
REACT_APP_FILEBASE_KEY=your_key
REACT_APP_FILEBASE_SECRET=your_secret
```

### 4. Run Application
```bash
yarn start
```


*Note: This project was developed as part of a deep dive into Decentralized Finance (DeFi) and Blockchain technologies, focusing on creator economy empowerment.*
