import React from "react";
import axios from "axios";
import Routing from "./components/Routing";
import AuthorizeAdmin from "./components/AuthorizeAdmin";
import Navbar from "./components/Navbar";

export function App() {
  if (document.cookie.split("=")[0] === "adminToken") {
    return (
      <>
        <Navbar />
        <div className="container-fluid pt-4">
          <Routing />
        </div>
      </>
    );
  }

  if (!document.cookie.split("=")[0]) {
    return <AuthorizeAdmin />;
  }
}


// const fd = new FormData()
// const setImg = (e) => {
//   if (e.target.files[0]) {
//     const image = e.target.files[0];
//     fd.append("img", image)
//   }
// };

// const formImgAdd = async (e) => {
//   e.preventDefault();

//   if (fd.has("img")) {
//     const data = await axios.post("/admin/api/v1/imgs/add", fd, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     fd.delete("img")
//     console.log(data);
//   }
// };

// return (
//   <div>
//     <form onSubmit={formImgAdd}>
//       <input type="file" name="userfile" onChange={setImg} />
//       <button type="submit">Добавить картинку в галлерею</button>
//     </form>
//   </div>
// );
