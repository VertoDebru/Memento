const urlAPI = "http://localhost:3000/api/memento/";
const urlParams = new URLSearchParams(document.location.search);
const category = urlParams.get("cat");

fetch(urlAPI)
.then( (res) => {
    if(res.ok) {
        return res.json();
    }
})
.then( (data) => {
        data = data.data;
        data.forEach(value => {
            if(value.id == category) return new Mymemento(value).Set();
        });
})
.catch( (err) => {
        console.log('Error FetchAPI :');
        console.error(err);
})