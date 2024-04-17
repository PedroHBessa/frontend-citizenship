export interface Family {
  personalInformation: {
    firstName: string;
    lastName: string;
  };
  createdBy?: Operator;
}
export interface Data {
  [key: string]: string & number & boolean & Family & React.ReactNode;
}

export interface Operator {
  userId: {
    _id: string;
    email: string;
  };
}
