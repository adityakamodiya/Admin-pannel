import { useEffect, useState } from 'react'
import "./App.css"
import axios from "axios"
function App() {
  const [al, setAl] = useState(false);
  // const [sessionkey, setsessionkey] = useState(null);
  const [promptShown, setPromptShown] = useState(false); // Flag to ensure prompt is called once
  const [Formdata,setFormdata] = useState([]);
  const[isDisable,setisdisable] = useState(true);
useEffect(()=>{
  
    axios.get("https://file-uploader-back-d5gt.onrender.com/getdata")
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
                   userInput = prompt("Please Enter the  key to access:");
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
    { name: 'Alice', email: 'alice@example.com', link: 'https://example.com/profile/alice', delete: 'Delete' },
    { name: 'Bob', email: 'bob@example.com', link: 'https://example.com/profile/bob', delete: 'Delete' },
    { name: 'Charlie', email: 'charlie@example.com', link: 'https://example.com/profile/charlie', delete: 'Delete' },
    { name: 'David', email: 'david@example.com', link: 'https://example.com/profile/david', delete: 'Delete' },
    { name: 'Eve', email: 'eve@example.com', link: 'https://example.com/profile/eve', delete: 'Delete' },
    { name: 'Frank', email: 'frank@example.com', link: 'https://example.com/profile/frank', delete: 'Delete' },
    { name: 'Grace', email: 'grace@example.com', link: 'https://example.com/profile/grace', delete: 'Delete' },
    { name: 'Heidi', email: 'heidi@example.com', link: 'https://example.com/profile/heidi', delete: 'Delete' },
    { name: 'Ivan', email: 'ivan@example.com', link: 'https://example.com/profile/ivan', delete: 'Delete' },
    { name: 'Judy', email: 'judy@example.com', link: 'https://example.com/profile/judy', delete: 'Delete' }
  ];
  



  function DeleteEntry(index,url) {
    let det= document.querySelectorAll('.buttondt')
    console.log(det[index])
    det[index].style.backgroundColor = 'white'
    det[index].style.color = 'black'
    det[index].style.cursor = 'none'
    det[index].disabled =true
    axios.delete("https://file-uploader-back-d5gt.onrender.com/delete", {  // Use HTTP
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
        <div className="head">
        <h1><span>Admin</span> Pannel</h1> 
        <button onClick={(e)=>{clear()}} className='logout'>Log Out</button>
        </div>
        <div className="table">
          <table border="1" >
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>File Url</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Formdata.map((item, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td >{item.Name}</td>
                  <td>{item.Email}</td>
                  <td><a href={item.url}>click here to open the file</a></td> 
                  <td   onClick={(e)=>{ DeleteEntry(index,item.url)}}> <button className='buttondt'> Delete</button></td> 
                  {/* <td><button onClick={(e)=>{ DeleteEntry(item.url)}}>delete entry</button></td> */}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          

          </> : ''
      }
    </>
  );
}
{/* <td><a href={item.url}>click here for open</a></td> */}
export default App
