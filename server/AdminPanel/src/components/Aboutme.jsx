import { Fragment, useEffect, useMemo, useState } from "react";
import { getData, postData } from "../utils";

export default function Aboutme() {
  const [linkImg, setLinkImg] = useState();
  const [_name, setName] = useState();
  const [yearOld, setYearOld] = useState();
  const [textAbout, setTextAbout] = useState();
  const [data, setData] = useState();

  const [color, setColor] = useState("#000000");
  const [persents, setPersents] = useState(1);
  const [nameing, setNameing] = useState("");
  useMemo(async () => {
    await getData("/api/v1/aboutme", setData);
  }, []);

  useEffect(() => {
    if (data) {
      const { img_link, name, year_old, text_about } = data.aboutme[0];

      setLinkImg(img_link.trim());
      setName(name);
      setYearOld(year_old);
      setTextAbout(text_about);
    }
  }, [data]);

  async function agreeChanges(e) {
    e.preventDefault();
    await postData("/admin/api/v1/aboutme", {
      img_link: linkImg,
      name: _name,
      year_old: yearOld,
      text_about: textAbout,
    });
  }

  async function addAchieve(e) {
    e.preventDefault();

    if ((persents > 0) & (nameing.length > 0)) {
      const { result } = await postData(
        "admin/api/v1/aboutme/achievements/add",
        {
          color: color,
          percent_ach: persents,
          name_ach: nameing,
        }
      );
      console.log(`result`, result);
      setData((obj) => ({
        ...obj,
        achievements: [
          ...obj.achievements,
          {
            color: color,
            percent_ach: persents,
            name_ach: nameing,
            id: result.insertId,
          },
        ],
      }));
      setColor("#000000");
      setPersents(1);
      setNameing("");
    }
  }

  async function deleteAchieve(e, id) {
    e.preventDefault();
    await postData("/admin/api/v1/aboutme/achievements/delete", { id });

    setData((obj) => {
      const achievements = obj.achievements.filter((i) => i.id !== id);

      return {
        ...obj,
        achievements,
      };
    });
  }

  if (data) {
    return (
      <>
        <center className="aboutme">
          <div className="self">
            <div className="img">
              <img src={linkImg} alt="" />
              <div className="changeImage">
                <input
                  type="text"
                  placeholder="Ссылка на картинку"
                  value={linkImg}
                  onChange={(e) => setLinkImg(e.target.value)}
                />
              </div>
            </div>
            <div className="name">
              <b>NAME</b> <br />
              <input
                type="text"
                value={_name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="year_old">
              <b>YEAR OLD</b> <br />
              <input
                type="text"
                value={yearOld}
                onChange={(e) => setYearOld(e.target.value)}
              />
            </div>

            <div className="textabout">
              <b>TEXT ABOUT ME</b> <br />
              <textarea
                type="text"
                value={textAbout}
                onChange={(e) => setTextAbout(e.target.value)}
              />
            </div>
          </div>
          <form onSubmit={agreeChanges}>
            <button type="submit" className="agre">
              Принять все изменения
            </button>
          </form>
        </center>
        <hr />
        <form onSubmit={addAchieve} className="formAdd">
          <input
            type="color"
            className="inputAdd m0"
            value={color}
            onChange={(e) => setColor(e.target.value.toString())}
          />
          <input
            type="number"
            className="inputAdd m0"
            placeholder="Процент"
            value={persents}
            onChange={(e) => {
              if (e.target.value <= 100) {
                setPersents(e.target.value);
              }
            }}
          />
          <input
            type="text"
            className="inputAdd m0"
            placeholder="Название"
            value={nameing}
            onChange={(e) => setNameing(e.target.value)}
          />
          <button type="submit" className="addNewContact">
            Добавить ачивку
          </button>
        </form>
        <div className="achievements">
          {data.achievements.length ? (
            data.achievements.map(
              ({ color, percent_ach, name_ach, id }, idx) => (
                <div className="achieve" key={idx}>
                  <div className="name">{name_ach}</div>
                  <div
                    className="line"
                    style={{
                      backgroundColor: color,
                      height: percent_ach * 2 + "px",
                    }}
                  ></div>
                  <div className="percent">{percent_ach} %</div>
                  <form
                    className="formAdd"
                    onSubmit={(e) => deleteAchieve(e, id)}
                  >
                    <button type="submit" className="deleteContact">
                      X
                    </button>
                  </form>
                </div>
              )
            )
          ) : (
            <center>
              <b>Ачивок пока нет, самое время их добавить</b>
            </center>
          )}
        </div>
      </>
    );
  } else {
    return <center>...Loading</center>;
  }
}
