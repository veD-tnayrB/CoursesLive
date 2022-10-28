export default
function Feature({ feature }) {
    const Icon = feature.icon;

    return (
        <li className="feature-item">
            <div>
                <Icon className="icon" />

                <p>
                    {feature.overview}
                </p>
            </div>
        </li>
    )
}