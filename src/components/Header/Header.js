import React from 'react';

const Header = ({ title }) => (
    <div className="grid">
        <div className="col-2-3-4">
            <h1 className="lead">{ title }</h1>
        </div>
    </div>
);

export default Header;