import { useMemo, useState } from "react";
import { getData, postData } from "../utils";

export default function Gallery() {
  const fd = new FormData();

  const setImgFile = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      fd.append("img", image);
    }
  };

  const [img_file, setImg_file] = useState();
  const [data, setData] = useState([]);

  useMemo(async () => await getData("/api/v1/imgs", setData), []);

  async function addInGal(e) {
    e.preventDefault();
    if (fd.has("img")) {
      const { path, id } = await postData("/admin/api/v1/imgs/add", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setData((arr) => [...arr, { imageID: id, imageURL: path }]);
      setImg_file("");
      fd.delete("img");
    }
  }

  async function deleteInGal(e, imageID) {
    e.preventDefault();
    const data = await postData("/admin/api/v1/imgs/delete", { imageID });

    setData((arr) => arr.filter((i) => imageID !== i.imageID));
  }

  function FormHtml() {
    return (
      <form onSubmit={addInGal} className="formAdd">
        <input
          type="file"
          value={img_file}
          name="img"
          onChange={(e) => {
            setImgFile(e);
            setImg_file(e.filename);
          }}
          className="inputAdd"
        />
        <button type="submit" className="addNewContact">
          Добавить фото
        </button>
      </form>
    );
  }

  if (data.length) {
    return (
      <div className="gallery">
        <div className="imgs">
          {data.map((i, idx) => (
            <div className="set" key={idx}>
              <img className="imgFilegal" src={i.imageURL} alt="" />
              <form onSubmit={(e) => deleteInGal(e, i.imageID)}>
                <button type="submit" className="deleteContact">
                  Удалить
                </button>
              </form>
            </div>
          ))}
        </div>
        <FormHtml />
      </div>
    );
  } else {
    return (
      <div className="gallery">
        <center>
          <b>Фото пока нет самое время их добавить ;{")"}</b>
        </center>

        <FormHtml />
      </div>
    );
  }
}
