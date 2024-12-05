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

let fetchMedia: () => void;

export function MainPage({ mediaPath }: MainPageProps) {

    const medias = useRef([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        fetchMedia = () => {
            setLoading(true);
            axios.get(`http://localhost:5000/api/media/${mediaPath}`)
                .then(response => {
                    medias.current = response.data
                    sessionStorage.setItem(`${mediaPath}`, JSON.stringify(medias.current));
                })
                .catch(error => setError(error.message))
                .finally(() => {
                    medias.current.forEach(media => media.checked = false);
                    setLoading(false);
                })
        };

        const mediasFromStorage = sessionStorage.getItem(`${mediaPath}`);

        if (mediasFromStorage) {
            medias.current = JSON.parse(mediasFromStorage);
            setLoading(false);
        } else {
            fetchMedia();
        }

        forceReRenderMedia();
    }, [mediaPath]);

    
    if (loading) {
        return <div class="overflow-y-hidden h-screen">
            <WaitingPanel message="Loading..." />
        </div>
    }

    if (error) {
        return <div class="overflow-y-hidden h-screen">
            <WaitingPanel message="Something went wrong..." color="#400709" />
        </div>
    }

    function handleDelete() {
        const selectedMedias = medias.current.filter(media => media.checked);
        selectedMedias.forEach(media => {
            /*axios.delete(`http://localhost:5000/api/media/${media.id}`)
                .then(() => medias.current = medias.current.filter(m => m.id !== media.id))
                .catch(error => setError(error.message))*/
            toast.success(`Deleted ${media.title}`);
        });
        refreshMedia();
    }

    const [visibleConfirmDialog, setVisibleConfirmDialog] = useState(false);

    return <MediaContextProvider medias={medias}>
        <div class="m-4 mt-20" style="height: 85vh">
            <Scrollbar>
                <MediaPanel />
            </Scrollbar>
            <div class="fixed bottom-4 right-4">
                <ActionSelector />
            </div>
            <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-800 text-red-400 rounded-2xl px-3">
                <IconButton Icon={MdDeleteForever} size="40px" onClick={() => setVisibleConfirmDialog(true)} />
            </div>
            {visibleConfirmDialog && <ConfirmDeleteDialog
                onConfirm={() => {
                    handleDelete()
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
    </MediaContextProvider>

}

export function refreshMedia() {
    fetchMedia();
}

export type MainPageProps = {
    mediaPath: string;
};