import { featureList } from './feature-list';
import Feature from './Feature';
import './features.scss';

export default
function FeatureList() {

    const featureElements = featureList.map(feature => (
        <Feature
            key={feature.icon} 
            feature={feature} 
        />
    ))

    return (
        <section className="feature-section">
            <h2>What features do we have to offer?</h2>

            <ul className="feature-list">
                {featureElements}
            </ul>
        </section>

    )
}