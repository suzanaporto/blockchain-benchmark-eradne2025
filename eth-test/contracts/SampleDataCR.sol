// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract SampleDataCR {
    struct PatientData {
        uint256 id;
        string cns;
        string nome;
        string email;
        string endereco;
        uint idade;
        string telefone;
        string observacoes;
        string unidade_saude;
        string uf;
        string cpf;
        string data_nascimento;
        string sexo;
        string tipo_operacao;
    }

    mapping(uint256 => PatientData) private patientData;
    uint256 private patientCount;

    event PatientDataCreated(uint256 indexed patientId, PatientData p_data);

    function createPatientData(PatientData memory p_data) public {
        patientData[patientCount] = p_data;
        emit PatientDataCreated(patientCount, p_data);
        patientCount++;
    }

    function getPatientData(uint256 patientId) public view returns (PatientData memory) {
        require(patientId < patientCount, "Car does not exist");
        PatientData memory p_data = patientData[patientId];
        return (p_data);
    }

}