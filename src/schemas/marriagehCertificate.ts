import { RJSFSchema } from '@rjsf/utils';
import { MarriageCertificateType } from 'types/document';

export const marriageCertificateSchema: RJSFSchema = {
  type: 'object',
  title: 'Marriage Certificate Data',
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
    marriageCertificateType: {
      type: 'string',
      title: 'Marriage Certificate Type',
      enum: Object.values(MarriageCertificateType),
    },
    male: {
      type: 'object',
      title: 'Husband',
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
        occupation: { type: 'string', format: 'date', title: 'Date' },
        father: {
          type: 'object',
          title: 'Husband Father',
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
          title: 'Husband Mother',
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
    },
    female: {
      type: 'object',
      title: 'Wife',
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
        occupation: { type: 'string', format: 'date', title: 'Date' },
        father: {
          type: 'object',
          title: 'Wife Father',
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
          title: 'Wife Mother',
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
    },
  },
};

export default marriageCertificateSchema;
