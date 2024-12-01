import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface EditableDropdownCombSweetProps {
  options: string[];
  initialValue?: string;
}

const EditableDropdownCombSweet: React.FC<EditableDropdownCombSweetProps> = ({ options, initialValue = '' }) => {
  const [customOptions, setCustomOptions] = useState<string[]>(options);
  const [selectedValue, setSelectedValue] = useState<string>(initialValue);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Handles dropdown selection change
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === 'editable') {
      setSelectedValue(''); // Clear the input field when "Other" is selected
      setIsEditing(true);    // Switch to input mode
      setError('');          // Clear any previous errors
    } else {
      setSelectedValue(value); // Set selected value from the dropdown
      setIsEditing(false);      // Switch to dropdown mode
    }
  };

  // Handles input field change (for custom options)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    setError(''); // Clear any existing errors while typing
  };

  // Handles input blur (when user clicks outside or presses Enter)
  const handleBlur = () => {
    const trimmedValue = selectedValue.trim();

    // Validate input length (option must be at least 3 characters long)
    if (trimmedValue && trimmedValue.length < 3) {
      setError('Option must be at least 3 characters long.');
      Swal.fire('Error', 'Option must be at least 3 characters long.', 'error'); // Show SweetAlert error
      return;
    }

    // Prevent duplicates (case-insensitive check)
    if (
      trimmedValue &&
      !customOptions.some((option) => option.toLowerCase() === trimmedValue.toLowerCase())
    ) {
      setCustomOptions((prevOptions) => {
        const newOptions = [...prevOptions, trimmedValue]; // Add custom option to the list
        Swal.fire('Success', 'Option added successfully!', 'success'); // Show SweetAlert success
        return newOptions;
      });
      setError('');
    } else {
      setError('This option already exists.');
      Swal.fire('Error', 'This option already exists.', 'error'); // Show SweetAlert error
    }

    setIsEditing(false); // Switch back to dropdown mode after blur
  };

  // Clears the custom input
  const clearCustomInput = () => {
    setSelectedValue('');
    setIsEditing(false);
    setError('');
  };

  // Handles keyboard actions (Enter to add, Escape to clear)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleBlur();
    } else if (event.key === 'Escape') {
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
            {selectedValue.trim() ? 'Add' : 'Clear'}
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
    </div>
  );
};

export default EditableDropdownCombSweet;
