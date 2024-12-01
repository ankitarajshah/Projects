import React, { useState } from 'react';

interface Option {
  id: number;
  value: string;
}

const EditableDropdown: React.FC = () => {
  const [options, setOptions] = useState<Option[]>([
    { id: 1, value: 'Option 1' },
    { id: 2, value: 'Option 2' },
  ]);
  const [newOption, setNewOption] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string | undefined>();

  const handleAddOption = () => {
    if (newOption.trim() !== '') {
      setOptions([...options, { id: options.length + 1, value: newOption }]);
      setNewOption('');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div style={{ maxWidth: '300px', margin: '20px auto' }}>
      <select value={selectedValue} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="Add new option"
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={handleAddOption} style={{ padding: '8px 12px' }}>
          Add
        </button>
      </div>
    </div>
  );
};

export default EditableDropdown;
