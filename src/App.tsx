import React, { useState } from "react";
import { Spin, Input } from "antd";
import Table from "./components/Table";
import "antd/dist/reset.css";
import "./App.css";
import { useSearchQuery } from "./generated/graphql";
import { SearchData } from "./types";

const { Search } = Input;

function App(): JSX.Element {
  const [search, setSearch] = useState("");
  const { data, loading } = useSearchQuery({
    variables: {
      search,
    },
  });

  console.log(data);

  return (
    <div className="container">
      <div />
      <div className="content">
        <div className="col">
          <Search
            className="search"
            placeholder="Search by keyword"
            onSearch={setSearch}
          />

          {loading ? (
            <Spin size="large" />
          ) : (
            <>{data != null ? <Table data={data as SearchData} /> : null}</>
          )}
        </div>
      </div>
      <div />
    </div>
  );
}

export default App;
