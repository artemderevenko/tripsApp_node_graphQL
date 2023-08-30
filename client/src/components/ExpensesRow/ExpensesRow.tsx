import styles from './ExpensesRow.module.sass';
import { IExpensesRowProps } from '../../types/expensesRowProps';
import { CustomSelect } from '../CustomSelect';
import { CustomInput } from '../CustomInput';
import { useInput } from '../../hooks/useInput';
import { useSelect } from '../../hooks/useSelect';
import { useGetSelectOption } from '../../hooks/useGetSelectOption';
import { ISelectOption } from '../../types/selectOption';
import { IExpenses } from '../../types/expenses';

const ExpensesRow: React.FC<IExpensesRowProps> = ({
  expensesId,
  description,
  amount,
  id,
  onChangeRow,
  deleteRow,
  expensesCategory,
}) => {

  const typeSelect = useSelect({
    initialValue: expensesId || '',
    name: 'Expense category',
  });

  const labelInput = useInput({
    initialValue: description,
    name: 'Description',

  });

  const amountInput = useInput({
    initialValue: amount ? `${amount}` : '',
    name: 'Amount of expenses',
    validations: amount ? {
      isPrice: true
    } : {}
  });

  const changeInput = (
    name: string,
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ): void => {
    onChangeRow({
      expensesId,
      description,
      amount,
      id,
      [name]: name === 'amount' ? Number(e.target.value) : e.target.value
    });
    onChange(e);
  }

  const changeSelect = (
    name: string,
    e: ISelectOption,
    onChange: (e: ISelectOption) => void
  ): void => {
    onChangeRow({
      expensesId,
      description,
      amount,
      id,
      [name]: e.value
    });
    onChange(e);
  }

  const getExpenseOptions = () => {
    if (expensesCategory.length) {
      const options = expensesCategory.map((expenses: IExpenses): ISelectOption => ({
        value: expenses.id,
        label: expenses.name
      }));

      return options

    } 
    return [];
  }

  return (
    <div className={styles['row']}>
      <div className={styles['type']}>
        <CustomSelect
          placeholder={typeSelect.name}
          selectValue={useGetSelectOption(expensesId, getExpenseOptions())}
          selectOptions={getExpenseOptions()}
          onChange={(e) => changeSelect('expensesId', e, typeSelect.onChange)}
        />
      </div>
      <div className={styles['description']}>
        <CustomInput
          type="text"
          value={labelInput.value}
          onChange={(e) => changeInput('description', e, labelInput.onChange)}
          placeholder={labelInput.name}
          onBlur={labelInput.onBlur}
          textError={labelInput.textError}
        />
      </div>
      <div className={styles['amount']}>
        <div className={styles['amount-input']}>
          <CustomInput
            type="number"
            value={amountInput.value}
            onChange={(e) => changeInput('amount', e, amountInput.onChange)}
            placeholder={amountInput.name}
            onBlur={amountInput.onBlur}
            textError={amountInput.textError}
          />
        </div>
        <div className={styles['delete-row']} onClick={deleteRow}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
            <path d="M 38.982422 6.9707031 A 2.0002 2.0002 0 0 0 37.585938 7.5859375 L 24 21.171875 L 10.414062 7.5859375 A 2.0002 2.0002 0 0 0 8.9785156 6.9804688 A 2.0002 2.0002 0 0 0 7.5859375 10.414062 L 21.171875 24 L 7.5859375 37.585938 A 2.0002 2.0002 0 1 0 10.414062 40.414062 L 24 26.828125 L 37.585938 40.414062 A 2.0002 2.0002 0 1 0 40.414062 37.585938 L 26.828125 24 L 40.414062 10.414062 A 2.0002 2.0002 0 0 0 38.982422 6.9707031 z" />
          </svg>
        </div>
      </div>
    </div>
  )
};

export { ExpensesRow };