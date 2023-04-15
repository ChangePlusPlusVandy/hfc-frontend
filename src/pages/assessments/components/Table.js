import React from "react";
import "./Table.css";

const Table = ({ dataName, dataArr, dataScore, hasOnlyTextQs = false }) => {
    return (
        <div className="data-table">
            <div className="table-header">
                <h3>{dataName}</h3>
                <p className="section-score">Score: </p>
                <p className="section-score-num">{dataScore}</p>
            </div>
            <table>
                <tbody className="question-list">
                    {dataArr.map((obj, i) => (
                        <tr className="question-row" key={i}>
                            <td className="question-index">{`Question ${
                                i + 1
                            }`}</td>
                            <td className="question-content">{obj.question}</td>
                            <td className="score">
                                {hasOnlyTextQs && !obj.hasOwnProperty("answer")
                                    ? "  "
                                    : obj.answer}
                            </td>
                            <td className="question-elaboration">{obj.text}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
