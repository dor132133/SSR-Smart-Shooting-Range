
var ID;
class Warrior {

    constructor(other,firstname, lastname, age, team, pic, jobType, rate){
        if(ID == undefined)
            ID=0;
        ID++;
        if (other instanceof Warrior) { 

            this.id = ID;
            this.firstname = other.firstname;
            this.lastname = other.lastname;
            this.age = other.age;
            this.jobType = other.jobType;
            this.team = other.team;
            this.pic = other.pic;
            this.rate = other.rate;
        }
        else{
            this.id = ID;
            this.firstname = firstname;
            this.lastname = lastname;
            this.age = age;
            this.jobType = jobType;
            this.team = team;
            this.pic = pic;
            this.rate = rate;
        }
    }

}

module.exports = Warrior;














// //Warrior class
// module.exports = () => {
//         var ID = 0;
//         //constructor
//         constructor = function(firstname, lastname, age, team, pic, jobType, rate) {
//             this.id = ID+1;
//             this.firstname = firstname;
//             this.lastname = lastname;
//             this.age = age;
//             this.jobType = jobType;
//             this.team = team;
//             this.pic = pic;
//             this.rate = rate;
//         };

//         details = function() {
//             console.log('Warrior-'+this.id +': '+this.firstname + ' ' + this.lastname +' from ' +this.team + 'team') ;
//         }

//         return {
//             constructor:constructor,
//             details:details
//         }
//     }




