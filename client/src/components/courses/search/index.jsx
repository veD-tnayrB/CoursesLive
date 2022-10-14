import * as React from 'react';
import { useCoursesContext } from 'src/contexts/course/course.context';
import { courseFilters } from './course-filters';
import Searchbar from "src/components/common/searchbar";


export default function SearchCourses() {
    const { search, setSearch, isLoading } = useCoursesContext();
    
    return (
        <Searchbar
            setSearch={setSearch}
            search={search}
            filters={courseFilters}
            isLoading={isLoading}
        />
    )
}