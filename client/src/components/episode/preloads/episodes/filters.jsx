export default function FiltersPreload() {
	return (
		<ul className="filters">
			<li className="filter selected">
				<button>All</button>
			</li>
			<li className="filter">
				<button>Last</button>
			</li>
			<li className="filter">
				<button>Viewed</button>
			</li>
		</ul>
	);
}
