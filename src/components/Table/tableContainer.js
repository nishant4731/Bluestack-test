import React from "react";
import "./Table.css";

function TableContainer(props) {
    const { tabledata } = props;
    console.log(tabledata, "tableData");

    const getTableHeadJsx = () => {
        const rowValues =tabledata.tableHead && tabledata.tableHead.map((val) => {
            return(
                <th style={{"width": val.width ? val.width : ""}}>{val.tableHead}</th>
            )
        })
        return rowValues;
    }

    const getTableBodyJsx = () => {
        const rowval = tabledata.tableRow.map((val) => {
            return(<tr>
                {val.rowData.map((value) => {
                    return(<td>
                        {value.rowValue}
                    </td>)
                })}
            </tr>)
        }) 
          return rowval;

    }
    return(
        <div>
            {
                tabledata && tabledata.tableRow && tabledata.tableRow.length ? <table>
                <thead>
                    <tr>{getTableHeadJsx()}</tr>
                </thead>
                <tbody>
                    {getTableBodyJsx()}
                </tbody>
            </table> : 
            <div>No  data found</div>
            }
            
        </div>
    )
}

export default TableContainer;