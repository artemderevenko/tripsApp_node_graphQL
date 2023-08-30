import { useState, useEffect } from 'react';
import { useQuery, useMutation } from "@apollo/client";

import { PageHeader } from '../components/PageHeader';
import { CustomSearchField } from '../components/CustomSearchField';
import { MANAGERS_TABLE_FIELDS as tableFields } from '../constants/managersTableFields';
import { IManager } from '../types/manager';
import { CustomButton } from '../components/CustomButton';
import { AddManagerModal } from '../components/AddManagerModal';
import { useAppdSelector, useAppDispatch } from '../hooks/reduxHook';
import { setManagers } from '../store/slices/managersSlice';
import { CustomModal } from '../components/CustomModal';
import { PageTitle } from '../components/PageTitle';
import { PageContent } from '../components/PageContent';
import { useFilteredList } from '../hooks/useFilteredList';
import { Table } from '../components/Table';
import { useNotify } from '../hooks/useNotify';
import { GET_MANAGERS } from '../graphql/queries/Manager';
import { CREATE_MANAGER, DELETE_MANAGER, UPDATE_MANAGER } from '../graphql/mutations/Manager';

const Managers: React.FC = () => {
  const { loading, data: managersData } = useQuery(GET_MANAGERS, {
    fetchPolicy: 'no-cache',
  });
  const [createManager] = useMutation(CREATE_MANAGER);
  const [updateManager] = useMutation(UPDATE_MANAGER);
  const [deleteManager] = useMutation(DELETE_MANAGER);

  const managers = useAppdSelector(state => state.managers.list);
  const dispatch = useAppDispatch();
  const { setNotify } = useNotify();

  const [showAddManagerModal, setShowAddManagerModal] = useState<boolean>(false);
  const [deleteManagerId, setDeleteManagerId] = useState<string | null>(null);
  const [editManagerData, setEditManagerData] = useState<IManager | null>(null);
  const [activeSearchValue, setActiveSearchValue] = useState<string>('');
  const filteredManagers = useFilteredList(managers, activeSearchValue, ['firstName', 'lastName', 'passport']);

  useEffect(() => {
    getManagerList()
  }, [managersData]);

  const getManagerList = () => {
    if (managersData && managersData.managers && managersData.managers.length) {
      dispatch(setManagers(managersData.managers));
    } else {
      dispatch(setManagers([]));
    }
  }

  const addManager = (manager: IManager): void => {
    createManager({
      variables: { ...manager }
    })
      .then((response) => {
        if (!response.errors && response.data && response.data.managerData) {
          setNotify({ isActive: true, type: 'success', message: 'Manager added successfully!' });
          dispatch(setManagers([
            { ...response.data.managerData },
            ...managers
          ]));
        } else {
          setNotify({ isActive: true, type: 'error', message: 'Something went wrong. Please try again later.' });
        }
      })
      .catch((error) => {
        setNotify({ isActive: true, type: 'error', message: 'Something went wrong. Please try again later.' });
      });
  }

  const editManager = (manager: IManager): void => {
    updateManager({
      variables: { ...manager }
    })
      .then((response) => {
        if (!response.errors && response.data && response.data.updateManager && response.data.updateManager.successful) {

          const updatedManagers = managers.map(item => {
            if (item.id === manager.id) {
              return { ...manager }
            }
            return item;
          });

          dispatch(setManagers(updatedManagers));
          setNotify({ isActive: true, type: 'success', message: 'Manager changed successfully!' });
        } else {
          setNotify({ isActive: true, type: 'error', message: 'Something went wrong. Please try again later.' });
        }
      })
      .catch((error) => {
        setNotify({ isActive: true, type: 'error', message: 'Something went wrong. Please try again later.' });
      });
  }

  const removeManager = () => {
    deleteManager({
      variables: { id: deleteManagerId }
    })
      .then((response) => {
        if (!response.errors && response.data && response.data.deleteManager && response.data.deleteManager.successful) {

          const updatedManagers = managers.filter(item => item.id !== deleteManagerId);

          dispatch(setManagers(updatedManagers));
          setNotify({ isActive: true, type: 'success', message: 'Manager deleted successfully!' });
        } else {
          setNotify({ isActive: true, type: 'error', message: 'Something went wrong. Please try again later.' });
        }
      })
      .catch((error) => {
        setNotify({ isActive: true, type: 'error', message: 'Something went wrong. Please try again later.' });
      });

    setDeleteManagerId(null);
  }

  const onSearch = (value: string): void => {
    setActiveSearchValue(value)
  }

  const textNoSearch = activeSearchValue ?
    'No managers found. Try another search criteria.' :
    <div>You haven`t created any manager yet. <br /> Start with adding a new manager.</div>;

  return (
    <>
      <PageTitle>Managers</PageTitle>
      <PageContent>
        <>
          <PageHeader align={'between'}>
            <>
              <CustomButton
                onClick={() => setShowAddManagerModal(true)}
                buttonText={'Add new manager'}
                type={'confirm'}
                disable={loading}
                icon={<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>}
              />
              <CustomSearchField
                placeholder={'Search by first name, last name or passport'}
                disable={loading || ((!filteredManagers || !filteredManagers.length) && !activeSearchValue)}
                onSearch={onSearch}
              />
            </>
          </PageHeader>
          <Table
            tableFields={tableFields}
            isFetching={loading}
            textNoSearch={textNoSearch}
            data={filteredManagers}
            className={'managers'}
            optionsList={(option) => ([
              {
                label: 'Edit',
                onClick: () => setEditManagerData(option as IManager),
              },
              {
                label: 'Delete',
                className: 'delete',
                onClick: () => setDeleteManagerId(option && option.id ? option.id : null),
              }
            ])}
          />
          {
            showAddManagerModal ?
              <AddManagerModal
                onClose={() => setShowAddManagerModal(false)}
                onAddManager={addManager}
              /> : null
          }
          {
            editManagerData ?
              <AddManagerModal
                onClose={() => setEditManagerData(null)}
                onAddManager={editManager}
                data={editManagerData}
              /> : null
          }
          {
            deleteManagerId ?
              <CustomModal
                title={'Delete manager'}
                onClose={() => setDeleteManagerId(null)}
                buttonsList={[
                  {
                    onButtonClick: () => setDeleteManagerId(null),
                    buttonText: 'Cancel',
                    type: 'cancel',
                  },
                  {
                    onButtonClick: removeManager,
                    buttonText: 'Delete',
                    type: 'delete',
                  }
                ]}
              >
                <div>After you delete a manager, it's permanently deleted.</div>
              </CustomModal> : null
          }
        </>
      </PageContent>
    </>
  )
};

export default Managers;