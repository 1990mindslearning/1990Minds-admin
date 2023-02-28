
const LastWord = (thePath) =>{


    var reg=/\d/g;
    console.log(thePath);

   

  if(reg.test(thePath)){

    return "Edit"
  }

  
    return thePath.substring(thePath.lastIndexOf('/') + 1)


}

const File = (thePath) =>{


  var reg=/\d/g;
  console.log(thePath);

  return thePath.substring(thePath.lastIndexOf('/') + 1)


}



export {LastWord, File}