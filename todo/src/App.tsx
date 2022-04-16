import React from 'react';
import {ToastContainer} from "react-toastify";
import {TodoProvider} from "./context/TodoContext";
import Header from "./components/Header";
import MainSection from "./components/MainSection";

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => (
  <>
    <TodoProvider>
      <Header />
      <MainSection />
    </TodoProvider>
    <ToastContainer />
  </>
);

export default App;
