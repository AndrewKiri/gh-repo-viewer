import { PageInfo, SearchResultItem } from "./generated/graphql";

export interface SearchData {
  search: {
    nodes: SearchResultItem[];
    pageInfo: PageInfo;
    repositoryCount: number;
  };
}
