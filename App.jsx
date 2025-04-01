import { useState } from "react";

export default function App() {
  const [logg, setLogg] = useState("");
  const [notater, setNotater] = useState("");
  const [btLogg, setBtLogg] = useState([]);
  const [systolisk, setSystolisk] = useState("");
  const [diastolisk, setDiastolisk] = useState("");
  const [puls, setPuls] = useState("");

  const leggTilBT = () => {
    const ny = {
      tidspunkt: new Date().toLocaleString(),
      systolisk,
      diastolisk,
      puls
    };
    setBtLogg([ny, ...btLogg]);
    setSystolisk("");
    setDiastolisk("");
    setPuls("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ color: "#003366" }}>🩺 Min Medisinplan</h1>

      <h2 style={{ color: "#006699" }}>📋 Daglig Medisinplan</h2>
      <ul>
        <li>07:00 - Lisinopril (10 mg) – før Elvanse, på tom mage</li>
        <li>08:00 - Elvanse (60 mg) – minst 1 time etter Lisinopril</li>
        <li>08:00 - Behepan, Hydroksyklorokin, Lerkanidipin, Propranolol</li>
        <li>10:00 - Ferromax – minst 2 timer etter kaffe/meieri</li>
        <li>12:00 - Calcigran Forte, Multi, Sink, B-kompleks</li>
        <li>15:00 - Ritalin/Attentin (ved behov)</li>
        <li>18:00 - Movicol (ved behov)</li>
        <li>20:00 - Naltrekson + BT-måling + evt. Ritalin (ved behov)</li>
      </ul>

      <h2 style={{ color: "#006699" }}>❤️ Blodtrykkslogg</h2>
      <div>
        <input placeholder="Systolisk" value={systolisk} onChange={(e) => setSystolisk(e.target.value)} />
        <input placeholder="Diastolisk" value={diastolisk} onChange={(e) => setDiastolisk(e.target.value)} />
        <input placeholder="Puls" value={puls} onChange={(e) => setPuls(e.target.value)} />
        <button onClick={leggTilBT} style={{ marginLeft: "10px" }}>➕ Lagre</button>
      </div>
      <ul>
        {btLogg.map((bt, i) => (
          <li key={i}>
            {bt.tidspunkt}: {bt.systolisk}/{bt.diastolisk} – Puls: {bt.puls}
          </li>
        ))}
      </ul>

      <h2 style={{ color: "#006699" }}>📘 Dagbok og logg</h2>
      <textarea
        rows="4"
        placeholder="Skriv dagens logg eller symptomer..."
        value={logg}
        onChange={(e) => setLogg(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <h3>📝 Notater</h3>
      <textarea
        rows="3"
        placeholder="Egennotater, spørsmål til legen..."
        value={notater}
        onChange={(e) => setNotater(e.target.value)}
        style={{ width: "100%" }}
      />
    </div>
  );
}