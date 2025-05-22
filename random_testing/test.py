from web3 import Web3, AsyncWeb3
import asyncio

def start():
    w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))  # Ganache URL
    account = w3.eth.accounts[0]  # Using the first available account
    print(account)

    # Contract ABI (Replace with the actual ABI of your contract)
    contract_abi = [{"anonymous":False,"inputs":[{"indexed":True,"internalType":"uint256","name":"patientId","type":"uint256"},{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"cns","type":"string"},{"internalType":"string","name":"nome","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"endereco","type":"string"},{"internalType":"uint256","name":"idade","type":"uint256"},{"internalType":"string","name":"telefone","type":"string"},{"internalType":"string","name":"observacoes","type":"string"},{"internalType":"string","name":"unidade_saude","type":"string"},{"internalType":"string","name":"uf","type":"string"},{"internalType":"string","name":"cpf","type":"string"},{"internalType":"string","name":"data_nascimento","type":"string"},{"internalType":"string","name":"sexo","type":"string"},{"internalType":"string","name":"tipo_operacao","type":"string"}],"indexed":False,"internalType":"struct SampleDataCR.PatientData","name":"p_data","type":"tuple"}],"name":"PatientDataCreated","type":"event"},{"inputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"cns","type":"string"},{"internalType":"string","name":"nome","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"endereco","type":"string"},{"internalType":"uint256","name":"idade","type":"uint256"},{"internalType":"string","name":"telefone","type":"string"},{"internalType":"string","name":"observacoes","type":"string"},{"internalType":"string","name":"unidade_saude","type":"string"},{"internalType":"string","name":"uf","type":"string"},{"internalType":"string","name":"cpf","type":"string"},{"internalType":"string","name":"data_nascimento","type":"string"},{"internalType":"string","name":"sexo","type":"string"},{"internalType":"string","name":"tipo_operacao","type":"string"}],"internalType":"struct SampleDataCR.PatientData","name":"p_data","type":"tuple"}],"name":"createPatientData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"patientId","type":"uint256"}],"name":"getPatientData","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"cns","type":"string"},{"internalType":"string","name":"nome","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"endereco","type":"string"},{"internalType":"uint256","name":"idade","type":"uint256"},{"internalType":"string","name":"telefone","type":"string"},{"internalType":"string","name":"observacoes","type":"string"},{"internalType":"string","name":"unidade_saude","type":"string"},{"internalType":"string","name":"uf","type":"string"},{"internalType":"string","name":"cpf","type":"string"},{"internalType":"string","name":"data_nascimento","type":"string"},{"internalType":"string","name":"sexo","type":"string"},{"internalType":"string","name":"tipo_operacao","type":"string"}],"internalType":"struct SampleDataCR.PatientData","name":"","type":"tuple"}],"stateMutability":"view","type":"function","constant":True}]
    # Contract address (replace with actual deployed contract address)
    contract_address = Web3.to_checksum_address("0x58871d4abf943d062e132e9818785f4f93c066bc")

    # Instantiate contract object
    contract = w3.eth.contract(address=contract_address, abi=contract_abi)

    # Account to send the transaction (replace with your private key safely)
    sender_address = w3.eth.accounts[0]

    # Function to send data to the contract
    def send_data(message):
        to = w3.eth.accounts[1]
        nonce = w3.eth.get_transaction_count(sender_address)
        transaction = contract.functions.createPatientData(message).build_transaction({
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
    send_data({
  'id': 1,
  'cns': '267340511931191',
  'nome': 'Maria Sophia Pereira',
  'email': 'ramosantonella@example.org',
  'endereco': 'Via Garcia, 96\nSão Geraldo\n17614624 da Luz da Serra / AL',
  'idade': 20,
  'telefone': '21 0565-4340',
  'observacoes': 'Incidunt eaque eveniet ea quam cum. Nobis praesentium itaque ullam praesentium. Illo consequuntur tempore aut eos.',
  'unidade_saude': 'Bárbara Fogaça',
  'uf': 'RS',
  'cpf': '97532417719',
  'data_nascimento': '03/02/2002',
  'sexo': 'F',
  'tipo_operacao': 'Doloribus similique est tempore laboriosam eligendi iste. Debitis fugiat impedit accusantium reprehenderit.'
})


if __name__ == '__main__':
    print("Hello World")
    start()