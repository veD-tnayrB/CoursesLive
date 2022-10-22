import { useCourseContext } from "src/contexts/course/course.context";

export default function Video() {
    const { course } = useCourseContext();
    const firstEpisodeSrc = course.episodes[0].video;

    return (
        <video src={firstEpisodeSrc} />
    )
}