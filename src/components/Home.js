import React from 'react';
import { Link } from 'react-router-dom';
import { NewsItem } from './NewsItem';
import bookmarkIcon from './images/bookmark.svg';

export const Home = (props) => {
    const { onSelectionOptionfilter, optionfilter } = props;

    const renderNews = props.stories.map((story) => {
        return (
            <NewsItem story={story} key={story.webTitle}/>
        );
    })


    return (
        <div className="flex-container">
            <div className="subheading">
                <div className="flex-item-left">
                    <h1>Top Stories</h1>
                </div>
                <div className="flex-item-right">
                    <Link to="/bookmarks">
                        <button className="bookmarkbtn">
                        <span className="bookmarkIcon"><img src={bookmarkIcon} alt="bookmarkicon" /></span>
                        VIEW BOOKMARKS
                        </button>
                    </Link>
                    <select className="datewiseSelection" onChange={onSelectionOptionfilter} value={optionfilter}>
                        <option value="Newest First">Newest First</option>
                        <option value="Oldest First">Oldest First</option>
                    </select>
                </div>
            </div>
            <div>{renderNews}</div>
            <div>
                <h1>Film</h1>
                {
                    props.stories.filter((story) => story.sectionId === "film" ).length === 0 ? 
                    (<div>No result found</div>) : 
                    (<div>{
                        props.stories.filter((story) => story.sectionId === "film" ).map((story, index) => (
                            <div key={story.webTitle} className="positioning">
                                <NewsItem story={story}  key={story.webTitle}/>
                           </div>
                    ))}</div>) 
                }
                
           </div>
        </div>
    )
}
