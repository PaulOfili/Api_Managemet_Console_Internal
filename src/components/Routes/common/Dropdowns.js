import React from 'react'
import { Dropdown } from 'semantic-ui-react'


const DropdownExampleSearchSelection = ({ options, placeholder, disabled, onChange, onClick, value, defaultValue, error }) => (
  <Dropdown 
    selectOnBlur={false}
    placeholder={placeholder} 
    fluid 
    search 
    multiple
    closeOnChange
    selection 
    options={options} 
    onChange={onChange}
    onClick={onClick}
    value={value}
    defaultValue={defaultValue}
    disabled={disabled}
    error={error}
  />
)

export default DropdownExampleSearchSelection