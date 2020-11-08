import { createRef, useEffect, useMemo, useState } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { getData, postData } from "../utils";
import { NavLink } from "react-router-dom";

export default function News() {
  const [data, setData] = useState([]);

  useMemo(async () => await getData("/api/v1/news", setData), []);

  async function deletePost(e, id) {
    e.preventDefault();
    await postData("/admin/api/v1/post/delete", { id });

    setData((obj) => {
      const news = obj.news.filter((i) => i.id !== id);

      return {
        news,
      };
    });
  }

  return (
    <>
      <hr />
      <center>
        <NavLink to="/AddNews" className="btn btn-success">
          Добавить новость
        </NavLink>
      </center>
      <hr />
      <div className="news">
        {data && data.hasOwnProperty("news") ? (
          data.news.map(
            ({ category, id, likes, title, views, preview_img }, idx) => {
              return (
                <div className="newWrap" key={idx}>
                  <div className="new">
                    <img src={preview_img} alt="" />
                    <div className="cont">
                      <p className="intitle">
                        <b>{title}</b> &nbsp; <p>Просмотры {views}</p> &nbsp;|
                        &nbsp; <p>Лайков {likes}</p>
                      </p>
                      <p>{category}</p>
                    </div>
                  </div>
                  <div className="d-f">
                    <NavLink
                      to={"/admin"}//{`/editnews/${id}`}
                      className="btn btn-info mr-3"
                    >
                      Редактировать
                    </NavLink>
                    <form onSubmit={(e) => deletePost(e, id)}>
                      <button type="submit" className="btn btn-danger">
                        Удалить
                      </button>
                    </form>
                  </div>
                </div>
              );
            }
          )
        ) : (
          <center>
            <b>Новостей пока нет</b>
          </center>
        )}
      </div>
      <hr />
    </>
  );
}

const opt = {
  buttonList: [
    ["paragraphStyle", "blockquote"],
    ...buttonList.complex,
    ["audio"],
  ],
};

// setContents="<p>My contents</p>"

export function AddNewsPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const [prevImg, setPrevimg] = useState("");

  const [content, setContent] = useState("");

  return (
    <form
      method="POST"
      encType="multipart/form-data"
      action="/admin/api/v1/post/add"
      className="d-f flex-column align-items-center"
    >
      <div className="category">
        <p>Начальная картинка</p>

        <input
          type="file"
          value={prevImg}
          onInput={(e) => {
            setPrevimg(e.filename);
          }}
          name="img"
        />
      </div>
      <div className="title">
        <p>Заголовок</p>
        <input
          type="text"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="category">
        <p>Категория</p>
        <input
          type="text"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <SunEditor
        lang="ru"
        onChange={(_content) => setContent(_content)}
        setOptions={opt}
        width="700px"
        height="500px"
        name="content"
      />

      <center>
        <button type="submit" className="btn btn-success m-4">
          Добавить новость
        </button>
      </center>
    </form>
  );
}

export function EditNewsPage() {}
