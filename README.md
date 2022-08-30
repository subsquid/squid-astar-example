# squid-template

This is a sample [squid](https://subsquid.io) project to demonstrate its structure and conventions.
It tracks all `Ethereum.transact` calls on Astar and extracts basic information:
- `from` address
- `to` address
- Tx input
- Tx hash
- Method (tries to detect: `Approve`, `Transfer`, `TransferFrom`)

If either `to`,`from` or `input` is `null`, the transaction is skipped. 

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

# 5. Now start the processor
make process

# 6. The above command will block the terminal
#    being busy with fetching the chain data, 
#    transforming and storing it in the target database.
#
#    To start the graphql server open the separate terminal
#    and run. The server is started at http://localhost:4350/
npx squid-graphql-server
```
