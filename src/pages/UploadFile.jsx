import React, { useState } from "react";
import logo from "../logo.svg";
import { NFTStorage, File } from "nft.storage";
import "../App.css";
import * as getFile from "../action/getfileAction";

function uploadFile() {
  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEYwMjk2QzA5NTdiY2QzMUVGNWJDZkY1ODIxNkUwYzYzNjJFN2RiNTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyOTM0NTIzODgwNSwibmFtZSI6InppbmV0ZSJ9.nHM50vl4vdc9x1_tVU1zJpKfUueloLD9sSciojU4dXs";
  const client = new NFTStorage({ token: apiKey });
  const [disabled, setdisabled] = useState(false);
  const [file, setfile] = useState(0);

  const [name, setname] = useState(null);
  const [description, setdescription] = useState(null);
  const [filelist, setfilelist] = useState([]);
  async function getData({ name, description, image }) {
    setdisabled(true);
    if (!image) {
      alert("image is null");
      setdisabled(false);
      return false;
    }
    const metadata = await client.store({
      name,
      description,
      image,
    });
    if (metadata.url) {
      setdisabled(false);
      setfile(null);
      getAsyncFilelistData()
    }
    console.log(metadata, "metadata");
  }

  // 获取 文件信息
  async function onGetFile(e) {
    const file = e.target.files[0];
    setfile(file);
  }


  function getAsyncFilelistData() {
    getFile.getFileList().then((res) => {
      if (res.ok) {
        let filelist = res.value.filter((item) => {
          return item != null
        });
        setfilelist(filelist)
      }
    });
  }
  function fileUpload() {
    const data = File;
    return <input type="file" onChange={onGetFile} className="uploadFile"></input>;
  }

  React.useEffect(() => {
    getAsyncFilelistData()
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="" className="App-logo" />
        <div>
          <input type="text" placeholder="name" onChange={(e) => setname(e.target.value)} className="uploadImage"></input>
          <input type="text" placeholder="des" onChange={(e) => setdescription(e.target.value)} className="uploadImage"></input>
        </div>
        {fileUpload()}
        <button disabled={disabled} onClick={() => getData({ name, description, image: file })} type="submit">
          提交
        </button>
        {filelist.map((file, key) => {
          console.log(file)
          return <span key={key + "filelist"}>cid: <code>{JSON.stringify(file)}</code></span>;
        })}
      </header>
    </div>
  );
}

export default uploadFile;
