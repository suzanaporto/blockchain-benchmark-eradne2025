from locust import HttpUser, task, between

class FabricClient(HttpUser):
    wait_time = between(1, 3)

    @task
    def send_transaction(self):
        payload = {
            "channel": "mychannel",
            "chaincode": "mycc",
            "function": "invoke",
            "args": ["a", "b", "10"]
        }
        self.client.post("/fabric/transaction", json=payload)
