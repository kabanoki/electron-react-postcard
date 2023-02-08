import {useState,useEffect} from "react";
import './App.css';

function App() {
  const [postcode,setPostcode] = useState("");
  const [post, setPost] = useState("検索中・・・");

  useEffect(() => {
    (async() => {
      await getCSV();
    })()
  },[]);

  async function getCSV() {
    const str = await window.electronAPI.openPrompt();
    let req = new XMLHttpRequest();
    req.open("get", "KEN_ALL.CSV", true);
    req.send(null);
    req.onload = function() {
      getPostCode(req.responseText,str);
    }
    setPostcode(str);
  }

  function getPostCode(str,code) {
    let tmp = str.split("\n");
    tmp.forEach(element => {
      let el = element.replace(/"/g,'');
      let result = el.split(',');
      if (result[2] === code) {
        setPost(result[6]+result[7]+result[8]);
        return;
      }
    });
  }

  return (
    <div className="App">
      <div className='to-code'>{postcode}</div>
      <div className="from-name">〇〇 〇〇</div>
      <div className="from-post">〇〇県〇〇郡〇〇町〇〇</div>
      <div className="to-name">株式会社〇〇 様</div>
      <div className="to-post">{post}</div>
      <div className='from-code'>00000000</div>
    </div>
  );
}

export default App;
