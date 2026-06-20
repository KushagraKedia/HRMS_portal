function Button({children}){
    return(
        <button className="bg-white text-black px-8 hover:bg-[#D3D3D3] hover:cursor-pointer rounded flex gap-2">
            {children}
        </button>
    )
};

export default Button;