import axios from "axios";
import { useEffect } from "react";
import {Link,useParams} from "react-router-dom";
import AccountNav from "./AccountNav";
export default function PlacesPage(){
    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
            setPlaces(data);
        });
    }, []);
    return(
    <div>
        <AccountNav />
        <div className= "text-center">
            <Link className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full" to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            Add new places
            </Link>
        </div>
        <div className="mt-4">
            {places.length > 0 && places.map(place => (
                <div className="bg-gray-200">
                    {place.title}
                </div>
            ))}
        </div>
    </div>
    );
}