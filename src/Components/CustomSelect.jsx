import React from 'react';

const FrequencySelect = ({ value, onChange }) => {
  return (
    <div style={{ minWidth: 150 }}>
      <select
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '5px 5px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          backgroundColor: '#fff',
        }}
      >
        <option value="" disabled>Select...</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>
    </div>
  );
};

export default FrequencySelect;
