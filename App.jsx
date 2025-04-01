import { useState, useEffect } from "react";

const medisiner = [
  "Lisinopril", "Elvanse", "Behepan", "Hydroksyklorokin",
  "Lerkanidipin", "Propranolol", "Ferromax", "Calcigran Forte",
  "Multi", "Sink", "B-kompleks", "Movicol", "Naltrekson",
  "Ritalin (ved behov)", "Attentin (ved behov)"
];

export default function App() {
  const [status, setStatus] = useState({});
  const [logg, setLogg] = useState("");
  const [notater, setNotater] = useState("");
  const [historikk, setHistorikk] = useState([]);

  const dagensDato = new Date().toLocaleDateString();

  useEffect(() => {
    const lagret = localStorage.getItem("medisinHistorikk");
    if (lagret) {
      setHistorikk(JSON.parse(lagret));
    }
  }, []);

  const toggleMedisin = (navn) => {
    setStatus((prev) => ({ ...prev, [navn]: !prev[navn] }));
  };

  const lagreDagen = () => {
    const nyLogg = {
      dato: dagensDato,
      status,
      logg,
      notater
    };
    const nyHistorikk = [nyLogg, ...historikk];
    setHistorikk(nyHistorikk);
    localStorage.setItem("medisinHistorikk", JSON.stringify(nyHistorikk));
    setStatus({});
    setLogg("");
    setNotater("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ color: "#003366" }}>📅 Min Medisinplan</h1>

      <h2 style={{ color: "#006699" }}>✅ Dagens sjekkliste ({dagensDato})</h2>
      {medisiner.map((m) => (
        <label key={m} style={{ display: "block", marginBottom: "5px" }}>
          <input type="checkbox" checked={!!status[m]} onChange={() => toggleMedisin(m)} /> {m}
        </label>
      ))}

      <h3 style={{ marginTop: "20px", color: "#006699" }}>📘 Logg</h3>
      <textarea
        rows="3"
        placeholder="Symptomer, effekt, osv."
        value={logg}
        onChange={(e) => setLogg(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <h3>📝 Notater</h3>
      <textarea
        rows="2"
        placeholder="Personlige notater..."
        value={notater}
        onChange={(e) => setNotater(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={lagreDagen} style={{ backgroundColor: "#006699", color: "white", padding: "10px 20px" }}>
        💾 Lagre dag
      </button>

      <h2 style={{ marginTop: "30px", color: "#003366" }}>📊 Historikk</h2>
      <ul>
        {historikk.map((h, i) => (
          <li key={i}>
            <strong>{h.dato}</strong>: {Object.entries(h.status).filter(([_, v]) => v).map(([k]) => k).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}