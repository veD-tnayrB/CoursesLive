import * as React from 'react';
import { searchCourses } from "src/services/courses";
import { courseFilters } from './course-filters';
import Searchbar from "src/components/common/searchbar";


export default function SearchCourses({ setCourses }) {
    const [selectedFilter, setSelectedFilter] = React.useState('All');
    const [searchValue, setSearchValue] = React.useState('');


    return (
        <Searchbar
            filters={courseFilters}
            searchService={searchCourses}
            setResults={setCourses}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
        />
    )
}