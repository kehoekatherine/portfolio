(() => {
 const API="https://katherine-portfolio-visitors.pointycrest8.chatgpt.site";
 const gate=document.getElementById("visitor-gate"),form=document.getElementById("visitor-form"),message=document.getElementById("visitor-status"),button=form.querySelector("button");
 let saved=null;
 try{saved=JSON.parse(sessionStorage.getItem("portfolio-visitor-session")||"null")}catch{}
 function reveal(){document.documentElement.classList.remove("visitor-locked");gate.remove();document.querySelector("h1")?.setAttribute("tabindex","-1");document.querySelector("h1")?.focus({preventScroll:true})}
 function busy(on){button.disabled=on;button.textContent=on?"Opening portfolio…":"View portfolio"}
 async function send(path,body,token){const response=await fetch(API+path,{method:"POST",headers:{"Content-Type":"application/json",...(token?{Authorization:"Bearer "+token}:{})},body:JSON.stringify(body),signal:AbortSignal.timeout(15000)});const data=await response.json();if(!response.ok)throw Error(data.error||"Please try again.");return data}
 form.addEventListener("submit",async event=>{event.preventDefault();if(!form.reportValidity())return;busy(true);message.textContent="";try{const data=await send("/api/register",{name:form.elements.namedItem("name").value,email:form.elements.namedItem("email").value,noticeAccepted:form.elements.namedItem("notice").checked,website:form.elements.namedItem("website").value});try{sessionStorage.setItem("portfolio-visitor-session",JSON.stringify({token:data.token,expires:data.expires}))}catch{}reveal()}catch(error){message.textContent=error.name==="TimeoutError"?"This is taking longer than expected. Please try again.":error.message==="Failed to fetch"?"Unable to connect. Please try again, or contact Katherine using the link below.":error.message;busy(false)}});
 if(saved?.token&&saved.expires>Date.now()){busy(true);send("/api/visit",{},saved.token).then(reveal).catch(()=>{try{sessionStorage.removeItem("portfolio-visitor-session")}catch{}busy(false);message.textContent="Please enter your details to continue."})}
})();
