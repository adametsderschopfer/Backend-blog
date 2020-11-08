import { Fragment, useEffect, useMemo, useState } from "react";
import { getData, postData } from "../utils";

export default function SocialMedia() {
  const [data, setData] = useState([]);
  const [addInputValue, setAddInputValue] = useState([]);
  const [imgLinkInputValue, setImgLinkInputValue] = useState([]);

  useMemo(async () => await getData("/api/v1/social_media", setData), []);

  async function addSM(e) {
    e.preventDefault();

    if (addInputValue.length > 5 && imgLinkInputValue.length > 5) {
      const { result } = await postData("admin/api/v1/social_media/add", {
        link: addInputValue,
        img_link: imgLinkInputValue,
      });

      setData((arr) => [
        ...arr,
        {
          id: result.insertId,
          link: addInputValue,
          img_link: imgLinkInputValue,
        },
      ]);
      setAddInputValue("");
      setImgLinkInputValue("");
    }
  }

  async function deleteSM(e, id) {
    e.preventDefault();
    postData("admin/api/v1/contacts/delete", { id });
    setData(data.filter((i) => i.id !== id));
  }

  function addForm() {
    return (
      <form onSubmit={addSM} className="formAdd">
        <div className="d-f">
          <input
            type="text"
            className="inputAdd"
            value={addInputValue}
            onChange={(e) => setAddInputValue(e.target.value)}
            placeholder="Ссылка на соц. сеть"
          />
          <input
            type="text"
            className="inputAdd"
            value={imgLinkInputValue}
            onChange={(e) => setImgLinkInputValue(e.target.value)}
            placeholder="Ссылка на картинку (мин)"
          />
        </div>
        <button type="submit" className="addNewContact">
          Добавить новую соц. сеть
        </button>
      </form>
    );
  }

  if (data.length) {
    return (
      <div className="sm">
        <table className="tg">
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Contact</th>
              <th>action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((i, idx) => {
              return (
                <tr key={idx}>
                  <td>{i.id}</td>
                  <td>
                    <img className="sm_imgmin" src={i.img_link} />
                  </td>
                  <td>
                    <a href={i.link} target="_blank">
                      {i.link}
                    </a>
                  </td>
                  <td>
                    <form onSubmit={(e) => deleteSM(e, i.id)}>
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

        {addForm()}
      </div>
    );
  } else {
    return (
      <div className="contacts">
        <center>
          <b>Соц. сетей пока не найденно</b>
        </center>
        {addForm()}
      </div>
    );
  }
}
