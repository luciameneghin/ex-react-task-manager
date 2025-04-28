//form per aggiungere nuovo task
import { useState, useRef } from "react"

const AddTask = () => {

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const refDescription = useRef();
  const refStatus = useRef();

  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

  const validateTitle = (title) => {
    if (title.length < 3) {
      return "Il titolo deve essere lungo almeno 3 caratteri";
    }
    if (title.length > 50) {
      return "Il titolo deve essere lungo massimo 50 caratteri";
    }
    if (symbols.split("").some((symbol) => title.includes(symbol))) {
      return "Il titolo non può contenere caratteri speciali";
    }
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const error = validateTitle(title);

    if (error) {
      setTitleError(error);
      return;
    }
    setTitleError("");

    const description = refDescription.current.value;
    const status = refStatus.current.value;

    const task = {
      title,
      description,
      status
    };
    console.log('Nuova task:', task);
    setTitle("");
    refDescription.current.value = "";
    refStatus.current.value = "to do";
    setTitleError("");
  }

  return (
    <div>
      <h1>Aggiungi Task</h1>
      <form onSubmit={handleSubmit} className="form-control">
        <section>
          <label>Inserisci il titolo della task</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titolo task (*)"
            className="form-control"
          />
          {titleError && (
            <p className="text-danger">{titleError}</p>
          )}
        </section>

        <section>
          <label>Descrivi la tua task</label>
          <textarea
            type='text'
            name="description"
            ref={refDescription}
            placeholder="Descrizione task"
            className="form-control"
          ></textarea>
        </section>

        <section>
          <label>Stato della task</label>
          <select
            name="status"
            ref={refStatus}
            className="form-select">
            <option value="to do">To do (default)</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </section>

        <p className="fst-italic">* (campi obbligatori)</p>
        <button type="submit" className="btn btn-primary">Aggiungi Task</button>
      </form>
    </div>
  )
}

export default AddTask
