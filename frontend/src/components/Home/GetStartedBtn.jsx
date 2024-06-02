import React from 'react';
import { Link } from 'react-router-dom';
import './GetStartedBtn.css';
import { useAlert } from '../utils/AlertProvider';

function GetStartedBtn() {
    const { alert, setAlert } = useAlert()

    function handleOnClick() {
        setAlert({
            message: "Please make sure you enable cookies for this app to function properly ↖️",
            type: "success"
        })
    }

    return (
        <div className="flex justify-center items-center scale-50">
            <Link to="/user/register">
                <button className="getStarted" onClick={handleOnClick}>Get started!</button>
            </Link>
        </div>
    );
}

export default GetStartedBtn;
