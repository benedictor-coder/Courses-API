import React, {useState} from 'react';
import './Table.css';
import MainPage  from '../main-page/MainPage';

function Table ({data, actions, buttons, error}) {
    const [state, setState] = useState();
    const { handleDelete } = MainPage;
    const columns = data[0] && Object.keys(data[0]);
    
    
    return (
        <table className="table" cellPadding={0} cellSpacing={0}>
            <caption> List of departments</caption>
            <thead>
                <tr>
                    {data[0] && columns.map((heading, index) => <th key={index}>{heading}</th>)}
                    {data[0] ? actions : null}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index)=>
                    <tr key={index}>
                        {
                            columns.map((column, index) =>  <td key={index}>{row[column]}</td>)
                        }
                        <td>
                            {buttons}
                        </td>
                    </tr>)}
            </tbody>
            <tfoot>
                <tr>
                    <td>Page 1 </td>
                </tr>
            </tfoot>
        </table>
    ); 
}

export default React.memo(Table);