# Decentralized Voting Pool

Backend application for creating and managing voting pools using **TypeScript, MySQL and Blockchain**.

## 🏗️ Architecture

The project uses a hybrid architecture:

```text
Client
  ↓
Controller
  ↓
Service
  ├── Database
  └── Blockchain
        ↓
   Smart Contract
```

- **Database:** stores application data such as `title` and `description`.
- **Blockchain:** stores voting rules and state such as `poolId`, `duration`, `vote` and `restrictionVote`.
- **Smart Contract:** enforces the rules of the voting system.

## 📁 Structure

```text
src/
├── controllers/
├── database/
├── entities/
├── services/
├── utils/
└── blockchain/
    ├── connection.ts
    ├── poolContract.ts
    └── abi/
```

## ⛓️ Blockchain

The backend communicates with the smart contract using **ethers.js**.

The contract ABI defines the functions and events that the backend can interact with.

Pool creation:

```text
createPool()
    ↓
Validate data
    ↓
Smart Contract
    ↓
PoolCreated event
    ↓
poolId
    ↓
Save data in database
```

## ✅ Validation

The backend validates:

- Title: 5–100 characters
- Description: 20–500 characters
- Duration: 1 hour–30 days
- Vote configuration
- Vote restrictions

Critical rules are also validated by the smart contract.

## 🛠️ Technologies

- TypeScript
- Node.js
- Express
- MySQL
- Solidity
- Ethereum
- ethers.js

## ⚙️ Setup

```bash
npm install
npm run dev
```

Required environment variables:

```env
DATABASE_URL=
RPC_URL=
PRIVATE_KEY=
CONTRACT_ADDRESS=
```

> Never commit private keys or `.env` files.

## 🚧 Status

Work in progress.

- [x] Backend architecture
- [x] Database
- [x] Input validation
- [ ] Blockchain integration
- [ ] Voting system
- [ ] Frontend