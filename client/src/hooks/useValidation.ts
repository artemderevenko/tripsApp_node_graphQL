import { useState, useEffect } from 'react';
import moment from 'moment';

import { IUseValidationProps } from '../types/useValidationProps';
import { IUseValidationResult } from '../types/useValidationResult';

export const useValidation = ({
  initialValue,
  name,
  validations,
  checkError
}: IUseValidationProps): IUseValidationResult => {
  const [isValid, setValid] = useState<boolean>(true);
  const [textError, setTextError] = useState<string>('');

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  useEffect(() => { 
    if (!checkError) return;

    let validationError: boolean = false;
    let validationTextError: string = '';

    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          if (!initialValue || !initialValue.trim().length) {
            validationError = true;
            validationTextError = `${name} required`;
          }
          break;

        case 'isNumber':
          const isNumber = typeof Number(initialValue) === 'number' && !isNaN(Number(initialValue))
          if (!isNumber) {
            validationError = true;
            validationTextError = `${name} must be a number`;
          }
          break;

        case 'isPrice':
          const isPrice = /^[1-9]\d*$/.test(initialValue)
          if (!isPrice && initialValue !== '0') {
            validationError = true;
            validationTextError = `${name} must be valid`;
          }
          break;

        case 'isEmail':
          if (!validateEmail(initialValue)) {
            validationError = true;
            validationTextError = `${name} must be valid`;
          }
          break;

        case 'maxLength':
          const maxLength = validations[validation];
          if (maxLength && initialValue.length > maxLength) {
            validationError = true;
            validationTextError = `${name} should be at least ${maxLength} characters`;
          }
          break;

        case 'minLength':
          const minLength = validations[validation];
          if (minLength && initialValue.length < minLength) {
            validationError = true;
            validationTextError = `${name} should be more than ${minLength} characters`;
          }
          break;

        case 'isDateFormat':
          const format = validations[validation];
          const dateFormat = moment(initialValue, format, true);
          const isValidFormat = dateFormat.isValid();
          if (!isValidFormat) {
            validationError = true;
            validationTextError = `${name} must be in ${format} format`;
          }
          break;

        case 'isDatePast':
          const datePastData = validations[validation];
          const datePastFormat = datePastData?.format || '';
          const datePastCompared = datePastData?.comparedDate ? moment(datePastData.comparedDate, datePastFormat, true) : '';
          const isPast = moment(initialValue, datePastFormat, true).isSameOrBefore(datePastCompared);
          if (!isPast) {
            validationError = true;
            validationTextError = `${name} must be in the past`;
          }
          break;

        case 'isDateFuture':
          const dateFutureData = validations[validation];
          const dateFutureFormat = dateFutureData?.format || '';
          const dateFutureCompared = dateFutureData?.comparedDate ? moment(dateFutureData.comparedDate, dateFutureFormat, true) : '';
          const isFuture = moment(initialValue, dateFutureFormat, true).isSameOrAfter(dateFutureCompared);
          if (!isFuture) {
            validationError = true;
            validationTextError = `${name} must be in the future`;
          }
          break;

        case 'dateAIsBeforeDateB':
          const isBeforeData = validations[validation];
          const isBeforeDataFormat = isBeforeData?.format || '';
          const isBeforeDataA = isBeforeData?.dateA ? moment(isBeforeData?.dateA, isBeforeDataFormat, true) : '';
          const isBeforeDataB = isBeforeData?.dateB ? moment(isBeforeData?.dateB, isBeforeDataFormat, true) : '';
          const isBeforeDataAName = isBeforeData?.nameDateA || '';
          const isBeforeDataBName = isBeforeData?.nameDateB || '';
          const isBefore = moment(isBeforeDataA).isSameOrBefore(isBeforeDataB);
          if (isBeforeDataB && !isBefore) {
            validationError = true;
            validationTextError = `${isBeforeDataAName || 'Start date'} must be before ${isBeforeDataBName || 'End date'}`;
          }
          break;

        case 'dateAIsAfterDateB':
          const isAfterData = validations[validation];
          const isAfterDataFormat = isAfterData?.format || '';
          const isAfterDataA = isAfterData?.dateA ? moment(isAfterData?.dateA, isAfterDataFormat, true) : '';
          const isAfterDataB = isAfterData?.dateB ? moment(isAfterData?.dateB, isAfterDataFormat, true) : '';
          const isAfterDataAName = isAfterData?.nameDateA || '';
          const isAfterDataBName = isAfterData?.nameDateB || '';
          const isAfter = moment(isAfterDataA).isSameOrAfter(isAfterDataB);
          if (isAfterDataB && !isAfter) {
            validationError = true;
            validationTextError = `${isAfterDataAName || 'End date'} must be after ${isAfterDataBName || 'Start date'}`;
          }
          break;

        default:
          break;
      }

      if (validationError) { break }
    }

    setValid(!validationError);
    setTextError(validationTextError);
  }, [checkError]);

  return {
    isValid,
    textError,
  };
};