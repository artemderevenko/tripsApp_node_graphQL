import moment from 'moment';

import styles from './AddClientModal.module.sass';
import { CustomInput } from '../CustomInput';
import { CustomModal } from '../CustomModal';
import { CustomSelect } from '../CustomSelect';
import { SEX_OPTIONS as sexOptions } from '../../constants/selectOptions';
import { useGetSelectOption } from '../../hooks/useGetSelectOption';
import { useInput } from '../../hooks/useInput';
import { useSelect } from '../../hooks/useSelect';
import { IAddClientModalProps } from '../../types/addClientModalProps';

const AddClientModal: React.FC<IAddClientModalProps> = ({ onClose, onAddClient, data = {} }) => {
  const firstName = useInput({
    initialValue: data && data.firstName ? data.firstName : '',
    name: 'First name',
    validations: { isEmpty: true }
  });

  const lastName = useInput({
    initialValue: data && data.lastName ? data.lastName : '',
    name: 'Last name',
    validations: { isEmpty: true }
  });

  const middleName = useInput({
    initialValue: data && data.middleName ? data.middleName : '',
    name: 'Middle name',
    validations: { isEmpty: true }
  });

  const birth = useInput({
    initialValue: data && data.birth ? data.birth : '',
    name: 'Date of birth',
    validations: {
      isEmpty: true,
      isDateFormat: 'DD/MM/YYYY',
      isDatePast: {
        format: 'DD/MM/YYYY',
        comparedDate: moment().format('DD/MM/YYYY')
      },
    }
  });

  const sex = useSelect({
    initialValue: data && data.sex ? data.sex : '',
    name: 'Sex',
  });

  const passport = useInput({
    initialValue: data && data.passport ? data.passport : '',
    name: 'Passport',
    validations: { isEmpty: true }
  });

  const handleSave = () => {
    const firstNameValid = firstName.isValid && firstName.value;
    const lastNameValid = lastName.isValid && lastName.value;
    const middleNameValid = middleName.isValid && middleName.value;
    const birthValid = birth.isValid && birth.value;
    const sexValid = sex.isValid && sex.value;
    const passportValid = passport.isValid && passport.value;

    if (firstNameValid && lastNameValid && middleNameValid && birthValid && sexValid && passportValid) {
      onAddClient({ 
        ...data, 
        id: data && data.id ? data.id : `${Math.floor(Date.now() / 1000)}`,
        firstName: firstName.value.trim(), 
        lastName: lastName.value.trim(), 
        middleName: middleName.value.trim(), 
        birth: birth.value.trim(), 
        sex: `${sex.value}`.trim(), 
        passport: passport.value.trim() 
      });
      onClose();
      return;
    } 
    
    if (!firstNameValid) { firstName.onCheckError() }
    if (!lastNameValid) { lastName.onCheckError() }
    if (!middleNameValid) { middleName.onCheckError() }
    if (!birthValid) { birth.onCheckError() }
    if (!sexValid) { sex.onCheckError() }
    if (!passportValid) { passport.onCheckError() }
  }

  return (
    <CustomModal
      title={'Add new client'}
      onClose={onClose}
      buttonsList={[
        {
          onButtonClick: onClose,
          buttonText: 'Cancel',
          type: 'cancel',
        },
        {
          onButtonClick: handleSave,
          buttonText: 'Save',
          type: 'confirm',
        }
      ]}
    >
      <div className={styles['modal-content']}>
        <div className={styles['column']}>
          <div className={styles['input-row']}>
            <CustomInput
              type="text"
              value={firstName.value}
              onChange={firstName.onChange}
              onBlur={firstName.onBlur}
              placeholder={firstName.name}
              textError={firstName.textError}
            />
          </div>
          <div className={styles['input-row']}>
            <CustomInput
              type="text"
              value={lastName.value}
              onChange={lastName.onChange}
              onBlur={lastName.onBlur}
              placeholder={lastName.name}
              textError={lastName.textError}
            />
          </div>
          <div className={styles['input-row']}>
            <CustomInput
              type="text"
              value={middleName.value}
              onChange={middleName.onChange}
              onBlur={middleName.onBlur}
              placeholder={middleName.name}
              textError={middleName.textError}
            />
          </div>
        </div>
        <div className={styles['column']}>
          <div className={styles['input-row']}>
            <CustomSelect
              placeholder={sex.name}
              selectValue={useGetSelectOption(sex.value, sexOptions)}
              selectOptions={sexOptions}
              onChange={sex.onChange}
              onBlur={sex.onBlur}
              textError={sex.textError}
            />
          </div>
          <div className={styles['input-row']}>
            <CustomInput
              type="text"
              value={birth.value}
              onChange={birth.onChange}
              onBlur={birth.onBlur}
              placeholder={birth.name}
              textError={birth.textError}
            />
          </div>
          <div className={styles['input-row']}>
            <CustomInput
              type="text"
              value={passport.value}
              onChange={passport.onChange}
              onBlur={passport.onBlur}
              placeholder={passport.name}
              textError={passport.textError}
            />
          </div>
        </div>
      </div>
    </CustomModal>
  )
};

export { AddClientModal };