//image into base64 to store it in mongodb

export default function convertToBase64(file){
    return new Promise((resolve,reject)=>{
        const fileReader = new FileReader;
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        } 
    })
}


///you can also write like this instead of promise but we are using the promise because we are return a object
// export default function convertToBase64(file){
    
//     const reader = new FileReader;
//     reader.readAsDataURL(file)
//     reader.onload=()=>{
//         var send = reader.result;
//     }
//     reader.onerror = () =>{
//         var send = reader.result
//     }
    
// }