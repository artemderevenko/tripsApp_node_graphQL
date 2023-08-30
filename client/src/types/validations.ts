export interface IValidations {
  isEmpty?: boolean;
  isNumber?: boolean;
  isPrice?: boolean;
  isEmail?: true;
  maxLength?: number;
  minLength?: number;
  isDateFormat?: string;
  isDatePast?: {
    format: string,
    comparedDate: string,
  },
  isDateFuture?: {
    format: string,
    comparedDate: string,
  },
  dateAIsBeforeDateB?: {
    format: string,
    dateA: string,
    dateB: string,
    nameDateA: string,
    nameDateB: string,
  },
  dateAIsAfterDateB?: {
    format: string,
    dateA: string,
    dateB: string,
    nameDateA: string,
    nameDateB: string,
  },
};