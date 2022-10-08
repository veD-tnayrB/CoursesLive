import * as React from 'react';
import { usersFilters } from './users-filters';
import Searchbar from "src/components/common/searchbar";


export default function SearchUsers({ setUsers }) {
    const [selectedFilter, setSelectedFilter] = React.useState('All');
    const [searchValue, setSearchValue] = React.useState('');

    return (
        <Searchbar
            filters={usersFilters}
            searchService={searchUsers}
            setResults={setUsers}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
        />
    )
}