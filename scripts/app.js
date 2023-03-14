// start //
// fetching;
const fetchData = (dataLimit) => {
    fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then(res => res.json())
    .then(data => showAiCards(data.data.tools, dataLimit))
}

// showing Ai Cards ;
const showAiCards = (data, dataLimit) => {
    const aiCarsField = document.getElementById("aiCarsField")
    aiCarsField.innerHTML = '';

    // validation;
    if(dataLimit && data.length > 6){
        data = data.slice(0, 6);
        document.getElementById("seeAllBtn").classList.remove("hidden");
    }else{
        document.getElementById("seeAllBtn").classList.add("hidden");
    }

    // showing single data with destructuring ;
    data.forEach(singleData => {
        // destructuring;
        let {id, name, image, features, published_in} = singleData ;

        aiCarsField.innerHTML += `
        
        <div class="card card-compact bg-base-100 shadow-xl">
            <figure><img class="w-full rounded-xl" src="${image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">Features</h2>
                <ol class="list-decimal pl-4">
                    ${showFeatures(features)}
                </ol>
            </div>
            <hr>
            <div class="card-footer p-4 flex justify-between items-center">
                <div>
                    <h3 class="font-bold mb-3">
                        ${name}
                    </h3>
                    <p><i class="fa-solid fa-calendar-week"></i> <span class="date">${published_in}</span></p>
                </div>
                <label class="btn btn-circle btn-outline" for="details-modal" onclick = "singleDetails('${id}')">
                    <i class="fa-solid fa-arrow-right"></i>
                </label>
            </div>
        </div>
        
        `;
    });
    // spinner stopping;
    spinner("card-spinner", false);

}
// card features list set ;
const showFeatures = (features) =>{
    let featuresList = '';
    features.forEach(singleFeature => {
        featuresList += `<li>${singleFeature}</li>`
    });
    return featuresList
}


//fetching single details according to dynamic id ;
const singleDetails = (id) => {
    document.getElementById("details-field").innerHTML = `<div class="loadingPlace" id="details-spinner"><div class="loading-spin"></div></div>`;
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then(res => res.json())
    .then(data => showSingleDetails(data.data))
}
// showing single details in details modal;
const showSingleDetails = (info) => {
    // destructuring;
    let {description, pricing, features, integrations, image_link, accuracy, input_output_examples} = info ;
    // details field (modal);
    document.getElementById("details-field").innerHTML = `

    <label for="details-modal" class="btn btn-sm btn-circle fixed right-2 top-2 z-10">✕</label>
    <div class="body grid lg:grid-cols-2 gap-6">
        <div class="card w-full bg-base-100 shadow-xl">
            <figure class="px-8 pt-8 relative">
                <img src="${image_link[0]}" class = "rounded-xl" />
                <div class="badge absolute font-bold top-10 right-10 bg-red-500 p-4 ${accuracy.score ? '' : 'hidden'}">${accuracy.score ? accuracy.score * 100 + '% Accuracy' : '' }</div>
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${input_output_examples? input_output_examples[0].input : 'Can you give any example?'}</h2>
                <p>${input_output_examples? input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
            </div>
        </div>
        <div class="card w-full bg-base-100 shadow-xl bg-red-50 border border-red-500 lg:order-first">
            <div class="card-body">
                <h2 class="card-title">${description}</h2>
                
                <div class="prices grid sm:grid-cols-3 gap-4 justify-center my-8">
                    <div class="font-bold text-center text-green-500 p-4 bg-white rounded-lg align-middle"> 
                    <span>${pricing ? pricing[0].price !== 'No cost' ? pricing[0].price !== '0'? pricing[0].price : 'Free of Cost' : 'Free of Cost' : 'Free of Cost'}</span> / <span>${pricing ? pricing[0]?.plan : 'Basic' }</span>
                    </div>
                    <div class="font-bold text-center text-orange-500 p-4 bg-white rounded-lg">
                    <span>${pricing ?  pricing[1].price !== 'No cost' ?  pricing[1].price !== '0'? pricing[1].price : 'Free of Cost' : 'Free of Cost' : 'Free of Cost'}</span> / <span>${pricing ? pricing[1].plan : 'Pro'}</span>
                    </div>
                    <div class="font-bold text-center text-red-500 p-4 bg-white rounded-lg">
                    <span>${pricing ?  pricing[2].price !== 'No cost' ?  pricing[2].price !== '0'? pricing[2].price : 'Free of Cost' : 'Free of Cost' : 'Free of Cost/'}</span> <span>${pricing ? pricing[2].plan : 'Enterprise' }</span>
                    </div>
                </div>
                
                <div class="sm:flex sm:justify-between gap-4">
                    <div class= "mb-5 sm:mb-0">
                        <h2 class="font-bold text-2xl mb-4">Features</h2>
                        <h3 class="${features? 'hidden' : ''}">No data Found</h3>
                        <ul class="list-disc pl-6 text-gray-700">
                            ${features? showFeaturesDetail(features) : ''}
                        </ul>
                    </div>
                    <div>
                        <h2 class="font-bold text-2xl mb-4">Integrations</h2>
                        <h3 class="${integrations? 'hidden' : ''}">No data Found</h3>
                        <ul class="list-disc pl-6 text-gray-700">
                            ${integrations? showIntegrationsDetail(integrations) : ''}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}
// set integration list in to modal;
const showIntegrationsDetail = (integrations) =>{
    let integrationsList = '';
    integrations.forEach(singleIntegrations => {
        integrationsList += `<li>${singleIntegrations}</li>`
    });
    return integrationsList ;
}
// set features list in to modal;
const showFeaturesDetail = (features) =>{

    let featuresList = '';
    for(let key in features ){
        featuresList += `<li>${features[key].feature_name}</li>`
    }

    return featuresList ;

}


// loading spinner add;
const spinner = (id, loading) => {
    const spinner = document.getElementById(id)
    if(loading){
        spinner.classList.remove("hidden");
    }else{
        spinner.classList.add("hidden");
    }
}


// fetching all data for sorting;
const fetchDataForSort = (dataLimit) => {
    fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then(res => res.json())
    .then(data => dateSorting(data.data.tools, dataLimit))
}
// sorting process ;
const dateSorting = (data, dataLimit) =>{
    data.sort((a, b) => {
        return new Date(b.published_in) - new Date(a.published_in)
    })
    showAiCards(data, dataLimit);
}
// stor sorted boolean for see more process condition;
let sorted;
// start sorting process according to click sort button ;
document.getElementById("sortBtn").onclick = () =>{
    sorted = true ;
    fetchDataForSort(6);
};


// see more process ;
document.getElementById("seeAllBtn").onclick = () =>{
    spinner("card-spinner", true);
    if(sorted){
        fetchDataForSort();
    }else{
        fetchData();
    }
}


// Called starting fetching function;
fetchData(6);
// end //