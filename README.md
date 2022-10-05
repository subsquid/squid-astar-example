# squid-template

This is a sample [squid](https://subsquid.io) project to demonstrate its structure and conventions.
It tracks all `Ethereum.transact` calls on Astar and extracts basic information:
- `from` address
- `to` address
- Tx input
- Tx hash
- Method sighash (first four bytes of the Tx input)
- Value (if it was one of ERC20 `approve`, `transfer` or `transferFrom`)

The results are saved into a `assets/astar-transactions.csv` and can later be analyzed by tools such as DuckDB.

For more info consult the [docs](https://docs.subsquid.io).

## Prerequisites

* node 16.x
* docker

## Quickly running the sample

```bash
# 1. Install dependencies
npm ci

# 2. Compile typescript files
make build

# 3. Start target Postgres database
make up

# 5. Now start the processor. The CSV file should appear in the assets folder
make process
```
