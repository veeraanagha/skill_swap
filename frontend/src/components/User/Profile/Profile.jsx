import { React, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const propName = 'font-bold'
    const keyValPair = "w-full flex justify-between"
    const navigate = useNavigate()

    useEffect(() => {
        const handleFetch = async () => {
            try {
                // Make GET request to fetch profile data
                const response = await Axios.get('http://localhost:3000/user/profile');

                if (response.status === 200) {
                    console.log('Profile fetched successfully:', response.data);
                } else {
                    console.log('Fetch not working');
                }
            } catch (error) {
                if (error.response.status === 401) {
                    console.log('Token is invalid or expired');
                    navigate('/user/login');
                } else {
                    console.error('Fetching profile failed:', error.response.data);
                }
            }
        };

        handleFetch();
    }, []);


    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col bg-white dark:bg-sky-600 w-96 min-h-72 relative shadow-lg mt-10">
                <h1 className="text-right font-bold text-3xl p-3">skillswap</h1>
                <div className="flex flex-col py-3 px-10 text-lg">
                    <div className={keyValPair}>
                        <label className={propName}>username</label>
                        <label>test321cat</label>
                    </div>
                    <div className={keyValPair}>
                        <label className={propName}>fname</label>
                        <label>fnametest</label>
                    </div>
                    <div className={keyValPair}>
                        <label className={propName}>lname</label>
                        <label>lnametest</label>
                    </div>
                    <div className={keyValPair}>
                        <label className={propName}>email</label>
                        <label>test@test.com</label>
                    </div>
                    <div className={keyValPair}>
                        <label className={propName}>interests</label>
                        <label>web development</label>
                    </div>
                    <div className={keyValPair}>
                        <label className={propName}>skills</label>
                        <label>blockchain</label>
                    </div>
                    <div className={keyValPair}>
                        <label className={propName}>bio</label>
                        <label>biology biography biotechnology biome</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
