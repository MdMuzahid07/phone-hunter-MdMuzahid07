const loadData = () => {
    // get input value

    // loading
    document.getElementById('loading').style.display = "block";

    const searchFiled = document.getElementById('search-filed');
    const searchValue = searchFiled.value.toLowerCase();

    searchFiled.value = " ";

    
    // load data by API

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
        .then(Response => Response.json())
        .then(data => displayData(data.data))

};


// display data on website

const displayData = (phones) => {
    // console.log(phones)
    const dataContainer = document.getElementById('search-results');
    // remove search result on every search
    dataContainer.textContent = " ";

    //loading 
    document.getElementById('loading').style.display = "none";


    if (phones.length === 0) {
        document.getElementById('result-error').style.display = "block";
    }
    else {
        phones.forEach((phone) => {
            console.log(phone)
            const div = document.createElement("div");
            div.innerHTML = ` 
                <div class="col">
                    <div class="card p-3 rounded-3 border-0 h-100 w-100 card-shadow">
                        <img src="${phone.image}" class="card-img-top" alt="phone image">
                        <div class="card-body">
                            <h5 class="card-title">Brand: ${phone.brand}</h5>
                            <p class="card-text">Model: ${phone.phone_name}<i onclick="phoneDetailsById('${phone.slug}')" class="fa-solid fa-angles-right ms-1 d-inline boxshadow p-1 rounded-3"></i></p>
                        </div>
                        
                    </div>
                </div> 
            `;
            dataContainer.appendChild(div);
        });
    }
};



// display phone full details

const phoneDetailsById = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => phoneFullDetails(data.data))
}


// display phone full details by click

const phoneFullDetails = (phoneFeatures) => {

    console.log(phoneFeatures)
    const phoneDetails = document.getElementById('phone-details');

    phoneDetails.textContent = " ";


    const div = document.createElement('div');
    // div.classList.add('div');
    div.innerHTML = `
        <div class="col">
            <div class="card p-3 rounded-3 border-0 h-100 w-100 card-shadow">
                <img src="${phoneFeatures.image}" class="card-img-top" alt="phone image">
                <div class="card-body">
                    <h5 class="card-title">Brand: ${phoneFeatures.brand}</h5>
                    <h5 class="card-title">releaseDate: ${phoneFeatures.releaseDate}</h5>
                    <h3>mainFeatures:</h3>
                    <p class="card-text">chipSet: ${phoneFeatures.mainFeatures.chipSet}</p>
                    <p class="card-text">displaySize: ${phoneFeatures.mainFeatures.displaySize}</p>
                    <p class="card-text">Model: ${phoneFeatures.mainFeatures.name}</p>
                    <p class="card-text">memory: ${phoneFeatures.mainFeatures.memory}</p>
                    <h3>sensors:</h3>
                    <p class="card-text">sensors: ${phoneFeatures.mainFeatures.sensors}</p>
                    <p class="card-text">storage: ${phoneFeatures.mainFeatures.storage}</p>
                </div>
            </div>
        </div>
        `;
    phoneDetails.appendChild(div);
    
    // phone others features
   
    const otherFeatures = document.createElement('div');
    otherFeatures.innerHTML = `
    <div class="card-shadow p-3">
                        <h1>Others features:</h1>
                        <p class="card-text">Bluetooth: ${phoneFeatures.others.Bluetooth}</p>
                        <p class="card-text">GPS: ${phoneFeatures.others.GPS}</p>
                        <p class="card-text">NFC: ${phoneFeatures.others.NFC}</p>
                        <p class="card-text">Radio: ${phoneFeatures.others.Radio}</p>
                        <p class="card-text">USB: ${phoneFeatures.others.USB}</p>
                        <p class="card-text">WLAN: ${phoneFeatures.others.WLAN}</p>
    </div>
    
    `;

    phoneDetails.appendChild(otherFeatures);
                      
};
