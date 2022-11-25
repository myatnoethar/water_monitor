const jsondb = require('node-json-db');

//----------------------------------------------------------------------------------

//  @desc                   STORE WATER DATA
//  @route                  GET /api/data
//  @access                 PUBLIC
module.exports.postWaterData = (req, res, next) => {
    var data = req.query.data;
    var status = "Unknown";
    var db = new jsondb.JsonDB(new jsondb.Config("myDataBase", true, true, '/'));

    db.getData('/').then((value)=>{
        var existingData = [];

        //GET VALUE AS ARRAY
        if(value.length != undefined && value.length != 0){
            existingData = value;
        }

        //Checking Water Data
        if(data > 0 && data < 7){
            status = "Water is acidic.";
        }else if(data > 7 && data < 14){
            status = "Water is alkaline.";
        }else if(data == 7){
            status = "Water is neutral."
        }

        existingData.push({
            "created" : new Date().toISOString(),
            "data" : data,
            "status" : status,
        });


        db.push("/",existingData).then((value)=>{
            res.json({
                "message" : "success posted to server",
                "data" : value
            });
        });
    });
}

//----------------------------------------------------------------------------------

//  @desc                   STORE WATER DATA
//  @route                  GET /api/data
//  @access                 PUBLIC
module.exports.getWaterData = (req, res, next) => {
    console.log("/GET /api");
    var db = new jsondb.JsonDB(new jsondb.Config("myDataBase", true, true, '/'));
    db.getData("/").then((value)=>{
        if(value.length == undefined || value.length == 0){
            res.json([]);
        }else{
            res.json(value);
        }
    });
}