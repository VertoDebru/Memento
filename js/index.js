const urlAPI = "http://localhost:3000/api/memento/";
const urlParams = new URLSearchParams(document.location.search);

fetch(urlAPI)
.then( (res) => {
    if(res.ok) {
        return res.json();
    }
})
.then( (data) => {
        data = data.data;
        //console.log(data[0].id);
        new Mymemento(data).Set();
})
.catch( (err) => {
        console.log('Error FetchAPI :');
        console.error(err);
})