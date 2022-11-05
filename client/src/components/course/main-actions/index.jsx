import EpisodeCreator from "./creator";
import Like from "./like";
import More from "./more";
import './main-actions.scss'

export default function MainActions() {


    return (
        <section className="main-actions">
            <EpisodeCreator />
            <div className="right">
                <Like />
                <More />
            </div>
        </section>
    )
}