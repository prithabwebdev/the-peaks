import React from 'react';
import dateformat from 'dateformat';
import bookmarkIcon from './images/bookmark.svg';
import {Link, useParams } from 'react-router-dom';


export const NewsDetails = (props) => {

    const { webTitle } = useParams();

    const AddbookmarkComponent = props.addbookmarkComponent;
    const RemovebookmarkComponent = props.removebookmarkComponent;

    return (
        <div>
                {
                    props.stories.filter((story) => story.webTitle === webTitle).map((story, index) => (
                        <div key={story.webTitle}>
                            <div className="flex-container">
                                <div className="subheading" >
                                    <div className="flex-item-left">
                                        { props.togglebtn? 
                                        (<div><button onClick={() => 
                                            props.handleAddbookmarkClick(story)}><AddbookmarkComponent />
                                            </button>
                                        </div>) : 
                                        (<div><button onClick={() => 
                                            props.handleRemovebookmarkClick(story)}><RemovebookmarkComponent />
                                            </button>
                                        </div>
                                        )}
                                    </div>
                                    <div className="flex-item-right">
                                        <div>
                                            <Link to="/bookmarks">
                                                <button className="bookmarkbtn">
                                                    <span className="bookmarkIcon">
                                                        <img src={bookmarkIcon} alt="bookmarkicon" />
                                                    </span>
                                                    VIEW BOOKMARKS
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-item-left">
                                <div className="newsdetails-card" >
                                    <div>{dateformat(story.webPublicationDate, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</div>
                                    <div><h1>{story.sectionName}</h1></div>
                                    <div><p>{story.webTitle}</p></div>
                                </div>
                            </div>
                            <div className="flex-item-right">
                                {/* As I am using developer key i don't have access to image and other few data */}
                                {/* <img src={} alt={}/> */}
                            </div>
                        </div>
                    ))
                }
            
        </div>
    )
}
