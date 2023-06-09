import { useNavigate } from "react-router"

export const Home  = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>Home</h1>
            <button className="bg-black text-white" onClick={()=> navigate('/register')}>Register</button>
        </>
    )
}