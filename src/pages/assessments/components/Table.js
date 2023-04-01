import React from "react";
import "./Table.css";

const Table = ({ dataName, dataArr, dataScore, hasOnlyTextQs = false }) => {
    return (
        <div className="data-table">
            <h3>{`${dataName} Questionnaire`}</h3>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Remark</th>
                    </tr>
                </thead>
                <tbody>
                    {dataArr.map((obj, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{obj.question}</td>
                            <td>
                                {hasOnlyTextQs && i < 5 ? "N/A" : obj.answer}
                            </td>
                            <td>{obj.text}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h4>Score: {dataScore}</h4>
        </div>
    );
};

export default Table;
