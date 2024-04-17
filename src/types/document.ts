export interface MemberDocument {
  _id: string;
  familyMemberId: string;
  documentType: MemberDocumentType;
  processing: boolean;
  documentPath: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  rawContent: string;
}

export interface IMemberDocuments {
  [key: string]:
    | IBirthCertificateData
    | IDeathCertificateData
    | IMarriageCertificateData;
}

export enum MemberDocumentType {
  UNKNOWN = 'unknown',
  BIRTH_CERTIFICATE = 'birthCertificate',
  DEATH_CERTIFICATE = 'deathCertificate',
  MARRIAGE_CERTIFICATE = 'marriageCertificate',
  DIVORCE_CERTIFICATE = 'divorceCertificate',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum BirthCertificateType {
  BAPTISM = 'battesimo',
  BIRTH = 'nascita',
}

export enum MarriageCertificateType {
  CIVIL = 'civil',
  RELIGIOUS = 'religious',
}

export interface IPerson {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  age?: string;
  nationality?: string;
  placeOfBirth?: ILocation; // TODO
}

export interface ISpouse extends IPerson {
  occupation?: string;
  father?: IPerson;
  mother?: IPerson;
}

export interface IBirthCertificateParent extends ISpouse {
  declarant?: boolean;
  identificationDocument?: string;
  residence?: string;
}

export interface ILocation {
  raw?: string;
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface IRegistration {
  id?: string;
  book?: string;
  sheet?: string;
  number?: string;
  location?: ILocation;
  officeContactInfo?: {
    email?: string;
    phone?: string;
  };
}

export interface IIncomingDocumentData {
  _id: string;
  documentType: MemberDocumentType;
  date?: string;
  registration?: IRegistration;
  documentPath: string;
}

export interface IIncomingBirthCertificateData {
  birthCertificateType?: BirthCertificateType;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  placeOfBirth?: ILocation;
  gender?: Gender;
  father?: IBirthCertificateParent;
  mother?: IBirthCertificateParent;
}

export interface IIncomingDeathCertificateData {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  age?: string;
  nationality?: string;
  dateOfBirth?: string;
  placeOfBirth?: ILocation;
  dateOfDeath?: string;
  placeOfDeath?: ILocation;
  father?: IPerson;
  mother?: IPerson;
  spouseName?: string;
  childrenName?: string[];
}

export interface IIncomingMarriageCertificateData {
  marriageCertificateType?: MarriageCertificateType;
  male: ISpouse;
  female: ISpouse;
}

export interface IBirthCertificateData
  extends IIncomingDocumentData,
    IIncomingBirthCertificateData {}

export interface IDeathCertificateData
  extends IIncomingDocumentData,
    IIncomingDeathCertificateData {}

export interface IMarriageCertificateData
  extends IIncomingDocumentData,
    IIncomingMarriageCertificateData {}
