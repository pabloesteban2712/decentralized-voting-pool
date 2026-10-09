# Voting Pool

A simple application for creating two-option polls. Poll data is stored in PostgreSQL, while votes are recorded on a Solidity smart contract.

## Project structure

- `Frontend/`: React and Vite interface for creating polls, viewing results, and voting with MetaMask.
- `Backend/app/`: Express and TypeScript REST API backed by PostgreSQL. It creates polls and prepares vote transactions.
- `Smart Contract/`: Solidity contracts and Foundry deployment scripts.

## Requirements

- Node.js and npm
- PostgreSQL
- Foundry (`forge` and `anvil`)
- MetaMask to vote through the interface

## Local setup

### 1. Database

Create a database named `votePool` and load the schema from the project root:

```sh
psql -d votePool -f Backend/app/src/database/schema.sql
```

### 2. Local blockchain

Start Anvil in a terminal:

```sh
anvil
```

In another terminal, create `Smart Contract/.env` from `Smart Contract/.env.example`. Set `PRIVATE_KEY` to an Anvil development key, then deploy the factory:

```sh
cd "Smart Contract"
forge script script/DeployVotingPoolFactory.s.sol:DeployVotingPoolFactory --rpc-url http://127.0.0.1:8545 --broadcast
```

Save the `VotingPoolFactory` address printed by Foundry; the backend needs it in its configuration.

### 3. Backend

Create `Backend/app/.env` from `Backend/app/.env.example` and set:

- `DATABASE_URL`: PostgreSQL connection string for the `votePool` database.
- `RPC_URL`: `http://127.0.0.1:8545` for Anvil.
- `PRIVATE_KEY`: local Anvil key used by the backend to create polls.
- `CONTRACT_ADDRESS`: address of the deployed factory.
- `TOKEN_SECRET` and `REFRESH_SECRET`: random values used to sign tokens.

Install dependencies and start the API:

```sh
cd Backend/app
npm install
npm run dev
```

The API is available at `http://localhost:3000/app`.

### 4. Frontend

With the API running, open another terminal in `Frontend`:

```sh
cd Frontend
npm install
npm run dev
```

Open the URL printed by Vite. To vote, connect MetaMask to Anvil (`http://127.0.0.1:8545`) and use a development account with local funds.

## Voting API

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/app/votes/create` | Creates a poll. Accepts `title`, `description`, and `duration` in seconds. |
| `POST` | `/app/votes/vote` | Prepares a vote. Accepts `poolId` and `option` (`0` or `1`). |
| `GET` | `/app/votes/results/:id` | Returns a poll and its results. |

The backend returns the vote transaction data; MetaMask signs and sends it from the voter's account.

## Security

`.env` files and private keys are kept out of Git. Use only development keys and local funds with Anvil. Never publish secrets or add them to the example configuration files.
