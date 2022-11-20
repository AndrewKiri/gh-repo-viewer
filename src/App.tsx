import React from "react";
import Table from './components/Table';
import 'antd/dist/reset.css';
import "./App.css";

function App(): JSX.Element {
  return (
    <div className="container">
      <div />
      <div className="content">
        <Table />
      </div>
      <div />
    </div>
  );
}

export default App;
