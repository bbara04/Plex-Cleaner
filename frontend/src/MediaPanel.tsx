import { useState } from "preact/hooks";
import { ListElement } from "./ListElement";
import { useMediaContext } from "./MediaContext";

function getLastWatched(lastWathced: string): string {
    if (lastWathced == "0") {
        return "Today";
    }
    if (lastWathced == "1") {
        return `${lastWathced} day ago`;
    }
    return `${lastWathced} days ago`;
};

let forceRenderRef: () => void;

export function MediaPanel() {
    const [_, setForceRender] = useState(0);
    forceRenderRef = () => setForceRender(n => n + 1);

    const medias = useMediaContext();

    return (
        <div>
            {medias.current
            .sort((a, b) => a.title.localeCompare(b.title))
            .map(media => (
                <ListElement
                key={media.id}
                title={media.title}
                additionalInfo={getLastWatched(media.last_watched)}
                checked={media.checked}
                onClick={() => {
                    media.checked = !media.checked
                    forceReRenderMedia();
                }}
                />
            ))}
        </div>
    );
}

export function forceReRenderMedia() {
    forceRenderRef?.();
}
