import React, { useCallback, useState, useEffect } from "react";
import chunk from "lodash/chunk";
import { Spin, Input } from "antd";
import Table from "./components/Table";
import "antd/dist/reset.css";
import "./App.css";
import Paginator from "./components/Paginator";
import { SearchResultItem, useSearchLazyQuery } from "./generated/graphql";
import { usePagination } from "./hooks/usePagination";

const { Search } = Input;

const DEFAULT_FETCH_SIZE = 100;

function App(): JSX.Element {
  const { page, perPage, setPagination } = usePagination();
  const [search, setSearch] = useState("");
  const [fetchedRepositories, setFetchedRepositories] = useState<
    SearchResultItem[]
  >([]);
  const repositories = chunk(fetchedRepositories, perPage);

  const [fetchRepositories, { data, loading }] = useSearchLazyQuery();

  const onPaginationChange = useCallback((page: number, pageSize: number) => {
    setPagination({
      page,
      perPage: pageSize,
    });
  }, []);

  useEffect(() => {
    setPagination({ page: 1, perPage });
  }, [perPage]);

  useEffect(() => {
    if (page > repositories.length) {
      fetchRepositories({
        variables: {
          query: search,
          first: DEFAULT_FETCH_SIZE,
          after: data?.search?.pageInfo?.endCursor,
        },
      })
        .then(({ data }) => {
          if (data?.search?.nodes != null) {
            const newReps = data?.search?.nodes as SearchResultItem[];
            const reps = [...fetchedRepositories, ...newReps];

            setFetchedRepositories(reps);
          }
        })
        .catch(() => {});
    }
  }, [page]);

  useEffect(() => {
    fetchRepositories({
      variables: {
        query: search,
        first: DEFAULT_FETCH_SIZE,
      },
    })
      .then(({ data }) => {
        if (data?.search?.nodes != null) {
          setFetchedRepositories(data?.search?.nodes as SearchResultItem[]);
        }
      })
      .catch(() => {});
  }, [search]);

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
          <div className="table-container">
            {loading && (
              <div className="loader-overlay">
                <div className="loader">
                  <Spin style={{ marginTop: "24px" }} size="large" />
                </div>
              </div>
            )}
            <Paginator
              current={page}
              total={data?.search?.repositoryCount}
              showTotal={(total) => `Total ${total} items`}
              defaultPageSize={perPage}
              defaultCurrent={page}
              onChange={onPaginationChange}
            >
              <Table data={repositories[page - 1]} />
            </Paginator>
          </div>
        </div>
      </div>
      <div />
    </div>
  );
}

export default App;
