
export interface SignUp {
  email: string;
  year: number;
  phone: string;
  arriveDate: string;
  leaveDate: string;
  hasTicket: boolean;

  /** Admin Fields */
  signupTimestamp: number;
  accepted: boolean; // Whether this signup has been officially accepted
}