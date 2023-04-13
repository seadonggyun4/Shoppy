export default function User({user: {photoURL, displayName}}){
    return(
        <div className='flex items-center gap-1'>
            <span className='hidden text-primary text-sm md:block'>{displayName}</span>
            <img className='mr-2 w-7 h-7 rounded-full'  src={photoURL} alt={displayName} />
        </div>
    )
}