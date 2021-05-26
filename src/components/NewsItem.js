import React from 'react';
import {Link} from 'react-router-dom';


export const NewsItem = (props) => {

    const { webTitle } = props.story;

    return (
        <div className="card">
            <Link to={{pathname: `/details/${webTitle}`}}>
                <div>{webTitle}</div>
            </Link>
        </div>
    )
}
