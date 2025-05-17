from faker import Faker
from faker.providers import DynamicProvider

uf_provider = DynamicProvider(
     provider_name="uf",
     elements=["RO", "AC", "AM", "RR", "PA", "AP", "TO", "MA", "PI", "CE", "RN", "PB", "PE", "AL", "SE", "BA", "MG", "ES", "RJ", "SP", "PR", "SC", "RS", "MS", "MT", "GO", "DF"],
)