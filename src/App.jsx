import { useEffect, useState } from 'react'
import axios from "axios"
function App() {
  const [al, setAl] = useState(false);
  // const [sessionkey, setsessionkey] = useState(null);
  const [promptShown, setPromptShown] = useState(false); // Flag to ensure prompt is called once
  const [Formdata,setFormdata] = useState([]);
useEffect(()=>{
    axios.get("http://localhost:8002/getdata")
    .then((res)=>{
      console.log(res);
      setFormdata(res.data);

    })
},[])


  function authenticate() {
    let localkey = null;
    let userInput = false;
    localkey = localStorage.getItem("key");
    if(localkey==null){
                   userInput = prompt("Please enter key:");
                }

    if (userInput === "aa") {
      setAl(true);
      localStorage.setItem("key", "baby");
    }
    
    else {
      setAl(false);

        // alert("Unauthorized access!!!!!");
      }
      
    if(localkey == "baby"){
      setAl(true);
    }
    

    
    setPromptShown(true); // Set flag to true after prompt is called

  }

  useEffect(() => {
    if (!promptShown) {
      authenticate();
    }
  }, [promptShown]);


  function clear(e){
    console.log("hello")
    localStorage.removeItem("key");
    window.location.reload();
  }

  const data = [
    { name: 'Alice', email: 'alice@example.com', link: 'https://example.com/profile/alice' },
    { name: 'Bob', email: 'bob@example.com', link: 'https://example.com/profile/bob' },
    { name: 'Charlie', email: 'charlie@example.com', link: 'https://example.com/profile/charlie' },
    { name: 'David', email: 'david@example.com', link: 'https://example.com/profile/david' },
    { name: 'Eve', email: 'eve@example.com', link: 'https://example.com/profile/eve' },
    { name: 'Frank', email: 'frank@example.com', link: 'https://example.com/profile/frank' },
    { name: 'Grace', email: 'grace@example.com', link: 'https://example.com/profile/grace' },
    { name: 'Heidi', email: 'heidi@example.com', link: 'https://example.com/profile/heidi' },
    { name: 'Ivan', email: 'ivan@example.com', link: 'https://example.com/profile/ivan' },
    { name: 'Judy', email: 'judy@example.com', link: 'https://example.com/profile/judy' }
  ];




  function DeleteEntry(url) {
    axios.delete("http://localhost:8002/delete", {  // Use HTTP
      data: { url: url }
    })
    .then((res) => {
      console.log(res);
      alert("delete successfully!!!")
      window.location.reload();
    })
    .catch((error) => {
      console.error('There was an error deleting the entry!', error);
    });
  }


  return (
    <>
      {
        (al) ?
        <>
          <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>File Url</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Formdata.map((item, index) => (
                <tr key={index}>
                  <td>{item.Name}</td>
                  <td>{item.Email}</td>
                  <td><a href={item.url}>click here for open</a></td>
                  <td><button onClick={(e)=>{ DeleteEntry(item.url)}}>delete entry</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={(e)=>{clear()}}>click me</button>
          </> : ''
      }
    </>
  );
}

export default App
