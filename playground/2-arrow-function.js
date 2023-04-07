//arrow function don't bind their own context `this` value 
const events={
    name:"Birthday party",
    guestList:['Sachin','parag','punit'],
    printGuestList(){
        console.log("Guest list for",this.name)
        this.guestList.forEach((guest)=>console.log(guest +" is attending "+this.name))//here this is used for printGuestList
        
    }
}
events.printGuestList();