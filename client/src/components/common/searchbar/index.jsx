import * as React from 'react';
import Filters from './filters';
import SearchInput from './input';
import { SearchbarContext } from "./searchbar.context";
import './searchbar.scss';

export default function Searchbar({ filters, searchService, setResults, searchValue, setSearchValue, selectedFilter, setSelectedFilter }) {
    
    React.useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        searchService(signal, searchValue, selectedFilter)
        .then(results => setResults(results));

        return () => controller.abort();
    }, [searchValue, selectedFilter]);

    const searchContextValue = { 
        searchValue, 
        setSearchValue, 
        selectedFilter, 
        setSelectedFilter,
        searchService,
        filters
    };
    return (
        <SearchbarContext.Provider value={searchContextValue}>
            <section className="search-section">
                <Filters />
                <SearchInput />
            </section>
        </SearchbarContext.Provider>
    )
}