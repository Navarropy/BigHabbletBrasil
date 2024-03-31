import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostCreate from './components/PostCreate';
import PostView from './components/PostView';
import AddContestant from './components/AddContestant';
import Home from "./Home"
// import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation and other components like header or footer can go here */}
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/posts/new" element={<PostCreate />} />
          <Route path="/posts/:id" element={<PostView />} />
          <Route path="/add" element={<AddContestant />} />
          {/* The NotFound component needs to be handled differently in v6 */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
