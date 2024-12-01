// import React, { useState } from 'react';
// import Select, { components, SingleValue } from 'react-select';

// interface OptionType {
//   label: string;
//   value: string;
// }

// const EditableDropdown: React.FC = () => {
//   const [options, setOptions] = useState<OptionType[]>([
//     { label: 'Option 1', value: 'option1' },
//     { label: 'Option 2', value: 'option2' },
//     { label: 'Option 3', value: 'option3' },
//   ]);
//   const [inputValue, setInputValue] = useState<string>('');
//   const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(null);

//   console.log('Rendered with options:', options);
//   console.log('Selected option:', selectedOption);

//   // Custom single-value display component
//   const SingleValueDisplay = (props: any) => {
//     return (
//       <components.SingleValue {...props}>
//         {props.data.label === 'editable' ? inputValue || 'Type your option...' : props.data.label}
//       </components.SingleValue>
//     );
//   };

//   // Handle change event
//   const handleChange = (newValue: SingleValue<OptionType>) => {
//     console.log('Change event triggered:', newValue);
//     if (newValue?.value === 'editable') {
//       console.log('Editable option selected. Switching to input mode.');
//       setInputValue('');
//       setSelectedOption(newValue);
//     } else {
//       console.log('Dropdown option selected:', newValue);
//       setSelectedOption(newValue);
//     }
//   };

//   // Handle input change event (for custom input)
//   const handleInputChange = (value: string) => {
//     console.log('Input change event triggered:', value);
//     setInputValue(value);
//   };

//   // Add custom option on blur or Enter key
//   const handleCustomOptionAdd = () => {
//     const trimmedValue = inputValue.trim();
//     console.log('Attempting to add custom option:', trimmedValue);

//     if (trimmedValue.length < 3) {
//       console.log('Error: Custom option must be at least 3 characters long.');
//       alert('Custom option must be at least 3 characters long.');
//       return;
//     }

//     if (options.some((opt) => opt.label.toLowerCase() === trimmedValue.toLowerCase())) {
//       console.log('Error: Custom option already exists.');
//       alert('Option already exists.');
//       return;
//     }

//     const newOption: OptionType = { label: trimmedValue, value: trimmedValue.toLowerCase() };
//     setOptions((prevOptions) => {
//       const updatedOptions = [...prevOptions, newOption];
//       console.log('Updated options list:', updatedOptions);
//       return updatedOptions;
//     });
//     setSelectedOption(newOption);
//     setInputValue('');
//     console.log('Custom option added successfully:', newOption);
//   };

//   // Handle keydown (Enter to save, Escape to cancel)
//   const handleKeyDown = (event: React.KeyboardEvent) => {
//     console.log('Keydown event:', event.key);
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       handleCustomOptionAdd();
//     } else if (event.key === 'Escape') {
//       console.log('Escape key pressed. Clearing input.');
//       setSelectedOption(null);
//       setInputValue('');
//     }
//   };

//   // Extend the menu options
//   const customOptions = [
//     ...options,
//     { label: 'Other (Type your own)', value: 'editable' },
//   ];
//   console.log('Custom options:', customOptions);

//   return (
//     <div style={{ maxWidth: '300px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
//       <Select
//         options={customOptions}
//         value={selectedOption}
//         onChange={handleChange}
//         onInputChange={handleInputChange}
//         placeholder="Select an option"
//         isClearable
//         components={{
//           SingleValue: SingleValueDisplay,
//           Input: (props) => (
//             <components.Input
//               {...props}
//               onKeyDown={handleKeyDown}
//               autoFocus={selectedOption?.value === 'editable'}
//             />
//           ),
//         }}
//         styles={{
//           container: (provided) => ({ ...provided, width: '100%' }),
//           input: (provided) => ({
//             ...provided,
//             color: 'black',
//           }),
//         }}
//       />
//     </div>
//   );
// };

// export default EditableDropdown;

import React, { useState, useCallback } from 'react';
import Select, { components, SingleValue } from 'react-select';

interface OptionType {
  label: string;
  value: string;
}

const EditableDropdown: React.FC = () => {
  // Initialize options
  const [options, setOptions] = useState<OptionType[]>([
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ]);
  
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(null); // single value state
  const [inputValue, setInputValue] = useState<string>(''); // input field value
  const [error, setError] = useState<string>(''); // error handling
  
  // Handle input changes and clear any previous errors
  const handleInputChange = useCallback((value: string) => {
    console.log('Input value changed:', value);
    setInputValue(value);
    setError(''); // Clear any errors while typing
  }, []);
  
  // Handle the change in selected value
  const handleChange = (newValue: SingleValue<OptionType>) => {
    console.log('Dropdown selection changed:', newValue);

    // If "Other (Type your own)" option is selected, switch to input mode
    if (newValue?.value === 'editable') {
      console.log('Editable option selected. Switch to input mode.');
      setInputValue('');
      setSelectedOption(newValue);
    } else {
      setSelectedOption(newValue); // Regular option selected
      setError(''); // Clear any previous errors
    }
  };

  // Add the custom option entered by the user
  const handleAddCustomOption = () => {
    const trimmedValue = inputValue.trim();
    console.log('Attempting to add custom option:', trimmedValue);

    // Validation for the custom input (minimum length check)
    if (trimmedValue.length < 3) {
      setError('Option must be at least 3 characters long.');
      console.log('Error: Option must be at least 3 characters long.');
      return;
    }

    // Check if the custom value already exists
    if (options.some((opt) => opt.label.toLowerCase() === trimmedValue.toLowerCase())) {
      setError('Option already exists.');
      console.log('Error: Option already exists.');
      return;
    }

    // Add the custom option to the options list
    const newOption: OptionType = { label: trimmedValue, value: trimmedValue.toLowerCase() };
    setOptions((prevOptions) => [...prevOptions, newOption]);
    setSelectedOption(newOption); // Set the selected custom option
    console.log('Custom option added successfully:', newOption);

    // Reset the input field and error
    setInputValue('');
    setError('');
  };

  // Handle keyboard events (Enter to add, Escape to clear)
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      console.log('Enter key pressed. Adding custom option.');
      handleAddCustomOption();
    } else if (event.key === 'Escape') {
      console.log('Escape key pressed. Clearing input.');
      setSelectedOption(null);
      setInputValue('');
      setError('');
    }
  };

  // Custom SingleValue component to display the label
  const SingleValueDisplay = (props: any) => (
    <components.SingleValue {...props}>
      {props.data.label === 'editable' ? 'Type your option...' : props.data.label}
    </components.SingleValue>
  );

  // Add the "Other" option for custom input at the end
  const customOptions = [
    ...options,
    { label: 'Other (Type your own)', value: 'editable' },
  ];

  console.log('Available Options:', customOptions);

  return (
    <div style={{ maxWidth: '300px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <Select
        options={customOptions}
        value={selectedOption}
        onChange={handleChange}
        onInputChange={handleInputChange}
        placeholder="Select an option"
        isClearable
        components={{
          SingleValue: SingleValueDisplay,
          Input: (props) => (
            <components.Input
              {...props}
              onKeyDown={handleKeyDown}
              autoFocus={selectedOption?.value === 'editable'}
            />
          ),
        }}
        styles={{
          control: (base) => ({ ...base, borderColor: error ? 'red' : base.borderColor }),
        }}
      />
      {error && (
        <div style={{ color: 'red', fontSize: '12px', marginTop: '8px' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default EditableDropdown;
