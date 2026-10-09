import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/app/votes';

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Algo ha salido mal.');
  return data;
}

function CreatePool({ onCreated, onError }) {
  const [form, setForm] = useState({ title: '', description: '', duration: 3600 });
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    try {
      const { addNewPool } = await request('/create', {
        method: 'POST',
        body: JSON.stringify({ ...form, duration: Number(form.duration) }),
      });
      onCreated(addNewPool);
      setForm({ title: '', description: '', duration: 3600 });
    } catch (error) {
      onError(error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="panel">
      <p className="eyebrow">01 / NUEVA VOTACIÓN</p>
      <h2>Crea un pool</h2>
      <form onSubmit={handleSubmit}>
        <label>Título<input required maxLength="100" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="¿Qué decidimos?" /></label>
        <label>Descripción<textarea required rows="3" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Añade un poco de contexto" /></label>
        <label>Duración<select value={form.duration} onChange={(event) => setForm({ ...form, duration: event.target.value })}><option value="3600">1 hora</option><option value="86400">1 día</option><option value="604800">7 días</option></select></label>
        <button disabled={busy}>{busy ? 'Creando…' : 'Crear pool'} <span aria-hidden="true">↗</span></button>
      </form>
    </section>
  );
}

function PoolLookup({ initialPool, onError }) {
  const [poolId, setPoolId] = useState(initialPool?.id || '');
  const [pool, setPool] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!initialPool) return;
    setPoolId(String(initialPool.id));
    request(`/results/${initialPool.id}`).then(setPool).catch((error) => onError(error.message));
  }, [initialPool, onError]);

  async function loadPool(event) {
    event.preventDefault();
    setBusy(true);
    try {
      setPool(await request(`/results/${poolId.trim()}`));
    } catch (error) {
      onError(error.message);
      setPool(null);
    } finally {
      setBusy(false);
    }
  }

  async function vote(option) {
    setBusy(true);
    try {
      if (!window.ethereum) throw new Error('Instala MetaMask para votar.');
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const { transaction } = await request('/vote', {
        method: 'POST',
        body: JSON.stringify({ poolId: pool.id, option }),
      });
      await window.ethereum.request({ method: 'eth_sendTransaction', params: [{ ...transaction, from: accounts[0] }] });
      onError('Transacción enviada. Vuelve a consultar el pool para ver el resultado actualizado.');
    } catch (error) {
      onError(error.message);
    } finally {
      setBusy(false);
    }
  }

  const votes = pool ? Number(pool.results.option0) + Number(pool.results.option1) : 0;

  return (
    <section className="panel">
      <p className="eyebrow">02 / PARTICIPA</p>
      <h2>Encuentra un pool</h2>
      <form className="lookup" onSubmit={loadPool}>
        <label className="sr-only" htmlFor="pool-id">ID del pool</label>
        <input id="pool-id" required value={poolId} onChange={(event) => setPoolId(event.target.value)} placeholder="Introduce el ID del pool" />
        <button className="icon-button" aria-label="Buscar pool" disabled={busy}>→</button>
      </form>
      {pool && (
        <div className="pool-card">
          <div className="pool-heading"><span>POOL #{pool.id}</span><span>{votes} {votes === 1 ? 'voto' : 'votos'}</span></div>
          <h3>{pool.title}</h3>
          <p className="description">{pool.description}</p>
          {[['Sí', 'option0', 0], ['No', 'option1', 1]].map(([label, key, option]) => (
            <div className="result" key={key}>
              <div className="result-label"><span>{label}</span><span>{pool.results[key]}</span></div>
              <div className="track"><div style={{ width: `${votes ? (Number(pool.results[key]) / votes) * 100 : 0}%` }} /></div>
              <button className="vote-button" disabled={busy} onClick={() => vote(option)}>Votar {label.toLowerCase()}</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [createdPool, setCreatedPool] = useState(null);
  const [message, setMessage] = useState('');

  return (
    <main className="shell">
      <header><a className="brand" href="#top"><span className="brand-mark">v.</span> voting pool</a><span className="network"><i /> red local</span></header>
      <section className="intro" id="top"><p className="eyebrow">DECISIONES, EN COMÚN</p><h1>Una pregunta.<br /><span>Dos opciones.</span></h1><p>Una forma simple de decidir en grupo, con votos registrados en blockchain.</p></section>
      {message && <div className="notice" role="alert"><span>{message}</span><button onClick={() => setMessage('')} aria-label="Cerrar">×</button></div>}
      <div className="columns">
        <CreatePool onCreated={(pool) => { setCreatedPool(pool); setMessage(`Pool creado. Su ID es ${pool.id}.`); }} onError={setMessage} />
        <PoolLookup initialPool={createdPool} onError={setMessage} />
      </div>
      <footer>VOTING POOL <span>Hecho para decidir mejor.</span></footer>
    </main>
  );
}
