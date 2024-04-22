import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

/*this page is now to display all the data*/

const Display = () => {
    /*create an UseState, and store every data in this state*/
    const [mottaker, setMottaker] = useState([])

    /*Function to fetch ALL data*/
    useEffect(()=> {
        const fetchAllMottaker = async () => {
            try {
                const res = await axios.get("http://localhost:8800/registrering") //since it's async function, needs to await
                setMottaker(res.data)
            } catch (err) {
                console.log(err);
            }
            
        };
        fetchAllMottaker()
        
    }, []);

    /* Delete function*/
    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8800/registrering/"+id) // alternatively: `http://localhost:8800/malerier/${id}`
            window.location.reload() // to reload the page after deletion
        } catch (err) {
            console.log(err)
        };
        
    };


    return (
        <div>
            <h1>Mottak av gjenstander</h1>

            <hr />

            <button className="add">
                <Link to="/add">Opprett ny sak</Link>
            </button>
            <button className="search">
                <Link to="/search">Søk</Link>
            </button>

            <hr />

            <h2>Oversikt over saker</h2>

            <table className="allMottaker">
                <thead>
                    <tr>
                        <th>Mottaksnummer</th>
                        <th>Mottaksdato</th>
                        <th>Status</th>
                        <th>Plassering</th>
                        <th colSpan="2">Handlinger</th>
                    </tr>
                </thead>
                <tbody>
                    {mottaker.map((mottak) => ( 
                        <tr key={mottak.id}>
                            <td>{mottak.mottaksnr}</td>
                            <td>{mottak.mottaksdato}</td>
                            <td>{mottak.tilstand}</td>
                            <td>{mottak.plassering}</td>
                            <td>
                                <button className="update">
                                    <Link to={`/update/${mottak.id}`}>Oppdater</Link>
                                </button>
                            </td>    
                            <td>
                                <button className="delete" onClick={() => handleDelete(mottak.id)}>Slett</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
        
    )
};

export default Display;
