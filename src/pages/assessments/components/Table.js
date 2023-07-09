import React, { useState } from "react";
import "./Table.css";

const Table = ({ dataName, dataArr, dataScore, hasOnlyTextQs = false }) => {
    const [showText, setShowText] = useState(true);
    const [expandedItemIndex, setExpandedItemIndex] = useState(-1);

    const handleExpand = (index) => {
        //setShowText(!showText);
        if (index == expandedItemIndex && showText)
            setShowText(false)
        else
            setShowText(true);

        setExpandedItemIndex(index);
    };

    return (
        <div className="data-table">
            <div className="table-header">
                <h3>{dataName}</h3>
                <p className="section-score">Score: </p>
                <p className="section-score-num">{dataScore}</p>
            </div>
            <table className="question-list">
                <tbody>
                    {dataArr.map((obj, i) => (
                        <tr className="question-note-container" key={i}>
                            {/* TODO: Fixed the error that td can't be child of div */}
                            <div className="question-row">
                                <td className="question-index">{`Question ${i + 1
                                    }`}</td>
                                <td className="question-content">
                                    {obj.question}
                                </td>
                                <td
                                    className={`score${hasOnlyTextQs &&
                                        !obj.hasOwnProperty("answer")
                                        ? "inactive"
                                        : ""
                                        }`} // to hide the gray box
                                >
                                    {hasOnlyTextQs &&
                                        !obj.hasOwnProperty("answer")
                                        ? "  "
                                        : obj.answer}
                                </td>
                                <td className="question-elaboration">
                                    <button
                                        className="expand-btn"
                                        onClick={() => handleExpand(i)}
                                    >Expand</button>
                                </td>
                            </div>
                            {/* TODO: fix the error that div can't be a child of tr */}
                            {showText && i === expandedItemIndex && (
                                <div className="notes-row">
                                    <p className="notes-label">Notes: </p>
                                    <p className="notes-content">{obj.text}</p>
                                </div>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
