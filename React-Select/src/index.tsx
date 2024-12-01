import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import EditableDropdown from './components/editable';
import EditableDropdownComb from "./components/editable_comb"
import EditableDropdownCombSweet from './components/editable_comb_sweet';
import EditableDropdownCombSelect from './components/editable_select';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <EditableDropdown/> */}
    {/* <EditableDropdownComb options={['Option 1', 'Option 2', 'Option 3']} 
      initialValue="Option 1" /> */}
       {/* <EditableDropdownCombSweet options={['Option 1', 'Option 2', 'Option 3']} 
      initialValue="Option 1" /> */}
      <EditableDropdownCombSelect/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
