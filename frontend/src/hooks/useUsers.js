import { useEffect, useState } from "react";
// import api from "../api/axios";

const useUsers = () => {
    // const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(true);

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            // const res = await api.get("/users");
            console.log(data);

            // setUsers(res.data);

            // setError("");

        } catch (error) {

            // setError(
            //     error.response?.data?.message ||
            //     "Something went wrong."
            // );

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    // useEffect(() => {
    //     onSubmit();
    // }, []);

//     const onSubmit = (data) => {
//     try {
//         setIsLoading(true);
//         console.log(data)
//     } catch (error) {
//         console.log(error)
//     } finally {
//         setIsLoading(false);
//     }
// }

    return {
        // users,
        // loading,
        // error,
        // refetch: onSubmit,
        showPassword,
        loading,
        onSubmit,
    };
};

export default useUsers;