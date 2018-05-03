
### Installation
```
npm install
```

### Export variables
```
export NETWORK_URL=http://localhost:8545
export NETWORK_URL=http://192.168.1.104:8545
```

### Using Docker
```
https://github.com/ethereum/go-ethereum/wiki/Running-in-Docker
```

### Ethereum Quick Commands
```
docker run -it -p 8545:8545 -p 30303:30303 ethereum/client-go --rpc --rpcaddr "0.0.0.0"
docker run -it -p 30303:30303 ethereum/client-go console
```

##### To Use Personal Account
```
sudo docker run -it -p 8545:8545 -p 30303:30303 ethereum/client-go --rpc --rpcaddr "0.0.0.0" --rpcapi db,eth,net,web3,personal
```

```
Etherbase Account : 0x007ccffb7916f37f7aeef05e8096ecfbe55afc2f
```