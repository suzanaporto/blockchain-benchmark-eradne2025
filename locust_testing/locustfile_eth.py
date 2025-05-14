from locust import HttpUser, TaskSet, task, between
from web3 import Web3

class BlockchainTasks(TaskSet):
    def on_start(self):
        self.w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))  # Ganache URL
        self.account = self.w3.eth.accounts[0]  # Using the first available account
        # Contract ABI (Replace with the actual ABI of your contract)
        self.contract_abi = [{"anonymous":False,"inputs":[{"indexed":True,"internalType":"address","name":"from","type":"address"},{"indexed":False,"internalType":"address[]","name":"recipients","type":"address[]"}],"name":"BatchDataSent","type":"event"},{"anonymous":False,"inputs":[{"indexed":True,"internalType":"address","name":"from","type":"address"},{"indexed":True,"internalType":"address","name":"to","type":"address"},{"indexed":False,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":False,"internalType":"string","name":"message","type":"string"}],"name":"DataSent","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"receivedData","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"message","type":"string"},{"internalType":"address","name":"sender","type":"address"}],"stateMutability":"view","type":"function","constant":True},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_message","type":"string"}],"name":"sendData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_recipients","type":"address[]"},{"internalType":"uint256[]","name":"_ids","type":"uint256[]"},{"internalType":"string[]","name":"_messages","type":"string[]"}],"name":"sendBatchData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"getData","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"message","type":"string"},{"internalType":"address","name":"sender","type":"address"}],"internalType":"struct BenchmarkTest.Data","name":"","type":"tuple"}],"stateMutability":"view","type":"function","constant":True}]
        # Contract address (replace with actual deployed contract address)
        self.contract_address = "0x781966097bC5df1797fF26cAECC57a5452c0fc58"
        # Instantiate contract object
        self.contract = self.w3.eth.contract(address=self.contract_address, abi=self.contract_abi)

    @task
    def send_data(self):
        to = self.w3.eth.accounts[1]
        nonce = self.w3.eth.get_transaction_count(self.account)
        transaction = {
            # "to": w3.eth.accounts[1],
            "from": self.account,
            "nonce": nonce,
            "gas": 200000,
            "gasPrice": self.w3.to_wei("50", "gwei"),
            "data": self.contract.functions.sendData(self.w3.eth.accounts[1], 1, "Hello, Blockchain!")._encode_transaction_data()
        }

        # Sign and send transaction
        tx_hash = self.w3.eth.send_transaction(transaction)

        print(f"Transaction hash: {tx_hash.hex()}")

    # def send_transaction(self):
    #     transaction = {
    #         "to": self.w3.eth.accounts[1],
    #         "value": self.w3.to_wei(1, 'ether'),
    #         "gas": 21000,
    #         "gasPrice": self.w3.to_wei(50, 'gwei')
    #     }
    #     signed_txn = self.w3.eth.account.sign_transaction(transaction, self.w3.eth.accounts[0])
    #     tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    #     print(f"Transaction sent: {tx_hash.hex()}")

class BlockchainUser(HttpUser):
    tasks = [BlockchainTasks]
    wait_time = between(1, 5)