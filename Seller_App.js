let addProduct = document.getElementById('submit');
addProduct.addEventListener("click",show);

window.addEventListener("DOMContentLoaded",(event)=>{
    getAllProduct();
});

function show(e){
    e.preventDefault();
    let price= document.getElementById("number").value;
    let category = document.getElementById("category").value;
    let product = document.getElementById("name").value;
    if(price && category && product){
        const arrdata = {
            price1 : price,
            category1 : category,
            product1 : product,
        };

        axios.post("https://crudcrud.com/api/5f65d68a45cc45e1ad3605fb3bfe8e2e/SellerProduct",arrdata)
        .then(()=>{
            getAllProduct();
        })
        .catch((err)=>{
            console.log(err)
        });
    }
    document.getElementById("number").value = "";
    document.getElementById("category").value = "";
    document.getElementById("name").value ="";
}


//to show all the products on the screen
function getAllProduct(){
    axios.get("https://crudcrud.com/api/5f65d68a45cc45e1ad3605fb3bfe8e2e/SellerProduct")
    .then((response)=>{
        let parent = document.getElementById("table");
        parent.innerHTML="";
        for (let i=0; i<response.data.length; i++){
            let child =

            `<li id = ${response.data[i].price1}>Category:<span>${response.data[i].category1}</span>
            Product:<span> ${response.data[i].product1}</span>
            Price:<span>${response.data[i].price1}</span>
            <button onClick=deleteP('${response.data[i]._id}')>Delete</button>
            <button  onClick="edit('${response.data[i]._id}','${response.data[i].category1}','${response.data[i].product1}','${response.data[i].price1}')">Edit</button>`
            parent.innerHTML = parent.innerHTML+child;
        }
    });
}

// delete product
function deleteP(id){
    axios.delete(`https://crudcrud.com/api/5f65d68a45cc45e1ad3605fb3bfe8e2e/SellerProduct/${id}`)
    .then(()=>{
        getAllProduct();
    })
    .catch((err)=>{
        console.log(err);
    });
}

function edit(id,category1,product1,price1){
    document.getElementById("number").value = price1;
    document.getElementById("name").value = product1;
    document.getElementById("category").value = category1;
    addProduct.removeEventListener("click",show);
    addProduct.addEventListener("click",update(id));
}

function update(id){
    let newPrice = document.getElementById("number").value;
    let newProduct = document.getElementById("name").value;
    let newCateogry = document.getElementById("category").value;

    axios.put(`https://crudcrud.com/api/5f65d68a45cc45e1ad3605fb3bfe8e2e/SellerProduct/${id}`,
    {
        price1:newPrice,
        product1:newProduct,
        category1:newCateogry,
    })
    .then(()=>{
        addProduct.removeEventListener("click",update(id));
        getAllProduct();
    })
    .catch((err)=>{
        console.log(err);
    });
}