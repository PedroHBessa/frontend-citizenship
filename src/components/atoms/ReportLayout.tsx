import styled from 'styled-components';

/* const data = {
  italianData: {
    name: 'Pedro',
    lastName: 'Bessa',
    birthDay: '29/06/1992',
    birthCity: 'Rio de janeiro',
    provincia: 'BC',
    fatherName: 'Marcelo Teixeira Bessa',
    motherName: 'Josane Assis Costa',
    isAustroHungaroEmpire: false,
    ProcessNature: 'administrativo',
    consulates: ['Rio de janeiro', 'São Paulo', 'Belo Horizonte'],
    naturalCertificate: 'A, B, C, D',
    applicants: [
      {
        name: 'applicant 1',
        isGenitor: true,
      },
      { name: 'applicant 2', isGenitor: false },
    ],
  },
  members: [
    {
      identifyer: 'italian',
      documents: [
        {
          type: 'marriage',
          partner: 'spouse name',
          errors: ['O correto é A e não B', 'O correto é 1 e não 2'],
        },
        {
          type: 'death',
          errors: ['O correto é A e não B', 'O correto é 1 e não 2'],
        },
      ],
    },
    {
      identifyer: 'italian son',
      documents: [
        {
          type: 'birth',
          errors: ['O correto é A e não B', 'O correto é 1 e não 2'],
        },
        {
          type: 'marriage',
          partner: 'spouse name',
          errors: ['O correto é A e não B', 'O correto é 1 e não 2'],
        },
        {
          type: 'death',
          errors: ['O correto é A e não B', 'O correto é 1 e não 2'],
        },
      ],
    },
    {
      identifyer: 'italian grandson',
      documents: [
        {
          type: 'birth',
          errors: ['O correto é A e não B', 'O correto é 1 e não 2'],
        },
        {
          type: 'marriage',
          partner: 'spouse name',
          errors: ['O correto é A e não B', 'O correto é 1 e não 2'],
        },
        {
          type: 'death',
          errors: ['O correto é A e não B', 'O correto é 1 e não 2'],
        },
      ],
    },
  ],
}; */

const Paper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h3`
  color: #333;
  font-size: 20px;
  margin-bottom: 15px;
  text-align: center;
`;

const SectionTitle = styled.h3`
  color: #555;
  font-size: 18px;
  margin-top: 30px;
`;

const Paragraph = styled.p`
  color: #666;
  font-size: 16px;
  margin-bottom: 10px;
`;

const ListItem = styled.li`
  color: #888;
  font-size: 14px;
`;
/* eslint-disable @typescript-eslint/no-explicit-any */

export function ReportLayout({ data }: { data: any }) {
  return (
    <>
      {data && (
        <Paper>
          <Title>Italian Data</Title>
          <Paragraph>Name: {data.reportData?.italianData?.name}</Paragraph>
          <Paragraph>
            Last Name: {data.reportData?.italianData?.lastName}
          </Paragraph>
          <Paragraph>
            Birthday: {data.reportData?.italianData?.birthDay}
          </Paragraph>
          <Paragraph>
            Birth City: {data.reportData?.italianData?.birthCity}
          </Paragraph>
          <Paragraph>
            Provincia: {data.reportData?.italianData?.provincia}
          </Paragraph>
          <Paragraph>
            Father Name: {data.reportData?.italianData?.fatherName}
          </Paragraph>
          <Paragraph>
            Mother Name: {data.reportData?.italianData?.motherName}
          </Paragraph>
          {data.reportData?.italianData?.isAustroHungaroEmpire ? (
            <Paragraph>
              O Local de nascimento do Dante Causa PERTENCE AO IMPÉRIO AUSTRO
              HÚNGARO *(verificar datas)
            </Paragraph>
          ) : (
            <Paragraph>
              O Local de nascimento do Dante Causa NÃO PERTENCE AO IMPÉRIO
              AUSTRO HÚNGARO *(verificar datas)
            </Paragraph>
          )}
          <Paragraph>
            Conforme Certidão de Batismo apresentada com data superior a
            01/01/1871, verificar com a Comune de competência se não consta o
            mesmo registro já transcrito no Livro de Registro Civil.
          </Paragraph>
          <Paragraph>
            Natureza da Processo:{' '}
            {data.reportData?.italianData?.ProcessNature === 'administrativo'
              ? 'Administrativo'
              : 'Via Materna'}
          </Paragraph>
          <Title>Documents</Title>

          {data.reportData?.members?.map((member: any, index: number) => (
            <div key={index}>
              {member.documents?.map((document: any, i: number) => (
                <div key={i}>
                  <SectionTitle>{`${document.type} certificate (${member.identifyer} ${document.partner ? `and ${document.partner}` : ''})`}</SectionTitle>
                  <Paragraph>Constam os seguintes erros:</Paragraph>
                  <ul>
                    {document.errors.map((error: any, ierror: any) => (
                      <ListItem key={ierror}>{error}</ListItem>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
          <SectionTitle>CIRCUNSCRIÇÃO CONSULAR</SectionTitle>
          <Paragraph>
            Os Consulados de Competência para confirmação da “Mancata Rinuncia”
            (Não Renúncia) São:{' '}
            <b>{data.reportData?.italianData?.consulates.join(', ')}</b>
          </Paragraph>
          <SectionTitle>CERTIDÃO NEGATIVA DE NATURALIZAÇÃO</SectionTitle>
          <Paragraph>
            A Certidão Negativa de Naturalização deve conter as seguintes
            variações:
          </Paragraph>
          <Paragraph>
            {data.reportData?.italianData?.naturalCertificate}
          </Paragraph>
          <SectionTitle>Requerentes</SectionTitle>
          <Paragraph>O(s) Requerente(s) desta prática é/são:</Paragraph>
          <div>
            {data.italianData?.applicants.map((applicant: any, i: any) => (
              <ul key={i}>
                <ListItem>
                  {applicant.name}
                  {applicant.isGenitor &&
                    ` - Necessário reproduzir uma Declaração de Maternidade/Paternidade pois o
              declarante na certidão de nascimento do requerente ${applicant.name} não é o genitor
              interessado na linhagem de descendência, e não há casamento entre os
              pais`}
                </ListItem>
              </ul>
            ))}
          </div>
          <Paragraph>
            O requerente X deve apresentar a Certidão Narrativa do Divórcio
            (Certidão de Fatos se foi em Cartório ou Certidão de Objeto e Pé se
            foi em Juízo);
          </Paragraph>
        </Paper>
      )}
    </>
  );
}
