import * as React from 'react';
import { usersFilters } from './users-filters';
import { useUsersContext } from 'src/contexts/users/users.context';
import Searchbar from "src/components/common/searchbar";


export default function SearchUsers() {
    const { search, setSearch, isLoading } = useUsersContext()

    return (
        <Searchbar
            setSearch={setSearch}
            search={search}
            filters={usersFilters}
            isLoading={isLoading}
        />
    )
}