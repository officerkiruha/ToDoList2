async function login(){
    let userName = document.getElementById('userName').value;
    let pass = document.getElementById('pass').value;
    try{
        if(userName && pass){
        let response = await fetch('/auth/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({userName,pass})
        })
        if(response.status==200){
            window.location.href = '/';
            return;
        }
             let data = await response.json();
             alert(data.massage);
        }
        alert("data is missing")
    }catch(err){
        alert(err)
    }
    
}
