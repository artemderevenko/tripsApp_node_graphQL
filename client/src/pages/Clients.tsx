import { useState, useEffect } from 'react';
import { useQuery, useMutation } from "@apollo/client";

import { PageHeader } from '../components/PageHeader';
import { CustomSearchField } from '../components/CustomSearchField';
import { CLIENTS_TABLE_FIELDS as tableFields } from '../constants/clientsTableFields';
import { IClient } from '../types/client';
import { CustomButton } from '../components/CustomButton';
import { AddClientModal } from '../components/AddClientModal';
import { useAppdSelector, useAppDispatch } from '../hooks/reduxHook';
import { setClients } from '../store/slices/clientsSlice';
import { CustomModal } from '../components/CustomModal';
import { PageTitle } from '../components/PageTitle';
import { PageContent } from '../components/PageContent';
import { useFilteredList } from '../hooks/useFilteredList';
import { Table } from '../components/Table';
import { useNotify } from '../hooks/useNotify';
import { GET_CLIENTS } from '../graphql/queries/Client';
import { CREATE_CLIENT, DELETE_CLIENT, UPDATE_CLIENT } from '../graphql/mutations/Client';

const Clients: React.FC = () => {
  const { loading, data: clientsData } = useQuery(GET_CLIENTS, {
    fetchPolicy: 'no-cache',
  });
  const [createClient] = useMutation(CREATE_CLIENT);
  const [updateClient] = useMutation(UPDATE_CLIENT);
  const [deleteClient] = useMutation(DELETE_CLIENT);
  const clients = useAppdSelector(state => state.clients.list);
  const dispatch = useAppDispatch();
  const { setNotify } = useNotify();

  const [showAddClientModal, setShowAddClientModal] = useState<boolean>(false);
  const [deleteClientId, setDeleteClientId] = useState<string | null>(null);
  const [editClientData, setEditClientData] = useState<IClient | null>(null);
  const [activeSearchValue, setActiveSearchValue] = useState<string>('');
  const filteredClients = useFilteredList(clients, activeSearchValue, ['firstName', 'lastName', 'passport']);

  useEffect(() => {
    getClientList()
  }, [clientsData]);

  const getClientList = () => {
    if (clientsData && clientsData.clients && clientsData.clients.length) {
      dispatch(setClients(clientsData.clients));
    } else {
      dispatch(setClients([]));
    }
  }

  const addClient = (client: IClient): void => {
    createClient({
      variables: { ...client }
    })
      .then((response) => {
        if (!response.errors && response.data && response.data.clientData) {
          setNotify({ isActive: true, type: 'success', message: 'Client added successfully!' });
          dispatch(setClients([
            { ...response.data.clientData },
            ...clients
          ]));
        } else {
          setNotify({ isActive: true, type: 'error', message: 'Something went wrong. Please try again later.' });
        }
      })
      .catch((error) => {
        setNotify({ isActive: true, type: 'error', message: 'Something went wrong. Please try again later.' });
      });
  }

  const editClient = (client: IClient): void => {
    updateClient({
      variables: { ...client }
    })
      .then((response) => {
        if (!response.errors && response.data && response.data.updateClient && response.data.updateClient.successful) {

          const updatedClients = clients.map(item => {
            if (item.id === client.id) {
              return { ...client }
            }
            return item;
          });

          dispatch(setClients(updatedClients));
          setNotify({ isActive: true, type: 'success', message: 'Client changed successfully!' });
        } else {
          setNotify({ isActive: true, type: 'error', message: 'Something went wrong. Please try again later.' });
        }
      })
      .catch((error) => {
        setNotify({ isActive: true, type: 'error', message: 'Something went wrong. Please try again later.' });
      });
  }

  const removeClient = () => {
    deleteClient({
      variables: { id: deleteClientId }
    })
      .then((response) => {
        if (!response.errors && response.data && response.data.deleteClient && response.data.deleteClient.successful) {

          const updatedClients = clients.filter(item => item.id !== deleteClientId);

          dispatch(setClients(updatedClients));
          setNotify({ isActive: true, type: 'success', message: 'Client deleted successfully!' });
        } else {
          setNotify({ isActive: true, type: 'error', message: 'Something went wrong. Please try again later.' });
        }
      })
      .catch((error) => {
        setNotify({ isActive: true, type: 'error', message: 'Something went wrong. Please try again later.' });
      });

    setDeleteClientId(null);
  }

  const onSearch = (value: string): void => {
    setActiveSearchValue(value)
  }

  const textNoSearch = activeSearchValue ?
    'No clients found. Try another search criteria.' :
    <div>You haven`t created any client yet. <br /> Start with adding a new client.</div>;

  return (
    <>
      <PageTitle>Clients</PageTitle>
      <PageContent>
        <>
          <PageHeader align={'between'}>
            <>
              <CustomButton
                onClick={() => setShowAddClientModal(true)}
                buttonText={'Add new client'}
                type={'confirm'}
                disable={loading}
                icon={<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>}
              />
              <CustomSearchField
                placeholder={'Search by first name, last name or passport'}
                disable={loading || ((!filteredClients || !filteredClients.length) && !activeSearchValue)}
                onSearch={onSearch}
              />
            </>
          </PageHeader>
          <Table
            tableFields={tableFields}
            isFetching={loading}
            textNoSearch={textNoSearch}
            data={filteredClients}
            className={'clients'}
            optionsList={(option) => ([
              {
                label: 'Edit',
                onClick: () => setEditClientData(option as IClient),
              },
              {
                label: 'Delete',
                className: 'delete',
                onClick: () => setDeleteClientId(option && option.id ? option.id : null),
              }
            ])}
          />
          {
            showAddClientModal ?
              <AddClientModal
                onClose={() => setShowAddClientModal(false)}
                onAddClient={addClient}
              /> : null
          }
          {
            editClientData ?
              <AddClientModal
                onClose={() => setEditClientData(null)}
                onAddClient={editClient}
                data={editClientData}
              /> : null
          }
          {
            deleteClientId ?
              <CustomModal
                title={'Delete client'}
                onClose={() => setDeleteClientId(null)}
                buttonsList={[
                  {
                    onButtonClick: () => setDeleteClientId(null),
                    buttonText: 'Cancel',
                    type: 'cancel',
                  },
                  {
                    onButtonClick: removeClient,
                    buttonText: 'Delete',
                    type: 'delete',
                  }
                ]}
              >
                <div>After you delete a client, it's permanently deleted.</div>
              </CustomModal> : null
          }
        </>
      </PageContent>
    </>
  )
};

export default Clients;