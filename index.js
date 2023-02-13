import { menuArray } from "./data.js";
window.onload = render
const orderDiv = document.getElementById('your-order')
let totalPrice = 0
const payBtn = document.getElementById('pay-btn');

document.addEventListener('click',(e)=>{
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }
    else if(e.target.id === 'complete-order-btn'){
        handleCompleteClick()
    }
})

function handleAddClick(itemId){
    const targetItemObj = menuArray.filter(function(item){
        return item.id == itemId
    })[0]
    totalPrice += Number(targetItemObj.price)
    orderDiv.removeAttribute('hidden')
    orderDiv.innerHTML += `
    <div id='item-div' data-remove="${itemId}">
    ${targetItemObj.name}:
    $${targetItemObj.price}
    </div>
    `
    displayTotalPrice()
}



function handleCompleteClick(){
    document.getElementById('modal-popup').classList.toggle('hidden')
}


payBtn.addEventListener('click', (e)=>{
    const customerName = document.getElementById('customer-name')
    if(customerName.value){
        document.getElementById('modal-popup').classList.toggle('hidden')
        orderDiv.setAttribute('hidden', 'true')
        document.getElementById('total-box').setAttribute('hidden', 'true')
        document.getElementById('order-summary').removeAttribute('hidden')
        document.getElementById('order-summary').innerHTML = `
        <h2>Thanks ${customerName.value}! Your order is on the way!</h2>
        `
    }

})

function displayTotalPrice(){
    document.getElementById('total-box').removeAttribute('hidden')
    document.getElementById('price').innerText = `
    $${totalPrice}
    `
}

function render(){
    menuArray.forEach((item)=>{
        document.getElementById('menu-box').innerHTML += `
        <div class="menu-container">
        <img src="${item.photo}" class="menu-image">
        <div class="menu-item-description">
            <div class="description-box">
                <h3>${item.name}</h3>
                <p>${item.storageOptions}</p>
                <p>$${item.price}</p>
            </div>

            <div class="button-box">
                <button class="add-btn" data-add="${item.id}">+</button>
            </div>
        </div>
        </div>
        `
    })
}
