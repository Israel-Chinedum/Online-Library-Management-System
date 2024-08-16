export const random = (ID) => {

    const cap = 'cap';
    let id;

    //ALPHABETS
    const alphabets = 'abcdefghijklmnopqrstuvwxyz';
    // const capAlph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; 

    //GENERATE RANDOM DIGITS
    const firstDigit = Math.floor(10 * Math.random());
    const secondDigit = Math.floor(10 * Math.random());
    const thirdDigit = Math.floor(10 * Math.random());
    const fourthDigit = Math.floor(10 * Math.random());

    //GENERATE RANDOM LETTERS
    const firstCapLet = alphabets.toUpperCase().charAt(firstDigit);
    const secondCapLet = alphabets.toUpperCase().charAt(secondDigit);
    const firstLet = alphabets.charAt(firstDigit);
    const secondLet = alphabets.charAt(secondDigit);

    if(ID == cap){
        id = `${firstCapLet}${secondCapLet}${firstDigit}${secondDigit}${thirdDigit}${fourthDigit}`;
        return id;
    } else if(ID == ''){
        id = `${firstLet}${secondLet}${firstDigit}${secondDigit}${thirdDigit}${fourthDigit}`;
        return id;
    } else{
        return '\x1b[31m Invalid argument! \x1b[0m'
    }
   
}