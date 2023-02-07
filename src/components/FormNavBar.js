import React from "react";
import { useNavigate } from "react-router-dom";

import "./FormNavBar.css";

const FormNavButton = ({ onClick }) => {
    return (
        <div className="form-nav-button-container" onClick={onClick}>
            <div className="arrow-container">
                <div className="arrow-top" />
                <div className="arrow-center" />
                <div className="arrow-bottom" />
            </div>
        </div>
    );
};

const FormNavBar = ({ pageNum, setPageNum, numPages, onSubmit }) => {
    const isFirstPage = pageNum === 0;
    const isLastPage = pageNum === numPages - 1;

    const navigate = useNavigate();

    const decrementPageNum = () => {
        setPageNum((prev) => prev - 1);
    };

    const incrementPageNum = () => {
        setPageNum((prev) => prev + 1);
    };

    return (
        <div className="form-nav-bar-container">
            <div className="form-nav-bar">
                {!isFirstPage && (
                    <div className="form-nav-bar-previous-button">
                        <FormNavButton onClick={decrementPageNum} />
                    </div>
                )}
                {isLastPage ? (
                    <button
                        className="form-nav-bar-submit-button"
                        onClick={onSubmit}
                    >
                        Looks good!
                    </button>
                ) : (
                    <>
                        <button
                            onClick={() => navigate(-1)}
                            className="form-nav-bar-cancel-link"
                        >
                            cancel
                        </button>
                        <div className="form-nav-bar-next-button">
                            <FormNavButton onClick={incrementPageNum} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FormNavBar;
