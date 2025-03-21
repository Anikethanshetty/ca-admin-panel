import axios from "axios";

export function handelSubmitRegsiter(name:FormDataEntryValue,password:FormDataEntryValue,useremail:FormDataEntryValue,
   dob:FormDataEntryValue,phone_number:FormDataEntryValue,
   position:FormDataEntryValue)
   {
         axios.post("http://34.133.203.207:8080/root/create/admin",{
               name,
               password,
               useremail,
               dob,phone_number,
               position
            })
            .then((data)=>{
               console.log(data)  
            })
            .catch(()=>{
               console.log("There was in error")
               
            })
}
