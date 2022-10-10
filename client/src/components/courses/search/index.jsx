import * as React from 'react';
import { searchCourses } from "src/services/courses";
import { courseFilters } from './course-filters';
import Searchbar from "src/components/common/searchbar";


export default function SearchCourses({ setSearchResults }) {
    const [selectedFilter, setSelectedFilter] = React.useState('');
    const [searchValue, setSearchValue] = React.useState('');

    return (
        <Searchbar
            searchService={searchCourses}
            filters={courseFilters}
            setResults={setSearchResults}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
        />
    )
}