import React from 'react';
import TodoList from '../components/TodoList';
import Footer from "./Footer";
import CompleteAll from "./CompleteAll";

const MainSection = () => {
  
  return (
    <section className="main">
      <CompleteAll />
      <TodoList />
      <Footer />
    </section>
  );
};

export default MainSection;

export {};