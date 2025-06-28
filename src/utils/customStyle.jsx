export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#f5f5f5',
    // borderColor: state.isFocused ? '#6b7280' : '#d1d5db', // gray-500 or gray-300
    // boxShadow: state.isFocused ? '0 0 0 2px rgba(107, 114, 128, 0.5)' : 'none', // gray-500 glow
    borderColor: "transparent",
    boxShadow: "none",
    borderRadius: '0px',
    padding: '2px 4px',
    minHeight: '40px',
    fontSize: '0.9em',
    '&:hover': {
      borderColor: 'transparent', // gray-500
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#e5e5e5' // gray-500
      : state.isFocused
      ? '#f3f4f6' // gray-100
      : '#fff',
    color: state.isSelected ? 'black' : '#111827', // white text for selected
    padding: '10px 12px',
    cursor: 'pointer',
    fontSize: '0.9em'
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '0px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    marginTop: '4px',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#111827', // gray-900
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? '#6b7280' : '#9ca3af', // gray-500 or gray-400
    '&:hover': {
      color: 'gray',
    },
  }),
};
;
