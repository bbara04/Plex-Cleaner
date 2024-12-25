import { useState } from "preact/hooks"
import { FaRegEdit } from "react-icons/fa";
import { CloseableActionPanel } from "./CloseablePanel";

/**
 * ActionSelector komponens, amely egy interaktív gombot jelenít meg.
 * A gombra kattintva egy felugró panel jelenik meg, amely bezárható.
 *
 * @returns {JSX.Element} A komponens JSX eleme, amely a gombot vagy a panelt tartalmazza
 */
export function ActionSelector() {
    // Állapot kezelés a panel nyitásához és bezárásához
    const [open, setOpen] = useState(false);

    // A zárt állapotú panel (gomb) komponens
    const closedPanel = (
        <div
            class="bg-slate-800 p-3.5 rounded-full flex items-center justify-center"
            onClick={() => setOpen(!open)} // Kattintáskor megváltoztatja a panel állapotát
        >
            <FaRegEdit size="40px" /> {/* Ikon a gombhoz */}
        </div>
    );

    return (
        <>
            {open ? (
                // Ha a panel nyitva van, akkor a CloseableActionPanel jelenik meg
                <CloseableActionPanel onClose={() => setOpen(false)} />
            ) : (
                closedPanel // Ha a panel zárva van, a gombot jelenítjük meg
            )}
        </>
    );
}
