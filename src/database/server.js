const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(bodyParser.json());

app.use(
  "/images/products",
  express.static(path.join(__dirname, "public/images/products"))
);

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));

// Connessione al database MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mf66v0H1M2",
  database: "plantz",
});

// Verifica della connessione al database
db.connect((err) => {
  if (err) {
    console.error("Errore di connessione al database:", err);
    return;
  }
  console.log("Connesso al database MySQL");
});

// Endpoint per il login dell'utente
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Errore del server" });

    if (results.length === 0) {
      return res.status(401).json({ error: "Credenziali errate" });
    }

    const user = results[0];

    // Verifica della password con crittografia
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: "Errore del server" });
      if (!isMatch)
        return res.status(401).json({ error: "Credenziali errate" });

      res.json({ message: "Login riuscito", userId: user.id });
    });
  });
});

// Endpoint per la registrazione di un nuovo utente
app.post("/register", (req, res) => {
  const { email, password, name } = req.body;

  // Verifica se l'email è già registrata
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Errore nella query SQL:", err);
      return res.status(500).json({ error: "Errore del server" });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "Email già registrata" });
    }

    // Hashing della password e salvataggio dell'utente
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Errore nella criptografia della password:", err);
        return res.status(500).json({ error: "Errore del server" });
      }

      const query =
        "INSERT INTO users (email, password, name) VALUES (?, ?, ?)";
      db.query(query, [email, hashedPassword, name], (err, results) => {
        if (err) {
          console.error("Errore nell'inserimento nel database:", err);
          return res.status(500).json({ error: "Errore del server" });
        }

        res.status(201).json({ message: "Registrazione riuscita" });
      });
    });
  });
});

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.sendStatus(200);
});

// Endpoint per ottenere la lista delle piante dal database
app.get("/api/plants", (req, res) => {
  db.query("SELECT * FROM piante", (err, results) => {
    if (err) {
      console.error("Errore nella query: ", err);
      res.status(500).send("Errore nel recuperare i prodotti");
    } else {
      res.json(results);
    }
  });
});

// Endpoint per salvare un nuovo ordine nel database
app.post("/api/orders", (req, res) => {
  const { userId, items, total } = req.body;
  const now = new Date();

  // Inserisce ogni item dell'ordine come una riga nella tabella `ordini`
  const insertPromises = items.map((item) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO ordini (user_id, piante_id, total, data)
        VALUES (?, ?, ?, ?)
      `;
      db.query(query, [userId, item.id, item.price, now], (err, results) => {
        if (err) {
          console.error("Errore nel salvataggio ordine:", err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  });

  // Attende l'inserimento di tutti gli item prima di rispondere
  Promise.all(insertPromises)
    .then(() => res.status(201).json({ message: "Ordine salvato" }))
    .catch(() =>
      res.status(500).json({ error: "Errore nel salvataggio ordine" })
    );
});

// Endpoint per recuperare gli ordini di un utente specifico
app.get("/api/orders/:userId", (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT o.id as orderId, o.total, o.data, p.name, p.price, p.image
    FROM ordini o
    JOIN piante p ON o.piante_id = p.id
    WHERE o.user_id = ?
    ORDER BY o.data DESC
  `;
});

// Avvio del server sulla porta 5002
app.listen(5002, () => {
  console.log("Server in ascolto sulla porta 5002");
});
