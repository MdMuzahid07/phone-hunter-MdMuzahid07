const loadData = () => {
    // get input value

    const searchFiled = document.getElementById('search-filed');
    const searchValue = searchFiled.value;

    searchFiled.value = " ";

    
    // load data by API

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
    fetch(url)
        .then(Response => Response.json())
        .then(data => displayData(data.data))

};


// display data on website

const displayData = (phones) => {
    const dataContainer = document.getElementById('search-results');
    // remove search result on every search
    dataContainer.textContent = " ";

    phones.forEach((phone) => {
        console.log(phone)
        const div = document.createElement("div");
        div.classList.add('div');
        div.innerHTML = ` 
            <div class="col">
                <div class="card p-3 rounded-3 border-0 h-100">
                    <img src="${phone.image}" class="card-img-top" alt="phone image">
                    <div class="card-body">
                        <h5 class="card-title">Brand: ${phone.brand}</h5>
                        <p class="card-text">Model: ${phone.phone_name}</p>
                    </div>
                </div>
            </div> 
        `;
        dataContainer.appendChild(div);
    });
}