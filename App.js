import React, { useEffect } from "react";
import MainNavigation from "./src/navigation/MainNavigation";
import axios from "axios";

function App() {
    const fetchAPI = async () => {
        try {
            const res = await axios.get("http://192.168.88.109:9000/");
            console.log(res.data);
        } catch (error) {
            console.log("LỖI App: ", error.message);
        }
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    return <MainNavigation />;
}

export default App;
