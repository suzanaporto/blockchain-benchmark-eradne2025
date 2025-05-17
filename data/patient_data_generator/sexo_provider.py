from faker import Faker
from faker.providers import DynamicProvider

sexo_provider = DynamicProvider(
     provider_name="sexo",
     elements=["F", "M"],
)