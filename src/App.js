import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BookMark } from './components/BookMark';
import { Navbar } from './components/elements/Navbar';
import { AddBookmark } from './components/elements/AddBookmark';
import { RemoveBookmark } from './components/elements/RemoveBookmark';
import { Home } from './components/Home';
import { NewsDetails } from './components/NewsDetails';
import axios from 'axios';


function App() {
  const [loading, setLoading] = useState(false);
  const [togglebtn, setTogglebtn] = useState(false);
  const [search, setSearch] = useState('');
  const [optionfilter, setOptionfilter] = useState('');
  const [stories, setStories] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  
  const getAllNews = async () => {
    // console.log("app init...");
    const res = await axios.get(`https://content.guardianapis.com/search?q=${search}&api-key=test`);
    console.log(res.data.response.results);
    setStories(res.data.response.results);
    setLoading(true);
    setTogglebtn(true);
  }

  const onSearchInputChange = (e) => {
    setSearch(e.target.value);
  }

  const onSelectionOptionfilter = (e) => {
    //console.log(e.target.value);
    setOptionfilter(e.target.value);
    const newFilteredOutput = [...stories];
    if(e.target.value === 'Newest First'){
      newFilteredOutput.sort((d1, d2) => new Date(d2.webPublicationDate).getTime() - new Date(d1.webPublicationDate).getTime());
      setStories(newFilteredOutput);
    } else {   
      newFilteredOutput.sort((d1, d2) => new Date(d1.webPublicationDate).getTime() - new Date(d2.webPublicationDate).getTime());
      setStories(newFilteredOutput);
    }
  }

  const onSearchClick = () => {
    document.getElementById("myText").focus();
    getAllNews();
    
  }


  useEffect((optionfilter) => {
    getAllNews(optionfilter);
    
  }, []);

  useEffect(() => {
    const newsBoookmarkList = JSON.parse(localStorage.getItem('news-addbookmark'));
    setBookmarks(newsBoookmarkList);
  }, [])

  const saveToLocalStorage = (items) => {
    localStorage.setItem('news-addbookmark', JSON.stringify(items))
  }  

  const addBookmarkStory = (story) => {
    const newBookmarkList = [...bookmarks, story];
    setTogglebtn(false);
    setBookmarks(newBookmarkList);
    saveToLocalStorage(newBookmarkList);
  }

  const removeBookmarkStory = (story) => {
    const newBookmarkList = bookmarks.filter((bookmark) => bookmark.id !== story.id);
    setTogglebtn(true);
    setBookmarks(newBookmarkList);
    saveToLocalStorage(newBookmarkList);
  }

  return (
    <div>
      <Router>
        <Navbar search={search} onSearchInputChange={onSearchInputChange} onSearchClick={onSearchClick} />
        <Switch>
          <Route path="/" exact component={() => loading? (<Home stories={stories} 
          optionfilter={optionfilter} onSelectionOptionfilter={onSelectionOptionfilter}/>) : 
          (<div className="center"><div className="loader"></div></div>)} />

          <Route path="/details/:webTitle" component={() => loading? (<NewsDetails
          stories={stories}
          togglebtn={togglebtn}
          addbookmarkComponent={AddBookmark} 
          removebookmarkComponent={RemoveBookmark} 
          handleAddbookmarkClick={addBookmarkStory}
          handleRemovebookmarkClick={removeBookmarkStory}/>) :
           (<div className="center"><div className="loader"></div></div>)}/>

          <Route path="/bookmarks" exact component={() => loading? 
          (<BookMark stories={bookmarks} optionfilter={optionfilter} onSelectionOptionfilter={onSelectionOptionfilter}/>):
          (<div className="center"><div className="loader"></div></div>)} /> 
         
         </Switch>

      </Router>
    </div>
  );
}

export default App;
