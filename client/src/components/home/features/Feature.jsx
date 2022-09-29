const BASE_URL = '/src/assets/icons';

export default
function Feature({ feature }) {
    const iconPath = `${BASE_URL}/${feature.icon}.svg`;

    return (
        <li className="feature-item">
            <div>
                <img src={iconPath} />

                <p>
                    {feature.overview}
                </p>
            </div>
        </li>
    )
}