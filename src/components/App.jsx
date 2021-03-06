import { nanoid } from 'nanoid';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';
import { useLocalStorage } from '../hooks/';

import { Section } from './Section';
import { ContactsFilter } from './ContactsFilter';
import { ContactsForm } from './ContactsForm';
import { ContactsList } from './ContactsList';

import { Wrapper, TitlePhonebook, TitleContacts } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const handleAddContact = data => {
    const { name, number } = data;
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(s => [...s, contact]);
  };

  const handleSearchContact = e => {
    setFilter(e.currentTarget.value);
  };

  const filterContact = () => {
    const normalizeFilterValue = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilterValue),
    );
  };

  const handleDeleteContact = currentId => {
    setContacts(s => s.filter(contact => contact.id !== currentId));
  };

  return (
    <Section>
      <Wrapper>
        <TitlePhonebook>Phonebook</TitlePhonebook>
        <ContactsForm onAddContact={handleAddContact} contacts={contacts} />
        <ContactsFilter value={filter} onSearchContact={handleSearchContact} />
        <TitleContacts>Contacts</TitleContacts>
        <ContactsList
          contacts={filterContact()}
          onDeleteContact={handleDeleteContact}
        />
      </Wrapper>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Section>
  );
};
