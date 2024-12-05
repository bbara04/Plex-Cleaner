import { useMediaContext } from './MediaContext';
import { Scrollbar } from 'react-scrollbars-custom';

export function ConfirmDeleteDialog({ onConfirm, onHide }: ConfirmDeleteDialogProps) {

    const medias = useMediaContext()

    return <div class="fixed p-8 rounded-lg bg-slate-600 opacity-95 space-y-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div class="space-y-6">
            <span class="text-3xl font-extrabold opacity-100 text-slate-800">Do you want to delete these? </span>
            <Scrollbar style={{height: 200 }}>
                <ul class="space-y-1">
                    {medias.current.filter(media => media.checked).map(media => (
                        <li class="bg-slate-800 text-slate-500 text-lg font-bold p-2 rounded-lg">{media.title}</li>
                    ))}
                </ul>
            </Scrollbar>
        </div>
        <div class="flex justify-evenly pb-0 space-x-4">
            <button class="p-2 w-24 bg-slate-800 text-green-500 font-bold rounded-md" onClick={() => onConfirm()}>Confirm</button>
            <button class="p-2 w-24 bg-slate-800 text-red-500 font-bold rounded-md" onClick={() => onHide()}>Cancel</button>
        </div>
    </div>
}

export type ConfirmDeleteDialogProps = {
    onConfirm: () => void;
    onHide: () => void;
};