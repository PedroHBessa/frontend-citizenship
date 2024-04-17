import { RJSFSchema } from '@rjsf/utils';

export const deathCertificateSchema: RJSFSchema = {
  type: 'object',
  title: 'Death Certificate Data',
  required: ['date'],
  properties: {
    date: { type: 'string', format: 'date', title: 'Date' },
    registration: {
      type: 'object',
      title: 'Registration',
      properties: {
        id: { type: 'string', title: 'Registration ID' },
        book: { type: 'string', title: 'Registration Book' },
        sheet: { type: 'string', title: 'Registration Sheet' },
        number: { type: 'string', title: 'Registration Number' },
        location: {
          type: 'object',
          title: 'Registration Location',
          properties: {
            name: { type: 'string', title: 'Registration Office Name' },
            address: { type: 'string', title: 'Address' },
            city: { type: 'string', title: 'City' },
            state: { type: 'string', title: 'State' },
            country: { type: 'string', title: 'Country' },
          },
        },
        officeContactInfo: {
          type: 'object',
          title: 'Registration Location Contact Info',
          properties: {
            email: { type: 'string', title: 'Office Email' },
            phone: { type: 'string', title: 'Office Phone' },
          },
        },
      },
    },
    fullName: { type: 'string', title: 'Full Name' },
    firstName: { type: 'string', title: 'First Name' },
    lastName: { type: 'string', title: 'Last Name' },
    age: { type: 'number', title: 'Age' },
    nationality: {
      type: 'string',
      title: 'Nationality',
    },
    dateOfBirth: { type: 'string', format: 'date', title: 'Date of Birth' },
    placeOfBirth: {
      type: 'object',
      title: 'Place of Birth',
      properties: {
        name: { type: 'string', title: 'Place of Birth Name' },
        address: { type: 'string', title: 'Address' },
        city: { type: 'string', title: 'City' },
        state: { type: 'string', title: 'State' },
        country: { type: 'string', title: 'Country' },
      },
    },
    dateOfDeath: { type: 'string', format: 'date', title: 'Date of Death' },
    placeOfDeath: {
      type: 'object',
      title: 'Place of Death',
      properties: {
        name: { type: 'string', title: 'Place of Death Name' },
        address: { type: 'string', title: 'Address' },
        city: { type: 'string', title: 'City' },
        state: { type: 'string', title: 'State' },
        country: { type: 'string', title: 'Country' },
      },
    },
    father: {
      type: 'object',
      title: 'Father',
      properties: {
        fullName: {
          type: 'string',
          title: 'Full Name',
        },
        firstName: {
          type: 'string',
          title: 'First Name',
        },
        lastName: {
          type: 'string',
          title: 'Last Name',
        },
        dateOfBirth: {
          type: 'string',
          format: 'date',
          title: 'Date of Birth',
        },
        age: {
          type: 'string',
          title: 'Age',
        },
        nationality: {
          type: 'string',
          title: 'Nationality',
        },
        placeOfBirth: {
          type: 'object',
          title: 'Father Place of Birth',
          properties: {
            name: { type: 'string', title: 'Place of Birth Name' },
            address: { type: 'string', title: 'Address' },
            city: { type: 'string', title: 'City' },
            state: { type: 'string', title: 'State' },
            country: { type: 'string', title: 'Country' },
          },
        },
      },
    },
    mother: {
      type: 'object',
      title: 'Mother',
      properties: {
        fullName: {
          type: 'string',
          title: 'Full Name',
        },
        firstName: {
          type: 'string',
          title: 'First Name',
        },
        lastName: {
          type: 'string',
          title: 'Last Name',
        },
        dateOfBirth: {
          type: 'string',
          format: 'date',
          title: 'Date of Birth',
        },
        age: {
          type: 'string',
          title: 'Age',
        },
        nationality: {
          type: 'string',
          title: 'Nationality',
        },
        placeOfBirth: {
          type: 'object',
          title: 'Mother Place of Birth',
          properties: {
            name: { type: 'string', title: 'Place of Birth Name' },
            address: { type: 'string', title: 'Address' },
            city: { type: 'string', title: 'City' },
            state: { type: 'string', title: 'State' },
            country: { type: 'string', title: 'Country' },
          },
        },
      },
    },
  },
};

export default deathCertificateSchema;
