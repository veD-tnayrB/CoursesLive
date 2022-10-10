import * as React from 'react';
import { usersFilters } from './users-filters';
import { searchUsers } from 'src/services/user';
import Searchbar from "src/components/common/searchbar";


export default function SearchUsers({ setSearchResults }) {
    const [selectedFilter, setSelectedFilter] = React.useState('All');
    const [searchValue, setSearchValue] = React.useState('');

    return (
        <Searchbar
            filters={usersFilters}
            searchService={searchUsers}
            setResults={setSearchResults}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
        />
    )
}