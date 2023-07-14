let date = new Date()
console.log(date.toISOString().slice(0, 10))
console.log(9 % 12)
let a = "2022-09-08"
console.log(a.substring(0,10))


useEffect(() => {
     const  loadScreenId = async () => {
       axios
         .get("http://localhost:4000/Theater/getscreenId", {
           headers: {
             token:
              sessionStorage.token,
           },
         })
         .then((response) => {
           const result = response.data;
         //  console.log(result);
           if (result["Status"] === "success") {
            console.log(response.data.data)
           
           
           } else {
             toast.error(result["error"]);
           }
         });
     };
   }, []);