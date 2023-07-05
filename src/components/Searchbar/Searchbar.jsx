import { useState } from 'react';

import { CiSearch } from 'react-icons/ci';

export function Searchbar({ handleSubmit }) {
  const [value, setValue] = useState('');

  const changeInput = e => {
    setValue(e.target.value);
  };

  const inputSubmit = e => {
    e.preventDefault();

    if (e.target.elements.query.value.trim() === '') {
      return;
    }

    handleSubmit(e.target.elements.query.value);

    setValue('');
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={e => inputSubmit(e)}>
        <button type="submit" className="searchForm-button">
          <span className="button-label">
            <CiSearch size="25px" />
          </span>
        </button>

        <input
          className="searchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          name="query"
          onChange={e => {
            changeInput(e);
          }}
        />
      </form>
    </header>
  );
}
