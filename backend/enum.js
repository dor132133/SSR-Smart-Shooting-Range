

module.exports = function(){
    var JOB_TYPES_ENUM = Object.freeze({
        "guid":1,
        "guest":2,
        "other":3
    })

    var TEAMS_ENUM = Object.freeze({
        "guid":1,
        "guest":2,
        "other":3
    })

    return{
        JOB_TYPES_ENUM:JOB_TYPES_ENUM,
        TEAMS_ENUM:TEAMS_ENUM,
    }

}
