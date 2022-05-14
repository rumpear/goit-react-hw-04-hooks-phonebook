import { nanoid } from 'nanoid';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

import { Section } from './Section';
import { ContactsFilter } from './ContactsFilter';
import { ContactsForm } from './ContactsForm';
import { ContactsList } from './ContactsList';

import { Wrapper, TitlePhonebook, TitleContacts } from './App.styled';

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)) ?? defaultValue,
  );

  return [state, setState];
};

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  // const componentDidMount() {
  //   this.setState({
  //     contacts: localStorage.getItem('contacts')
  //       ? JSON.parse(localStorage.getItem('contacts'))
  //       : [
  //           { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //           { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //           { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //           { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //         ],
  //   });
  // }

  // const componentDidUpdate(_, prevState) {
  //   if (prevState.contacts !== this.state.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  const handleAddContact = data => {
    const { name, number } = data;
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({ contacts: [...contacts, contact] }));
  };

  const handleSearchContact = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  const handleFilterContact = () => {
    const { contacts, filter } = this.state;
    const normalizeFilterValue = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilterValue),
    );
  };

  const handleDeleteContact = todoId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== todoId),
    }));
  };

  // const {
  //   handleAddContact,
  //   handleSearchContact,
  //   handleFilterContact,
  //   handleDeleteContact,
  // } = this;
  // const { filter, contacts } = this.state;
  // const displayedContacts = handleFilterContact();

  return (
    <Section>
      <Wrapper>
        <TitlePhonebook>Phonebook</TitlePhonebook>
        <ContactsForm onAddContact={handleAddContact} contacts={contacts} />
        <ContactsFilter value={filter} onSearchContact={handleSearchContact} />
        <TitleContacts>Contacts</TitleContacts>
        <ContactsList
          contacts={displayedContacts}
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
