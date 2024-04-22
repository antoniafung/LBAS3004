import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Add = () => {

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

    /* for å håndtere endringer i felt i formen*/
    const handleChange = (e) => {
        setMottak((prev) => ({...prev, [e.target.name]: e.target.value }))
    };
    console.log(mottak)

    /* opprettelse */
    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/registrering", mottak) /*"mottak" referer til alle feltene som er definert i useState */
            navigate("/"); /* returner til hjemmesiden etter opprettelsen av en sak lykkes*/
        } catch (err) {
            console.log(err)
            setError(true)
        }
    };
    
    return (
        <div className='form'>
            <Link to="/">Hjem</Link>
            
            <h1>Opprett ny sak</h1>

            {/* name="?" nedenfor må være helt lik som de som er definerte i UseState ovenfor*/}
            <label>
                Mottaksnummer: 
                <input type="text" placeholder="SAK000?" onChange={handleChange} name="mottaksnr" value={mottak.mottaksnr} required/>
            </label>
            <label>
                Antall gjenstander:
                <input type="text" placeholder="skriv inn tall" onChange={handleChange} name="antallGjenstander" value={mottak.antallGjenstander} required/>
            </label>
            <label>
                Serie/enkelt objekt:
                <br/>
                <select onChange={handleChange} name="grupper" value={mottak.grupper}>
                    <option value="" disabled selected></option>
                    <option value="serie">Serie</option>
                    <option value="enkelt_objekt">Enkelt objekt</option> 
                </select>
            </label>
            <label>
                Dato:
                <input type="number" placeholder="yyyymmdd" onChange={handleChange} name="mottaksdato" value={mottak.mottaksdato} />
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
                    <option value="" disabled selected></option>
                    <option value="under_behandling">Under behandling</option>
                    <option value="godkjent">Godkjent</option>
                    <option value="avvist">Avvist</option> 
                </select>
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
            <button onClick={handleClick}>Opprett</button>
            {/*{error && "Something went wrong!"}*/}
            <hr />

        </div>
    )
}

export default Add;
