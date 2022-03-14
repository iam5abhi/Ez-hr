
const emails=document.getElementById('form3Example3cg')
const passwords =document.getElementById('form3Example4cg')
const myformData =document.getElementById('myformdata')
const loginsucess = document.getElementById('loginsucess')


myformData.addEventListener('submit',async(event)=>{
    event.preventDefault()
    const email=emails.value;
       const password =passwords.value;
    

       if(email.charAt(email.length-4)!='.' && email.charAt(email.length-2)!='.' ){
            document.getElementById('email').innerHTML='*** please fill the valid email';
            return false

       }

         fetch('/login',{
           method: 'POST',
           body:JSON.stringify({email: email, password: password,}),
          headers:{ 'Content-Type':'application/json'  }
        }) 
         .then(async(Response)=>{
               if(Response.status==200){
                const data =await Response.json()
                window.localStorage.setItem("jwt", data.token);
                   loginsucess.classList.add('alert_alert-success')
                   const button =document.createElement('button')
                    button.type ="button"
                    button.id="remove"
                    button.classList.add("close-alert")
                    const x =document.createTextNode('x') 
                    button.appendChild(x)
                    const i =document.createElement('i')
                          i.classList.add('"material-icons"')
                    const text =document.createTextNode('Login sucessFully') 
                    loginsucess.appendChild(button)     
                    loginsucess.appendChild(i)
                    loginsucess.appendChild(text)   

                   
                        fetch("http://localhost:8000/user",{
                         method: 'GET',
                         headers:{
                           'Accept': 'application/json',
                           'Content-Type': 'application/json',
                            Authorization:`Bearer ${localStorage.getItem("jwt")}`
                         }
                        })  
                        .then(async(res)=>{
                              console.log(res,"vikas")
                              // const data = await res.json()
                              // console.log(data,"ahui")
                              window.location.replace('/user')
                        })
                     
                
               
            
               }else if(Response.status==401){
                loginsucess.classList.add('alert_alert-warning')
                const button =document.createElement('button')
                      button.type ="button"
                      button.classList.add("close-alert")
                      const x =document.createTextNode('x') 
                      button.appendChild(x)
                      const i =document.createElement('i')
                            i.classList.add('"material-icons"')
                      const text =document.createTextNode('Invalid login credentials') 
                      loginsucess.appendChild(button)     
                      loginsucess.appendChild(i)
                      loginsucess.appendChild(text)   
                    setTimeout(()=>{
                       window.location.replace("/login");
                   },1500) 
               }
             
         })
        
 })








 
