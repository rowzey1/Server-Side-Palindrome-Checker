document.querySelector('#button').addEventListener('click',getResults); //on button click,get results


function checkPalindrome(str){
    const lowCaseStr=str.toLowerCase(); //converts text to lowercase
    return lowCaseStr===lowCaseStr.split('').reverse().join('');//checks if text is exactly equal to the reverse of text
}

function getResults(){
    const userInput=document.querySelector('#input').value; //text is user input

    document.querySelector('#result').innerHTML= '' //result should always be blank at the start


    fetch(`/api?text=${encodeURIComponent(userInput)}`) //linked in server side
    .then(response=>response.json())
    .then((data)=>{
        console.log(data)
        if(data.isPalindrome){
            document.querySelector('#result').innerHTML += `${data.word} is a Palindrome`
        }else{
            document.querySelector('#result').innerHTML += `${data.word} is not a Palindrome`
        }

        document.querySelector('#input').value=''; //clears user input after getting results

    })

    .catch(error => {
        console.error('Error:', error);
        document.querySelector('#result').innerHTML = 'An error occurred while checking the palindrome';
    });
   
}
