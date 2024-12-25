import { hydrate, prerender as ssr } from 'preact-iso';
import { MainPage } from './MainPage';
import { NavBar } from './NavBar';

import './styles/tailwind.css';
import { useState } from 'preact/hooks';
import { SettingsPanel } from './SettingsPanel';

/**
 * Az App komponens az alkalmazás fő komponense, amely a navigációs sávot és a tartalmat jeleníti meg.
 * A felhasználó választhat a különböző nézetek között, és beállíthatja a beállításokat.
 * 
 * A komponens tartalmaz egy navigációs sávot (NavBar), amely lehetővé teszi a nézetek közötti váltást,
 * és egy beállítás panelt (SettingsPanel), amely kezelhető a felhasználó által.
 * A komponens két állapotot használ: az egyik a beállítások paneljének nyitott/zárt állapotát,
 * a másik pedig az aktuálisan kiválasztott nézetet.
 * 
 * @returns {JSX.Element} A fő alkalmazás komponenst, amely tartalmazza a navigációt, beállításokat és a fő tartalmat.
 */
export function App() {
    const [settingsOpen, setSettingsOpen] = useState(false); // A beállítások paneljének nyitott/zárt állapota
    const [selectedView, setSelectedView] = useState("all"); // Az aktuálisan kiválasztott nézet

    return (
        <div class="bg-slate-400">
            {/* A navigációs sáv */}
            <div class="fixed left-0 top-0 w-full z-10">
                <NavBar 
                    selectedView={selectedView} // Az aktuálisan kiválasztott nézet
                    openSettings={(value) => { setSettingsOpen(value) }}  // A beállítások paneljének állapota
                    selectMediaView={mediaView => setSelectedView(mediaView)} // A nézet kiválasztása
                />
            </div>
            {/* A beállítások panel vagy a fő oldal megjelenítése, attól függően, hogy nyitva van-e a beállítások panel */}
            {settingsOpen ? <SettingsPanel onClose={() => setSettingsOpen(false)} /> : <MainPage mediaPath={selectedView} />}
        </div>
    );
}

// Az alkalmazás renderelése a DOM-ra, ha a böngésző környezetben vagyunk
if (typeof window !== 'undefined') {
    hydrate(<App />, document.getElementById('app'));
}

/**
 * Az alkalmazás előrenderelésére szolgáló függvény.
 * 
 * @param {Object} data A prerender adatok, amelyeket az alkalmazás számára átadunk.
 * @returns {JSX.Element} Az előrenderelt alkalmazás komponenst.
 */
export async function prerender(data) {
    return await ssr(<App {...data} />);
}

/**
 * A Media típus a médiák adatait reprezentálja.
 * 
 * @typedef {Object} Media
 * @property {string} title - A média címe.
 * @property {string} last_watched - Az utolsó megtekintés ideje.
 * @property {number} id - Az egyedi azonosítója.
 * @property {string} type - A média típusa (pl. film, sorozat, zene, stb.).
 * @property {boolean} [checked] - Opcionális tulajdonság, amely megmondja, hogy a média ki van-e választva.
 */
export type Media = {
    title: string;      // A média címe
    last_watched: string;  // Az utolsó megtekintés ideje
    id: number;         // Egyedi azonosító
    type: string;       // A média típusa (pl. film, sorozat)
    checked?: boolean; // Opcionális: jelzi, hogy ki van-e választva
};
