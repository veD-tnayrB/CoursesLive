import { featureList } from './feature-list';
import Feature from './Feature';
import './features.scss';

export default
function FeatureList() {

    const featureElements = featureList.map(feature => (
        <Feature
            key={feature.overview} 
            feature={feature} />
    ))

    return (
        <ul className="feature-list">
            {featureElements}
        </ul>
    )
}