import React, { useState } from 'react';

interface EditableDropdownCombProps {
  options: string[];
  initialValue?: string;
}

const EditableDropdownComb: React.FC<EditableDropdownCombProps> = ({ options, initialValue = '' }) => {
  const [customOptions, setCustomOptions] = useState<string[]>(options);
  const [selectedValue, setSelectedValue] = useState<string>(initialValue);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [confirmationMessage, setConfirmationMessage] = useState<string>('');

  // Handles dropdown selection change
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    console.log('Dropdown selected:', value);  // Log selected value
    if (value === 'editable') {
      setSelectedValue(''); // Clear the input field when "Other" is selected
      setIsEditing(true);    // Switch to input mode
      setError('');          // Clear any previous errors
      setConfirmationMessage(''); // Clear confirmation message
    } else {
      setSelectedValue(value); // Set selected value from the dropdown
      setIsEditing(false);      // Switch to dropdown mode
    }
  };

  // Handles input field change (for custom options)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    setError(''); // Clear any existing errors while typing
    setConfirmationMessage(''); // Clear confirmation message
    console.log('Input changed:', event.target.value);  // Log input value
  };

  // Handles input blur (when user clicks outside or presses Enter)
  const handleBlur = () => {
    const trimmedValue = selectedValue.trim();
    console.log('Input blurred, value:', trimmedValue);  // Log value on blur

    // Validate input length (option must be at least 3 characters long)
    if (trimmedValue && trimmedValue.length < 3) {
      setError('Option must be at least 3 characters long.');
      console.log('Error: Option must be at least 3 characters long.');  // Log error
      return;
    }

    // Prevent duplicates (case-insensitive check)
    if (
      trimmedValue &&
      !customOptions.some((option) => option.toLowerCase() === trimmedValue.toLowerCase())
    ) {
      setCustomOptions((prevOptions) => {
        const newOptions = [...prevOptions, trimmedValue]; // Add custom option to the list
        console.log('New options list:', newOptions);  // Log updated options list
        return newOptions;
      });
      setConfirmationMessage('Option added successfully!'); // Set confirmation message
      setError('');
    } else {
      setError('This option already exists.');
      console.log('Error: This option already exists.');  // Log error
    }

    setIsEditing(false); // Switch back to dropdown mode after blur
  };

  // Clears the custom input
  const clearCustomInput = () => {
    console.log('Input cleared');  // Log when input is cleared
    setSelectedValue('');
    setIsEditing(false);
    setError('');
    setConfirmationMessage('');
  };

  // Handles keyboard actions (Enter to add, Escape to clear)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('Enter key pressed');  // Log Enter key press
      handleBlur();
    } else if (event.key === 'Escape') {
      console.log('Escape key pressed');  // Log Escape key press
      clearCustomInput();
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      {isEditing ? (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="text"
            value={selectedValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder="Type your option..."
            style={{
              flex: 1,
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
            autoFocus
            aria-label="Type your own option"
          />
          <button
            onClick={selectedValue.trim() ? handleBlur : clearCustomInput}
            style={{
              padding: '8px 12px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {selectedValue.trim() ? 'Add' : 'Clear'} {/* Show "Add" after typing, "Clear" when empty */}
          </button>
        </div>
      ) : (
        <select
          value={selectedValue}
          onChange={handleSelectChange}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          aria-label="Select an option"
        >
          <option value="" disabled>
            Select an option
          </option>
          {customOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
          <option value="editable">Other (Type your own)</option>
        </select>
      )}

      {error && (
        <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{error}</p>
      )}

      {confirmationMessage && (
        <p style={{ color: 'green', fontSize: '12px', marginTop: '5px' }}>
          {confirmationMessage}
        </p>
      )}
    </div>
  );
};

export default EditableDropdownComb;
