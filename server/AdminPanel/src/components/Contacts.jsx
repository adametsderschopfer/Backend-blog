import { Fragment, useEffect, useMemo, useState } from "react";
import { getData, postData } from "../utils";

export default function Contacts() {
  const [data, setData] = useState([]);
  const [addInputValue, setAddInputValue] = useState([]);

  useMemo(async () => await getData("/api/v1/contacts", setData), []);

  async function addContact(e) {
    e.preventDefault();

    if (addInputValue.length > 5) {
      const data= await postData("admin/api/v1/contacts/add", {
        contact: addInputValue,
      });

      setData((arr) => [...arr, { id: data.result.insertId, contact: addInputValue }]);
      setAddInputValue("");
    }
  }

  async function deleteContact(e, id) {
    e.preventDefault();
    postData("admin/api/v1/contacts/delete", { id });
    setData(data.filter((i) => i.id !== id));
  }

  if (data.length) {
    return (
      <div className="contacts">
        <table className="tg">
          <thead>
            <tr>
              <th>Id</th>
              <th>Contact</th>
              <th>action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((i, idx) => {
              return (
                <tr key={idx}>
                  <td>{i.id}</td>
                  <td>{i.contact}</td>
                  <td>
                    <form onSubmit={(e) => deleteContact(e, i.id)}>
                      <button type="submit" className="deleteContact">
                        Удалить
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <form onSubmit={addContact} className="formAdd">
          <input
            type="text"
            className="inputAdd"
            value={addInputValue}
            onChange={(e) => setAddInputValue(e.target.value)}
            placeholder="Наименование контакта"
          />
          <button type="submit" className="addNewContact">
            Добавить новый контакт
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="contacts">
        <center>
          <b>Контактов пока не найденно</b>
        </center>

        <form onSubmit={addContact} className="formAdd">
          <input
            type="text"
            className="inputAdd"
            value={addInputValue}
            onChange={(e) => setAddInputValue(e.target.value)}
            placeholder="Наименование контакта"
          />
          <button type="submit" className="addNewContact">
            Добавить ноывый контакт
          </button>
        </form>
      </div>
    );
  }
}
