import axios from "axios";
import { useState } from "react";
import {Link,useParams} from "react-router-dom"
import Perks from "../Perks";

export default function PlacesPage(){
    const {action} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photosLink, setPhotosLink] = useState('');
    const [description, setDescription] = useState([]);
    const [perks,setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    function inputHeader(text) {
        return ( 
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }
    function preInput(header,description) {
        return (
            <>
            {inputHeader(header)}
            {inputDescription(description)}
            </>
        );
    }
    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link: photosLink});
        setAddedPhotos(prev => {
            return [...prev, filename];
        });
        setPhotosLink('');
    }
    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++){
            data.append('photos', files[i]);
        }
       
        axios.post('/upload', data, {
            headers: {'Content-type':'multipart/form-data'}
        }).then(response => {
            const {data:filename} = response;
            setAddedPhotos(prev => {
                return [...prev, filename];
            });
            console.log(data);
        })
    }
    return(
    <div>
        {action !== 'new' && (
        <div className= "text-center">
            <Link className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full" to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            Add new places
            </Link>
        </div>
    )}
        {action === 'new' && (
           <div>
            <form>
                {preInput('Title','Title for your place. It should be short and catchy:)')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder= "title, for example: My lovely apt"/>
                {preInput('Address','Address to this place')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
                {preInput('Photos','More = Better')}
                <div className="flex gap-2">
                    <input value={photosLink}
                     onChange={ev => setPhotosLink(ev.target.value)}  
                     type="text" placeholder={'Add using a link...jpg'} />
                    <button onClick={addPhotoByLink} className="gb-gray-200 px-4 rounded-2xl">Add&nbsp;photos</button>
                </div>
                <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {addedPhotos.length > 0 && addedPhotos.map(link => (
                        <div>
                        <img className="rounded-2xl" src={'http://localhost:4000/uploads/' +link} alt="" />
                        </div>
                    ))}
                <label className="cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                    Upload
                </label>
                </div>
                {preInput('Description','Description of the place')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>

                {preInput('Perks','Select all the perks of your place')}
                 <div className="grid  mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks} />
                 </div>
                {preInput('Extra info','house rules, etc')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                {preInput('Check in & out times, Max guests','add check in and out times, remember to have some time window for cleaning between guests.')}
                 <div className="grid gap-2 sm:grid-cols-3">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input 
                        type="text"
                        value={checkIn} 
                        onChange={ev => setCheckIn(ev.target.value)} 
                        placeholder="14" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input 
                        type="text" 
                        value={checkOut} 
                        onChange={ev => setCheckOut(ev.target.value)} 
                        placeholder="11" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input
                        type="number"
                        value={maxGuests} 
                        onChange={ev => setMaxGuests(ev.target.value)} />
                    </div>
                </div>
                <div>
                    <button className="primary my-4">Save</button>
                </div>
            </form>
           </div>
        )}
    </div>
    );
}