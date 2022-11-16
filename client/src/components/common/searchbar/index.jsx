import * as React from 'react';
import Filters from './filters';
import SearchInput from './input';
import { SearchbarContext } from './searchbar.context';
import './searchbar.scss';

export default function Searchbar({ filters, search, setSearch, isLoading }) {
	const searchContextValue = {
		search,
		setSearch,
		filters,
		isLoading,
	};
	return (
		<SearchbarContext.Provider value={searchContextValue}>
			<section className="search-section">
				<Filters filters={filters} />
				<SearchInput />
			</section>
		</SearchbarContext.Provider>
	);
}
