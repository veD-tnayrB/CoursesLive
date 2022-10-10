import * as React from 'react';
import Filters from './filters';
import SearchInput from './input';
import { SearchbarContext } from "./searchbar.context";
import './searchbar.scss';

export default function Searchbar({ filters, searchService, setResults, searchValue, setSearchValue, selectedFilter, setSelectedFilter }) {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        setIsLoading(true);

        searchService(signal, searchValue, selectedFilter)
        .then(results => {
            setResults(results);
            setIsLoading(false);
        });

        return () => controller.abort();
    }, [searchValue, selectedFilter]);

    const searchContextValue = { 
        searchValue, 
        setSearchValue, 
        selectedFilter, 
        setSelectedFilter,
        searchService,
        filters,
        isLoading
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