import React from 'react';
import './Report.css'
function Report(props) {
    return (
        <div>
            <h1 className="heading-tertiary">Reports</h1>
            <fieldset className="report-fieldset">
                <legend style={{ textAlign: "center" }}>Report for the year, 2021</legend>
                <div className="report-section">
                    <div className="report-header">
                        <h1 className="heading-tertiary"> Water management report</h1>
                        <span>
                            <h2>Nzoia Water Company</h2>
                        </span>
                    </div>
                    <div className="report-body">
                        <table cellSpacing="0" cellPadding="0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Description</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Bore holes</td>
                                    <td>200</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Wells dug</td>
                                    <td>100</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Water Sources</td>
                                    <td>800</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Projects</td>
                                    <td>20</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Treatment plants</td>
                                    <td>1</td>
                                </tr>
                            </tbody>
                        </table>
                        <ul className="report-aunthorized-by">
                            <li>Signed by:</li>
                            <li>Name: .......................</li>
                            <li>Signature: .......................</li>
                        </ul>
                    </div>
                    <div className="report_buttons">
                        <input type="button" className="btn btn-edit btn__btn--download" value="Dowload" />
                        <input type="button" className="btn btn-view btn__btn--print" value="Print" />
                    </div>
                </div>
                
            </fieldset>
        </div>
    );
}

export default Report;