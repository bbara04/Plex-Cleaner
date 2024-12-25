import { createContext, render } from "preact";
import { useContext, useRef, useState } from "preact/hooks";
import { Media } from ".";

const MediaContext = createContext(null);

/**
 * A `MediaContextProvider` komponens biztosítja a `MediaContext` értékét az alárendelt komponensek számára.
 * 
 * @param {Object} props - A komponens props objektuma.
 * @param {Media[]} props.medias - A média adatokat tartalmazó tömb, amelyet a context értékeként biztosítunk.
 * @param {JSX.Element} props.children - A gyerek komponensek, amelyek hozzáférhetnek a context értékéhez.
 * 
 * @returns {JSX.Element} A MediaContext-ot biztosító Provider, amely körülöleli a gyerek komponenseket.
 */
export function MediaContextProvider(props) {

    return (
        <MediaContext.Provider value={props.medias}>
            {props.children}
        </MediaContext.Provider>
    );
}

/**
 * Custom hook, amely lehetővé teszi a `MediaContext` elérését.
 * 
 * A hook segítségével a komponensek hozzáférhetnek a `MediaContext`-ben tárolt médiákhoz.
 * Ha nincs aktív `MediaContext`, akkor `null` értéket ad vissza.
 * 
 * @returns {Media[] | null} A `MediaContext`-ből lekért média adatokat, vagy `null`-t, ha nincs elérhető context.
 */
export const useMediaContext = () => useContext(MediaContext);
