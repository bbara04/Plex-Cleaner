import { createContext, render } from "preact";
import { useContext, useRef, useState } from "preact/hooks";
import { Media } from ".";


const MediaContext = createContext(null);

export function MediaContextProvider(props) {
    const [, setForceRender] = useState(0);

    return (
        <MediaContext.Provider value={props.medias}>
            {props.children}
        </MediaContext.Provider>
    );
}

export const useMediaContext = () => useContext(MediaContext);