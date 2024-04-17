import { RJSFSchema } from '@rjsf/utils';
import { BirthCertificateType, Gender } from 'types/document';

export const birthCertificateSchema: RJSFSchema = {
  type: 'object',
  title: 'Birth Certificate Data',
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
    birthCertificateType: {
      type: 'string',
      title: 'Birth Certificate Type',
      enum: Object.values(BirthCertificateType),
    },
    fullName: { type: 'string', title: 'Full Name' },
    firstName: { type: 'string', title: 'First Name' },
    lastName: { type: 'string', title: 'Last Name' },
    dateOfBirth: { type: 'string', format: 'date', title: 'Date of Birth' },
    gender: {
      type: 'string',
      title: 'Gender',
      enum: Object.values(Gender),
    },
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
    father: {
      type: 'object',
      title: 'Father',
      properties: {
        declarant: { type: 'boolean', title: 'Declarant of Birth' },
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
        identificationDocument: { type: 'string', title: 'Document' },
        residence: { type: 'string', title: 'Residence' },
        occupation: { type: 'string', title: 'Occupation' },
        father: {
          type: 'object',
          title: 'Paternal Grandfather',
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
              title: 'Paternal Grandfather Place of Birth',
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
          title: 'Paternal Grandmother',
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
              title: 'Paternal Grandmother Place of Birth',
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
    mother: {
      type: 'object',
      title: 'Mother',
      properties: {
        declarant: { type: 'boolean', title: 'Declarant of Birth' },
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
        identificationDocument: { type: 'string', title: 'Document' },
        residence: { type: 'string', title: 'Residence' },
        occupation: { type: 'string', title: 'Occupation' },
        father: {
          type: 'object',
          title: 'Maternal Grandfather',
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
              title: 'Maternal Grandfather Place of Birth',
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
          title: 'Maternal Grandmother',
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
              title: 'Maternal Grandmother Place of Birth',
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

export default birthCertificateSchema;
