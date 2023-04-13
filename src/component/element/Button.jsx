export default function Button({type, onClick, children}){
    return(
        <button
            className="px-4 py-2 rounded bg-primary text-white font-bold hover:opacity-80 transition"
            type={type}
            onClick={()=> { onClick() }}
        >
            {children}
        </button>
    )
}