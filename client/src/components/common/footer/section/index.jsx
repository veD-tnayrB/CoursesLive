import Item from "./Item"

export default function FooterSection({ section }) {
    const sectionItems = section.items.map(item => (
        <Item key={item.name} item={item} />
    ))

    return (
        <div className="footer-section">
            <h4>{section.title}</h4>
            <ul>
                {sectionItems}
            </ul>
        </div>
    )
}