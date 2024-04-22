import express from "express";
import mysql from "mysql2"; 
import cors from "cors";

// opprett en express applikasjon
const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from the 'public' directory to show image in local file with relative path
// remember the images need to be saved in the "public" file, see the structure of the file

// "aar" in MySQL is STRING, not integer!!!

import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// opprett kobling med mysql
const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"abcd1234",
    database:"mottak"
})

// teste backend tjener på localhost
app.get("/", (req, res)=> {
    res.json("hello, this is the backend.")
})


// sjekk at applikasjon følger med i port 8800
app.listen(8800, () => {
    console.log("Connected to backend!")
})

// Databasespørring for å hente all data 
app.get("/registrering", (req, res) => {
    console.log("Entered /registrering endpoint handler")
    const q = "SELECT * FROM registrering"
    db.query(q, (error, data)=> {
        if (error)
            return res.json(error)
        else
            return res.json(data)
    });
});


// Databasespørring for å opprette spesifikke data (mottakssaken)
app.post("/registrering", (req, res) => {
    const q = "INSERT INTO registrering (`mottaksnr`, `antallGjenstander`, `grupper`, `mottaksdato`, `mottaksmetode`, `beskrivelse`, `tilstand`, `avvisningsgrunn`, `eier`, `proveniens`, `plassering`) VALUES (?)"
    const values = [
        req.body.mottaksnr,
        req.body.antallGjenstander,
        req.body.grupper,
        req.body.mottaksdato,
        req.body.mottaksmetode,
        req.body.beskrivelse,
        req.body.tilstand,
        req.body.avvisningsgrunn,
        req.body.eier,
        req.body.proveniens,
        req.body.plassering,
    ];

    db.query(q, [values], (error, data) => {
        if (error)
            return res.json(error);
        else
            return res.json(data)
    });
});

// Databasespørring for å registrere opplysning under en enkelt sak
app.post("/gjenstander", (req, res) => {
    const q = "INSERT INTO gjenstander (`mottaksnr`, `gjenstandsnr`, `beskrivelse`) VALUES (?, ?, ?)";
    const values = [
        req.body.mottaksnr,
        req.body.gjenstandsnr,
        req.body.beskrivelse,
    ];

    db.query(q, values, (error, data) => {
        if (error) {
            console.error("Error inserting data for item:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Data inserted successfully for item" });
    });
});


// Databasespørring for å slette data under en enkelt sak
app.delete("/registrering/:id", (req, res)=> {
    const mottaksId = req.params.id;
    const q = "DELETE FROM registrering WHERE id = ?";

    db.query(q, [mottaksId], (err, data) => {
        if (err)
            return res.json(err);
        else
            return res.json("deleted successfully.")
    });
});

// Databasespørring for å oppdatere data under en enkelt sak
app.put("/registrering/:id", (req, res)=> {
    const mottaksId = req.params.id;
    const q = "UPDATE registrering SET `mottaksnr` = ? , `antallGjenstander` = ? , `grupper` = ?, `mottaksdato` = ?, `mottaksmetode` = ?, `beskrivelse` = ?, `tilstand` = ?, `avvisningsgrunn` = ?, `eier` = ?, `proveniens` = ?, `plassering` = ? WHERE id = ?";
    const values = [
        req.body.mottaksnr,
        req.body.antallGjenstander,
        req.body.grupper,
        req.body.mottaksdato,
        req.body.mottaksmetode,
        req.body.beskrivelse,
        req.body.tilstand,
        req.body.avvisningsgrunn,
        req.body.eier,
        req.body.proveniens,
        req.body.plassering,
    ];


    db.query(q, [...values, mottaksId], (err, data) => {
        if (err)
            return res.json(err);
        else
            return res.json("updated successfully.")
    });
});

// Databasespørring for å hente data under en enkelt sak med spesifikk id
app.get("/registrering/:id", (req, res) => {
    const mottaksId = req.params.id;
    const q = "SELECT * FROM registrering WHERE id = ?";
    db.query(q, [mottaksId], (error, data) => {
        if (error)
            return res.json(error)
        else
            return res.json(data)
    });
});

// Databasespørring for søkefunksjon
app.get("/search", (req, res) => {
    console.log("/search ")

    const searchTerm = req.query.term;

    if (!searchTerm) {
        return res.status(400).json({ error: "Search term is required" });
    }

    const query = `
        SELECT * FROM registrering 
        WHERE mottaksnr LIKE ? 
        OR antallGjenstander LIKE ? 
        OR grupper LIKE ? 
        OR mottaksdato LIKE ? 
        OR mottaksmetode LIKE ? 
        OR beskrivelse LIKE ? 
        OR tilstand LIKE ? 
        OR avvisningsgrunn LIKE ?
        OR eier LIKE ?
        OR proveniens LIKE ?
        OR plassering LIKE ?
        `;

    // Mysql bruker '%' for å gjennomføre en delmatch (partial match)
    const searchValue = `%${searchTerm}%`;
    console.log(searchTerm)

    // Husk at antall  "searchValue" må samsvare med antall "attributer" i const "query" ovenfor
    db.query(query, [searchValue, searchValue, searchValue, searchValue, searchValue, searchValue, searchValue, searchValue, searchValue, searchValue, searchValue], (err, results) => {
        if (err) {
            console.error("Error executing search query:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        res.json(results);
    });
});


