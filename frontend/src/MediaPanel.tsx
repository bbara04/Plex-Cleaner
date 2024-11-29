import { Media } from ".";
import { ListElement } from "./ListElement";

function getLastWatched(lastWathced: string): string {
    console.log(lastWathced);
    if (lastWathced == "0") {
        return "Today";
    }
    if (lastWathced == "1") {
        return `${lastWathced} day ago`;
    }
    return `${lastWathced} days ago`;
};

export function MediaPanel({ medias }: MediaPanelProps) {
    return (
        <div>
            {medias.map(media => (
                <ListElement
                    key={media.id}
                    title={media.title}
                    additionalInfo={getLastWatched(media.last_watched)}
                />
            ))}
        </div>
    );
}

export type MediaPanelProps = {
    medias: Media[];
};
