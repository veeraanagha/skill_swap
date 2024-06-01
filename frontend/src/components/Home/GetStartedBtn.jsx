import React from 'react';
import { Link } from 'react-router-dom';
import './GetStartedBtn.css';

function GetStartedBtn() {
    return (
        <div className="flex justify-center items-center scale-50">
            <Link to="/user/register">
                <button className="getStarted">Get started!</button>
            </Link>
        </div>
    );
}

export default GetStartedBtn;
