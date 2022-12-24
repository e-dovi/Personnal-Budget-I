const express=require('express');
const app=express();
app.use(express.json())
app.get('/', (req, res)=>{
    res.send('Hello World');
})
let db=[{'use':'gas', 'limit':25, 'expense':0},{'use':'groceries', 'limit':0, 'expense':0},{'use':'Telephone', 'limit':55, 'expense':0}]

app.post('/envelopes', (req, res)=>{
    const obj=req.body;
    const vals=Object.values(obj)
    console.log(obj, vals)
    for(let i=0; i<db.length; i++){
        db[i]['limit']=vals[i]
    }
    console.log(db)
    res.send('Succesfull request...'  );
})
app.get('/status', (req, res)=>{
    let ar=[];
    for (let i=0; i<db.length; i++){
       ar.push(`${db[i]['use']} limit is ${db[i]['limit']} `);
    }
    console.log(ar.join())
    res.send(ar.join())
})
app.get('/one/:id', (req, res)=>{
    const env=req.params.id;
    for(let i=0;i<db.length; i++){
        if (db[i]['use']===env){
            //res.send(`${db[i]['use']} limit is ${db[i]['limit']} `)
            res.send(JSON.stringify(db[i]))
        } 
    }
})
// Just trying something
app.get('/try/:id', (req, res)=>{
    const ar=[req.query, req.params]
    res.send(JSON.stringify(ar))
})
//////////////////////////
app.put('/withdraw/:id', (req, res)=>{
    const env=req.params.id;
    const amt=req.query.amount;
    for(let i=0; i<db.length; i++){
        if (db[i]['use']===env){
            db[i]['expense']+=Number(amt);
        }
    }
    res.send('Modification succesfull...')
})
app.delete('/one/:id', (req, res)=>{
    const env=req.params.id;
db=db.filter(objct=> objct['use']!==env);
    res.send('Deleted succesfully...')
})
app.post('/envelopes/transfer/:from/:to', (req, res)=>{
    const f_env=req.params.from;
    const to_env=req.params.to;
    const amt=Number(req.query.amount);
    for(let i=0; i<db.length; i++){
        if(db[i]['use']===f_env){
            db[i]['limit']-=amt;
        }
        if(db[i]['use']===to_env){
            db[i]['limit']+=amt;
        }   
    }
    res.send('Transfer succesfull...')

})
app.listen(3000);