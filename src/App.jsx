import { useEffect, useState } from 'react'

function App() {
  const [al, setAl] = useState(false);
  // const [sessionkey, setsessionkey] = useState(null);
  const [promptShown, setPromptShown] = useState(false); // Flag to ensure prompt is called once

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
                <th>images</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.link}</td>
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
