export default function Logo() {
    return (
        <div className="grid place-items-center">
            <img
                src="/logo out.png"
                alt="TestGen Logo"
                width={24}
                height={24}
                className="col-start-1 row-start-1"
            />
            <img
                src="/logo in.png"
                alt="TestGen Logo"
                width={6}
                height={6}
                className="col-start-1 row-start-1 animate-pulse"
            />
        </div>
    )
}
