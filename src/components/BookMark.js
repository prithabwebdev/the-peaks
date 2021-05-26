import React from 'react';
import { NewsItem } from './NewsItem';

export const BookMark = (props) => {
    //const { onSelectionOptionfilter, optionfilter } = props;

    const renderNews = props.stories.map((story) => {
        return (
            <NewsItem story={story} key={story.webTitle}/>
        );
    })
    console.log(props);

    return (
        <div className="flex-container">
            <div className="subheading">
                <div className="flex-item-left">
                    <h1>All Bookmarks</h1>
                </div>
                <div className="flex-item-right">
                    {/* <select className="datewiseSelection" onChange={onSelectionOptionfilter} value={optionfilter}>
                        <option value="Newest First">Newest First</option>
                        <option value="Oldest First">Oldest First</option>
                    </select> */}
                </div>
            </div>
            <div>{renderNews}</div>
        </div>
    )
}
