import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../api/fetcher';
import { createStore } from '../api/store';

export default function Stores() {
  const { data, error, isLoading, mutate } = useSWR('/stores/get-stores', fetcher);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');
  const [creating, setCreating] = useState(false);

  const role = localStorage.getItem('role'); // optional for UI hide/show

  const submit = async (e) => {
    e.preventDefault();
    setFormError('');
    setCreating(true);

    try {
      await createStore({ name, description });
      setName('');
      setDescription('');
      mutate(); // refresh store list
    } catch (err) {
      setFormError(err.response?.data?.error || 'Failed to create store');
    } finally {
      setCreating(false);
    }
  };

  if (isLoading) return <p className="text-center mt-5">Loading stores...</p>;
  if (error){ return console.log(error); <p className="text-center mt-5">Failed to load stores</p>;}

  return (
    <div className="container py-5">

      <h2 className="mb-4 text-center">Stores</h2>

      {/* Create Store (owners only visually) */}
      {role === 'STORE_OWNER' && (
        <div className="card p-3 mb-4">
          <h5>Create Store</h5>

          {formError && <div className="alert alert-danger">{formError}</div>}

          <form onSubmit={submit}>
            <input
              className="form-control mb-2"
              placeholder="Store name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <textarea
              className="form-control mb-2"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              className="btn btn-brown"
              disabled={creating}
            >
              {creating ? 'Creating...' : 'Create Store'}
            </button>
          </form>
        </div>
      )}

      {/* Store List */}
      <div className="row">
        {data.stores.map((store) => (
          <div key={store.id} className="col-md-4 mb-3">
            <div className="card p-3 h-100">
              <h5>{store.name}</h5>
              <p className="text-muted">{store.description}</p>

              <a
                href={`/stores/${store.id}`}
                className="btn btn-outline-secondary btn-sm mt-auto"
              >
                View Products
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
