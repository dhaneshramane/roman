var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

//connect database
mongoose.connect("mongodb://0.0.0.0:27017/Database",
{
    dbName :'user' , useUnifiedTopology:true, useNewUrlParser: true
});

var db=mongoose.connection;
//check connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))


app.get("/login",(req,res) =>{
    return res.redirect('index.html')
}).listen(3000);

app.post("/login",(req,res)=>{
    try{
        //get data from index.html
        const email = req.body.email;
        const password = req.body.password;

       const usermail = db.collection('users').findOne({email: email},
        (err,res)=>{
            if(res==null){
                res.send("Information not match. Please create account first");
            }
            else if(err) throw err;

            if(res.password===password){
                console.log("Login successfully");
                return res.redirect("we.html")
            }
            else{
                console.log("Password not match");
                res.send("Password not match");
            }
        })

    } catch(error){
        console.log("Invalid Information");
    }
})


console.log("Listening on port 3000")