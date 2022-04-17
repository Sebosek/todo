import React from 'react';
import TodoList from 'components/TodoList';
import Footer from "components/Footer";
import CompleteAll from "components/CompleteAll";

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