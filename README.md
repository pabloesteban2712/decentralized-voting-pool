# Voting Pool

Aplicación sencilla para crear votaciones de dos opciones. Guarda los datos de cada pool en PostgreSQL y registra los votos en un contrato Solidity.

## Estructura

- `Frontend/`: interfaz React con Vite. Permite crear pools, consultar resultados y votar con MetaMask.
- `Backend/app/`: API REST con Express, TypeScript y PostgreSQL. Crea pools y prepara transacciones de voto.
- `Smart Contract/`: contratos y scripts de despliegue con Foundry.

## Requisitos

- Node.js y npm
- PostgreSQL
- Foundry (`forge` y `anvil`)
- MetaMask para votar desde la interfaz

## Configuración local

### 1. Base de datos

Crea una base de datos llamada `votePool` y carga el esquema desde la raíz del proyecto:

```sh
psql -d votePool -f Backend/app/src/database/schema.sql
```

### 2. Blockchain local

Inicia Anvil en una terminal:

```sh
anvil
```

En otra terminal, crea `Smart Contract/.env` a partir de `Smart Contract/.env.example`. Pon en `PRIVATE_KEY` una clave de desarrollo de Anvil. Despliega la fábrica:

```sh
cd "Smart Contract"
forge script script/DeployVotingPoolFactory.s.sol:DeployVotingPoolFactory --rpc-url http://127.0.0.1:8545 --broadcast
```

Guarda la dirección de `VotingPoolFactory` que imprime Foundry; la necesitarás en la configuración del backend.

### 3. Backend

Crea `Backend/app/.env` a partir de `Backend/app/.env.example` y configura:

- `DATABASE_URL`: conexión a PostgreSQL y base `votePool`.
- `RPC_URL`: `http://127.0.0.1:8545` para Anvil.
- `PRIVATE_KEY`: clave local de Anvil que usará el backend para crear pools.
- `CONTRACT_ADDRESS`: dirección de la fábrica desplegada.
- `TOKEN_SECRET` y `REFRESH_SECRET`: valores aleatorios para los tokens.

Instala dependencias y arranca la API:

```sh
cd Backend/app
npm install
npm run dev
```

La API queda en `http://localhost:3000/app`.

### 4. Frontend

Con la API activa, abre otra terminal en `Frontend`:

```sh
cd Frontend
npm install
npm run dev
```

Abre la URL que muestra Vite. Para votar, conecta MetaMask a Anvil (`http://127.0.0.1:8545`) y usa una cuenta de desarrollo con fondos locales.

## API de votaciones

| Método | Ruta | Descripción |
| --- | --- | --- |
| `POST` | `/app/votes/create` | Crea un pool. Recibe `title`, `description` y `duration` en segundos. |
| `POST` | `/app/votes/vote` | Prepara el voto. Recibe `poolId` y `option` (`0` o `1`). |
| `GET` | `/app/votes/results/:id` | Devuelve los datos y resultados de un pool. |

El backend devuelve los datos de transacción del voto; MetaMask los firma y envía desde la cuenta del votante.

## Seguridad

Los archivos `.env` y las claves privadas se mantienen fuera de Git. Usa únicamente claves y fondos de desarrollo al trabajar con Anvil; no publiques secretos ni los añadas a los ejemplos de configuración.
