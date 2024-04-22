import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Update = () => {

    const [mottak, setMottak] = useState ({
        mottaksnr: "",
        antallGjenstander: "",
        grupper: "",
        mottaksdato: "",
        mottaksmetode: "",
        beskrivelse: "",
        tilstand: "",
        avvisningsgrunn: "",
        eier: "",
        proveniens: "",
        plassering: "",
    });

    const [error, setError] = useState(false)

    const navigate = useNavigate();

    const location = useLocation(); /* dette er for å fikse "lenke/:id" på nettsiden */

    const mottakId = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:8800/registrering/${mottakId}`);
            const fetchedsetMottak = response.data[0]; /*Anta at applikasjon returnerer en liste */ 
            setMottak(fetchedsetMottak);
          } catch (err) {
            console.log(err);
            setError(true);
          }
        };
    
        fetchData();
      }, [mottakId]);
    
    const handleChange = (e) => {
        setMottak((prev) => ({...prev, [e.target.name]: e.target.value }));
    };
    console.log(mottak)

    /* Oppdatering*/
    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.put(`http://localhost:8800/registrering/${mottakId}`, mottak);
            navigate("/");
        } catch (err) {
            console.log(err)
            setError(true)
        }
    };

    return (
        <div className='form'>
            <Link to="/">Hjem</Link>
            <h1>Oppdaterer saken</h1>
            
            <label>
                Mottaksnummer: 
                <input type="text" placeholder="mottaksnummer-MUS0000?" onChange={handleChange} name="mottaksnr" value={mottak.mottaksnr} required/>
            </label>
            <label>
                Antall gjenstander:
                <input type="text" placeholder="antall gjenstander" onChange={handleChange} name="antallGjenstander" value={mottak.antallGjenstander} required/>
            </label>
            <label>
                Serie/enkelt objekt:
                <br/>
                <select onChange={handleChange} name="grupper" value={mottak.grupper}>
                    <option value="serie">Serie</option>
                    <option value="enkelt_objekt">Enkelt objekt</option> 
                </select>
            </label>
            <label>
                Dato:
                <input type="number" placeholder="mottaksdato" onChange={handleChange} name="mottaksdato" value={mottak.mottaksdato} />
            </label>
            <label>
                Metode:
                <input type="text" placeholder="mottaksmetode" onChange={handleChange} name="mottaksmetode" value={mottak.mottaksmetode} />
            </label>
            <label>
                Beskrivelse:
                <textarea rows={5} type="text" placeholder="kort beskrivelse" onChange={handleChange} name="beskrivelse" value={mottak.beskrivelse} />
            </label>
            <label>
                Status:
                <br/>
                <select onChange={handleChange} name="tilstand" value={mottak.tilstand}>
                    <option value="under_behandling">Under behandling</option>
                    <option value="godkjent">Godkjent</option>
                    <option value="avvist">Avvist</option> 
                </select>
            </label>
            <label>
                Avvisningsgrunn:
                <input type="text" placeholder="Kun når saken er avvist" onChange={handleChange} name="avvisningsgrunn" value={mottak.avvisningsgrunn} />
            </label>
            <label>
                Eier:
                <input type="text" placeholder="Nåværende eier" onChange={handleChange} name="eier" value={mottak.eier} />
            </label>
            <label>
                Proveniens:
                <textarea rows={5} type="text" placeholder="Informasjon om proveniens" onChange={handleChange} name="proveniens" value={mottak.proveniens} />
            </label>
            <label>
                Plassering:
                <input type="text" placeholder="midlertidig plassering" onChange={handleChange} name="plassering" value={mottak.plassering} />
            </label>

            <button onClick={handleClick}>Oppdater</button>
            {error && "Something went wrong!"}
            
            <hr />
        
            
        </div>
    )
}

export default Update;
