import { RJSFSchema } from '@rjsf/utils';

const familiesSchema: RJSFSchema = {
  type: 'object',
  'ui:field': 'cpf',
  properties: {
    personalInformation: {
      title: 'Personal Information',
      type: 'object',
      required: ['firstName', 'lastName', 'birthDate'],
      properties: {
        firstName: { type: 'string', title: 'First Name', pattern: '\\S' },
        lastName: { type: 'string', title: 'Last Name', pattern: '\\S' },
        birthDate: {
          type: 'string',
          format: 'date',
          title: 'Birth Date',
          pattern: '\\S',
        },
        city: { type: 'string', title: 'City' },
        birthPlace: { type: 'string', title: 'Birth Place' },
        state: { type: 'string', title: 'State' },
        country: { type: 'string', title: 'Country' },
      },
    },
    addressAbroad: {
      title: 'Address Abroad',
      type: 'object',
      required: [],
      properties: {
        street: { type: 'string', title: 'Street name' },
        number: { type: 'string', title: 'Number' },
        neighborhood: { type: 'string', title: 'Neighborhood' },
        zipCode: { type: 'string', title: 'Zip Code' },
        city: { type: 'string', title: 'City' },
        state: { type: 'string', title: 'State' },
        country: { type: 'string', title: 'Country' },
      },
    },
    italianAddress: {
      title: 'Address in Italy',
      type: 'object',
      required: [],
      properties: {
        street: { type: 'string', title: 'Street name' },
        number: { type: 'string', title: 'Number' },
        zipCode: { type: 'string', title: 'Zip Code' },
        city: { type: 'string', title: 'City' },
        province: { type: 'string', title: 'Province' },
        cf: { type: 'string', title: 'CF (Italian Identification Number)' },
      },
    },
    additionalDocuments: {
      title: 'Additional Documents',
      type: 'object',
      required: ['cpf'],
      properties: {
        cpf: {
          type: 'string',
          title: 'CPF (Brazilian)',
          pattern: '\\S',
        },
        passportNumber: { type: 'string', title: 'Passport Number' },
        passportEmissionDate: {
          type: 'string',
          format: 'date',
          title: 'Emission Date (Passport)',
        },
        noPassport: { type: 'boolean', title: "I don't have a Passport" },
        documentId: { type: 'string', title: 'Document ID' },
        documentIdEmissionDate: {
          type: 'string',
          format: 'date',
          title: 'Emission Date (ID)',
        },
      },
    },
  },
};

export default familiesSchema;
