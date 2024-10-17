import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import Services from "../Services/Services";
import Header from "../common/header/Header";
import Feedback from "../feedback/feedback";
import EditPost from "../editPost/editPost";
import MyPosts from "../myPosts/myPosts";
import ValidPost from "../validPost/validPost";

const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Services" component={Services} />
          <Route exact path="/Feedback" component={Feedback} />
          <Route exact path="/editPost" component={EditPost} />
          <Route exact path="/myPosts" component={MyPosts} />
          <Route exact path="/validPost" component={ValidPost} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default Pages;
