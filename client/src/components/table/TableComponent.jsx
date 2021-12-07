import React from 'react';
import './Table.css';

function Table ({data, actions, buttons, error, ...props}) {

    const columns = data[0] && Object.keys(data[0]);
    
    
    return (
        <table className="table" cellPadding={0} cellSpacing={0}>
            {props.children}
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
                    <td> { props.page}</td>
                </tr>
            </tfoot>
        </table>
    ); 
}

export default React.memo(Table);