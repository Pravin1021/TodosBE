const express=require("express")
const mongooes=require("mongoose")
const cors =require("cors")
const usersmodel=require("./models/user")
const listmodel=require("./models/listItems")


const app=express()


//Middleware
app.use(express.json())
app.use(cors({  origin: 'http://localhost:3002',
}))

mongooes.connect("mongodb+srv://mpravin1021:Pravin12@todoapp.njingt7.mongodb.net/?retryWrites=true&w=majority")

app.get("/Register", async (req, res) => {

    try {
        const allData = await usersmodel.find({}); // Retrieve all data
        res.json(allData); 
    } catch (error) {
      res.status(500).send(error.message); // Handle errors
    }
  });

app.post("/Register",(req,res)=>{
    usersmodel.create(req.body)
    .then(result=>console.log(result))
    .catch(error=>console.log(error))
    console.log(req.body)
})


app.post("/Listitem",(req,res)=>{
  listmodel.create(req.body)
  .then(result=>console.log(result))
  .catch(error=>console.log(error))
  console.log(req.body)
})

app.get("/Listitem", async (req, res) => {

  try {
      const allData = await listmodel.find({});
      res.json(allData); 
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/Listitem/:id",async(req,res)=>{
  try{
    let id=req.params.id
    await listmodel.findByIdAndDelete(id)
  }
  catch(error){
    res.status(500).send(error.message);

  }
})

app.put('/Listitem/:id', async(req, res) => {
  const itemId = req.params.id;
  const { listItem } = req.body;
  try {
    const itemToUpdate = await listmodel.findById(itemId);
    if (!itemToUpdate) {
      return res.status(404).json({ error: 'Item not found' });
    }
    itemToUpdate.listItem = listItem;
    await itemToUpdate.save(); 
    res.json({ message: `Item ${itemId} updated successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const Port=process.env.PORT||3000
app.listen(Port,()=>{
    console.log("Server is running");
})