from web3 import Web3, AsyncWeb3
import asyncio

def start():
    w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))  # Ganache URL
    account = w3.eth.accounts[0]  # Using the first available account
    print(account)

    # Contract ABI (Replace with the actual ABI of your contract)
    contract_abi = [{"anonymous":False,"inputs":[{"indexed":True,"internalType":"address","name":"from","type":"address"},{"indexed":False,"internalType":"address[]","name":"recipients","type":"address[]"}],"name":"BatchDataSent","type":"event"},{"anonymous":False,"inputs":[{"indexed":True,"internalType":"address","name":"from","type":"address"},{"indexed":True,"internalType":"address","name":"to","type":"address"},{"indexed":False,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":False,"internalType":"string","name":"message","type":"string"}],"name":"DataSent","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"receivedData","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"message","type":"string"},{"internalType":"address","name":"sender","type":"address"}],"stateMutability":"view","type":"function","constant":True},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_recipients","type":"address[]"},{"internalType":"uint256[]","name":"_ids","type":"uint256[]"},{"internalType":"string[]","name":"_messages","type":"string[]"}],"name":"sendBatchData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"getData","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"message","type":"string"},{"internalType":"address","name":"sender","type":"address"}],"internalType":"struct BenchmarkTest.Data","name":"","type":"tuple"}],"stateMutability":"view","type":"function","constant":True}]

    # Contract address (replace with actual deployed contract address)
    contract_address = "0xbCCd6B78dBbAAd0b4AcAdB2D9403248Aac101f19"

    # Instantiate contract object
    contract = w3.eth.contract(address=contract_address, abi=contract_abi)

    # Account to send the transaction (replace with your private key safely)
    sender_address = w3.eth.accounts[0]

    # Function to send data to the contract
    def send_data(id, message):
        to = w3.eth.accounts[1]
        nonce = w3.eth.get_transaction_count(sender_address)
        transaction = contract.functions.sendData(to, id, message).build_transaction({
            # "to": w3.eth.accounts[1],
            "from": sender_address,
            "nonce": nonce,
            "gas": 200000,
            "gasPrice": w3.to_wei("50", "gwei")
        })

        estimatedGAs = w3.eth.estimate_gas(transaction)
        print("Ó o gás: ", estimatedGAs)

        # Sign and send transaction
        tx_hash = w3.eth.send_transaction(transaction)
        print(f"Transaction hash: {tx_hash.hex()}")

    # Example Usage
    send_data(1, "Hello, Solidity!")
    send_data(2, "Hello, Solidity2!")
    send_data(3, "Hello, Solidity3!")
    send_data(4, "Hello, Solidity4!")


if __name__ == '__main__':
    print("Hello World")
    start()