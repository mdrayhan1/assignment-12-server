const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;


const app = express();

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.shv7buz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
try{
const categoryDataCollection = client.db('discoverWatches').collection('categoryData');
const productsCollection = client.db('discoverWatches').collection('products');
const blogsCollection = client.db('discoverWatches').collection('blogs');
//category
app.get('/categoryData', async(req, res) =>{
    const query = {};
    const data = await categoryDataCollection.find(query).toArray();
    res.send(data);
})
//blogs
app.get('/blogs', async(req, res) =>{
    const query = {};
    const data = await blogsCollection.find(query).toArray();
    res.send(data);
})

// products
app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    const query = {}
    const allproduct = await productsCollection.find(query).toArray();
    const product = allproduct.filter(pro=>pro.proId == id)
    res.send(product);

})
}
finally{
}
}
run().catch(console.log);


app.get('/', async(req, res) =>{
    res.send('discover watches server is running')
})

app.listen(port, () => console.log(`discover watches running on ${port}`))