import { Scrollbar } from 'react-scrollbars-custom';
import { useMediaContext } from './MediaContext';

/**
 * A ConfirmDeleteDialog komponens egy megerősítő párbeszédpanel, amely az elem törlését kéri megerősítés céljából.
 * A panel listázza azokat a médiákat, amelyek ki vannak választva, és lehetőséget ad a felhasználónak a törlés megerősítésére vagy a művelet törlésére.
 *
 * @param {ConfirmDeleteDialogProps} props A komponens paraméterei.
 * @returns {JSX.Element} A komponens JSX eleme, amely a törlés megerősítő párbeszédpanelt tartalmazza.
 */
export function ConfirmDeleteDialog({ onConfirm, onHide }: ConfirmDeleteDialogProps) {

    // Az aktuális médiák lekérése a MediaContext-ből
    const medias = useMediaContext()

    return (
        <div class="fixed p-8 rounded-lg bg-slate-600 opacity-95 space-y-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div class="space-y-6">
                {/* Üzenet a törlés megerősítéséhez */}
                <span class="text-3xl font-extrabold opacity-100 text-slate-800">
                    Do you want to delete these?
                </span>
                <Scrollbar style={{ height: 200 }}>
                    <ul class="space-y-1">
                        {/* A kiemelt médiák listázása */}
                        {medias.current
                            .filter(media => media.checked)  // Csak a kiválasztott médiák
                            .map(media => (
                                <li class="bg-slate-800 text-slate-500 text-lg font-bold p-2 rounded-lg">
                                    {media.title}
                                </li>
                            ))}
                    </ul>
                </Scrollbar>
            </div>
            {/* A megerősítő és törlés gombok */}
            <div class="flex justify-evenly pb-0 space-x-4">
                <button
                    class="p-2 w-24 bg-slate-800 text-red-500 font-bold rounded-md"
                    onClick={() => onHide()}  // A művelet törlése
                >
                    Cancel
                </button>
                <button
                    class="p-2 w-24 bg-slate-800 text-green-500 font-bold rounded-md"
                    onClick={() => onConfirm()}  // A törlés megerősítése
                >
                    Confirm
                </button>
            </div>
        </div>
    );
}

/**
 * A ConfirmDeleteDialogProps típus a ConfirmDeleteDialog komponenshez szükséges paramétereket tartalmaz.
 * 
 * @typedef {Object} ConfirmDeleteDialogProps
 * @property {() => void} onConfirm - A callback függvény, amely a törlés megerősítésekor kerül meghívásra.
 * @property {() => void} onHide - A callback függvény, amely a párbeszédpanel elrejtésekor kerül meghívásra.
 */
export type ConfirmDeleteDialogProps = {
    onConfirm: () => void;  // A törlés megerősítésére szolgáló callback
    onHide: () => void;     // A párbeszédpanel eltüntetésére szolgáló callback
};
