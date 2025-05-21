from faker import Faker
from uf_provider import uf_provider
from sexo_provider import sexo_provider
import unicodedata
import random
import json

fake = Faker('pt_BR')
fake.add_provider(uf_provider)
fake.add_provider(sexo_provider)

gen_number = 50

def generate_mock_data(num_records=gen_number):
    i = 0
    data = []

    for _ in range(num_records):
        i+=1
        record = {
            "id" : i,
            "cns": gerar_cns(),
            "nome": unicodedata.normalize('NFC', fake.name().replace('\n', ' ')).strip(),
            "email": unicodedata.normalize('NFC',fake.email().replace('\n', ' ')).strip(),
            "endereco": unicodedata.normalize('NFC',fake.address().replace('\n', ' ')).strip(),
            "idade": random.randint(1, 80),
            "telefone": unicodedata.normalize('NFC',fake.phone_number().replace('\n', ' ')).strip(),
            "observacoes": unicodedata.normalize('NFC',fake.text(max_nb_chars=25).replace('\n', ' ')).strip(),
            "unidade_saude": unicodedata.normalize('NFC',fake.name().replace('\n', ' ')).strip(),
            "uf": unicodedata.normalize('NFC',fake.uf().replace('\n', ' ')).strip(),
            "cpf": unicodedata.normalize('NFC',gerar_cpf().replace('\n', ' ')).strip(),
            "data_nascimento": unicodedata.normalize('NFC',fake.date(pattern='%Y-%m-%d').replace('\n', ' ')).strip(),
            "sexo": unicodedata.normalize('NFC',fake.sexo().replace('\n', ' ')).strip(),
            "tipo_operacao": unicodedata.normalize('NFC',fake.text(max_nb_chars=25).replace('\n', ' ')).strip()
        }
        data.append(record)
    return data

def gerar_cns():
    numero_aleatorio = ''.join([str(random.randint(0, 9)) for _ in range(15)])
    return numero_aleatorio


def calcular_dv(cpf):
    soma1 = sum(int(cpf[i]) * (10 - i) for i in range(9))
    dv1 = (soma1 * 10) % 11
    dv1 = dv1 if dv1 < 10 else 0
    
    soma2 = sum(int(cpf[i]) * (11 - i) for i in range(9)) + dv1 * 2
    dv2 = (soma2 * 10) % 11
    dv2 = dv2 if dv2 < 10 else 0
    
    return f"{dv1}{dv2}"

def gerar_cpf():
    cpf_base = "".join([str(random.randint(0, 9)) for _ in range(9)])
    cpf_completo = cpf_base + calcular_dv(cpf_base)
    return cpf_completo


mock_data = generate_mock_data(gen_number)
# for record in mock_data:
with open(f"data_{gen_number}.json", "w", encoding='utf-8') as json_file:
    json.dump(mock_data, json_file,  ensure_ascii=False, indent=4)
