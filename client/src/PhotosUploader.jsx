import {useState} from "react";
import axios from "axios";



export default function PhotoUploader({addedPhotos,onChange}) {
    const [photosLink, setPhotosLink] = useState('');
    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link: photosLink});
        onChange(prev => {
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
            const {data:filenames} = response;
            onChange(prev => {
                return [...prev, ...filenames];
            });
            console.log(data);
        })
    }
    return (
        <>
        <div className="flex gap-2">
                    <input value={photosLink}
                     onChange={ev => setPhotosLink(ev.target.value)}  
                     type="text" placeholder={'Add using a link...jpg'} />
                    <button onClick={addPhotoByLink} className="gb-gray-200 px-4 rounded-2xl">Add&nbsp;photos</button>
                </div>
                <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {addedPhotos.length > 0 && addedPhotos.map(link => (
                        <div className="h-32 flex" key={link}>
                        <img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/' +link} alt="" />
                        </div>
                    ))}
                <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                    Upload
                </label>
                </div>
        </>
    );
}