import { ImSpinner9 } from "react-icons/im";

export default function Loader() {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/60 z-[1000]">
            <ImSpinner9 className="animate-spin" size={40} color="#8080da" />
        </div>
    );
}
