import { ActionSelector } from "./ActionSelector";
import { IconButton } from "./IconButton";
import { MdDeleteForever } from "react-icons/md";
import { Media } from ".";
import { MediaPanel } from "./MediaPanel";
import { WaitingPanel } from "./WaitingPanel";
import axios from "axios";
import { useEffect, useRef, useState } from "preact/hooks";
import { MediaContextProvider } from "./MediaContext";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
import Scrollbar from "react-scrollbars-custom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { forceReRenderMedia } from "./MediaPanel";

// Változó a médiák lekéréséhez
let fetchMedia: () => void;

/**
 * A MainPage komponens az alkalmazás fő oldala, amely megjeleníti a médiákat és lehetőséget biztosít azok kezelésére,
 * például törlésére. A komponens egy listát jelenít meg a médiákról és lehetőséget biztosít a felhasználónak
 * a kijelölt médiák törlésére.
 * 
 * @param {MainPageProps} props A komponens paraméterei.
 * @returns {JSX.Element} A fő oldal JSX eleme, amely tartalmazza a média listát és a kezelőelemeket.
 */
export function MainPage({ mediaPath }: MainPageProps) {

    const medias = useRef<Media[]>([]); // A médiák listája, amit a komponens használ
    const [loading, setLoading] = useState(true); // Betöltés állapota
    const [error, setError] = useState(""); // Hibaüzenet

    useEffect(() => {
        // A médiák lekérése és tárolása
        setLoading(true);
        fetchMedia = () => {
            setLoading(true);
            axios.get(`/api/media/${mediaPath}`)
                .then(response => {
                    medias.current = response.data;
                    sessionStorage.setItem(`${mediaPath}`, JSON.stringify(medias.current));
                })
                .catch(error => setError(error.message))
                .finally(() => {
                    medias.current.forEach(media => media.checked = false); // Alapértelmezett jelölés
                    setLoading(false);
                });
        };

        const mediasFromStorage = sessionStorage.getItem(`${mediaPath}`);

        if (mediasFromStorage) {
            medias.current = JSON.parse(mediasFromStorage);
            setLoading(false);
        } else {
            fetchMedia();
        }

        forceReRenderMedia(); // A média újrarenderelése, ha szükséges
    }, [mediaPath]); // A mediaPath változásakor újra lefut

    // Betöltés vagy hiba esetén megfelelő állapotot jelenítünk meg
    if (loading) {
        return <div class="overflow-y-hidden h-screen">
            <WaitingPanel message="Loading..." />
        </div>;
    }

    if (error) {
        return <div class="overflow-y-hidden h-screen">
            <WaitingPanel message="Something went wrong..." color="#400709" />
        </div>;
    }

    /**
     * A törlés művelete, amely eltávolítja a kijelölt médiákat.
     * 
     * @returns {void} 
     */
    function handleDelete() {
        const selectedMedias = medias.current.filter(media => media.checked);
        selectedMedias.forEach(media => {
            // A média törlését itt hívhatjuk meg a szerver felé
            axios.delete(`/api/media/${media.id}`)
                .then(() => medias.current = medias.current.filter(m => m.id !== media.id))
                .catch(error => setError(error.message));
            toast.success(`Deleted ${media.title}`); // A törlés sikeressége esetén értesítés
        });
        refreshMedia(); // A média lista frissítése
    }

    // A törlés megerősítő dialógus láthatósága
    const [visibleConfirmDialog, setVisibleConfirmDialog] = useState(false);

    return <MediaContextProvider medias={medias}>
        <div class="m-4 mt-20" style="height: 80vh">
            <Scrollbar>
                <MediaPanel /> {/* A médiák megjelenítése */}
            </Scrollbar>
            <div class="fixed bottom-4 right-4">
                <ActionSelector /> {/* Az akció választó komponens */}
            </div>
            <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-800 text-red-400 rounded-2xl px-3">
                <IconButton Icon={MdDeleteForever} size="32px" onClick={() => setVisibleConfirmDialog(true)} />
            </div>
            {visibleConfirmDialog && <ConfirmDeleteDialog
                onConfirm={() => {
                    handleDelete(); // A törlés megerősítése
                    setVisibleConfirmDialog(false);
                }}
                onHide={() => setVisibleConfirmDialog(false)} />}

        </div>
        <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="light"
            transition={Bounce}
        />
    </MediaContextProvider>;
}

/**
 * A `refreshMedia` függvény frissíti a médiák listáját a legújabb adatokkal.
 * Meghívja a `fetchMedia` függvényt.
 * 
 * @returns {void}
 */
export function refreshMedia() {
    sessionStorage.clear();
    fetchMedia();
}

/**
 * A MainPageProps típus a MainPage komponenshez szükséges paramétereket tartalmaz.
 * 
 * @typedef {Object} MainPageProps
 * @property {string} mediaPath - Az elérési út, amely alapján a médiákat lekérjük.
 */
export type MainPageProps = {
    mediaPath: string; // Az elérési út, amely alapján a médiákat lekérjük
};
