function removeDuplicate (data=[]) {

console.log(data);
    // books = [ 
    //     { title: "C++", author: "Bjarne" }, 
    //     { title: "Java", author: "James" }, 
    //     { title: "Python", author: "Guido" }, 
    //     { title: "Java", author: "James" }, 
    // ]; 
  
    
  let  jsonObject = data.map(JSON.stringify); 
    
  console.log(jsonObject);
    
  let  uniqueSet = new Set(jsonObject); 
  let  uniqueArray = Array.from(uniqueSet).map(JSON.parse); 
   
    console.log(uniqueArray);
 
   return uniqueArray

}

export default removeDuplicate
