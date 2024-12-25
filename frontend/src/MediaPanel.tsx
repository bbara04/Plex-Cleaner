import { useState } from "preact/hooks";
import { ListElement } from "./ListElement";
import { useMediaContext } from "./MediaContext";

/**
 * A `getLastWatched` függvény formázza a média utolsó megtekintésének idejét.
 * 
 * @param {string} lastWathced - Az utolsó megtekintés időpontja, egy string, amely napok számát tartalmazza.
 * @returns {string} A formázott idő, amely jelzi, hogy mikor nézték meg utoljára a médiát.
 */
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

/**
 * A `MediaPanel` komponens megjeleníti a médiák listáját.
 * 
 * A komponens lekéri a médiák adatait a `useMediaContext` hook segítségével, majd rendezi és 
 * listázza őket egyenként a `ListElement` komponenssel.
 * 
 * @returns {JSX.Element} A médiák listáját tartalmazó JSX elem.
 */
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

/**
 * A `forceReRenderMedia` függvény újrarendereli a `MediaPanel`-t.
 * 
 * Az `forceRenderRef` referencia segítségével egy új renderelést kényszerítünk a `MediaPanel` komponensre.
 */
export function forceReRenderMedia() {
    forceRenderRef?.();
}
