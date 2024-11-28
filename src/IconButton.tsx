
export function IconButton({ Icon, size, onClick }) {
    return <button class="p-2" onClick={() => onClick()}>
        <Icon size={size}/>
    </button>
}