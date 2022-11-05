import { IMAGES_ROUTES } from 'src/services/config';

export default function CreatorContent({ creator }) {

    return (
        <>
            <img src={`${IMAGES_ROUTES}${creator.profileImage}`} />
            <h3>{creator.name} {creator.lastName}</h3>
        </>
    )
}