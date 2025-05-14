from locust import HttpUser, task, between
import json

class EthereumUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def send_transaction(self):
        payload = {
            "jsonrpc": "2.0",
            "method": "eth_sendTransaction",
            "params": [{
                "from": "0xYourSenderAddress",
                "to": "0xReceiverAddress",
                "value": "0xDE0B6B3A7640000",  # Equivalent to 1 Ether
                "gas": "0x5208"
            }],
            "id": 1
        }
        headers = {"Content-Type": "application/json"}
        self.client.post("/", data=json.dumps(payload), headers=headers)