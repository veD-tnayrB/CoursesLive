import SearchIcon from '@mui/icons-material/Search';
import { useSearchContext } from "../searchbar.context"
import LoadingIcon from "src/components/common/load";

export default function SearchInput() {
    const { search, setSearch, isLoading } = useSearchContext();

    function onChange(event) {
        const { value } = event.target;
        setSearch({...search, value})
    }

    const icon = isLoading ? <LoadingIcon /> : <SearchIcon className="search-icon" />;

    return (
        <div className="search-input-container">
            <form>
                <input
                    type="text"
                    className="search-input"
                    value={search.value}
                    onChange={onChange}
                    placeholder="Search..."
                />

                {icon}
            </form>
        </div>
    )
}