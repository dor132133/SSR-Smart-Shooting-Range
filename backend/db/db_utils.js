


 //add person to db
 function addPerson(req,res,next){
    db.none('insert into persons(name,age) values(${name},${age})',req.body)
    .then(()=>{
        res.status(201)
        .json({
            status : 'success',
            message:'retrieved add a person'
        });
    })
    .catch((err)=>{
        console.log(err);
        return next(err);
    });
}

module.exports = {
    getPersonsByAge : getPersonsByAge,
    addPerson : addPerson,
};