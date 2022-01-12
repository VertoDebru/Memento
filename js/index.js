const urlAPI = "https://vervoot.alwaysdata.net/nodejs/api/memento/categories";
const urlParams = new URLSearchParams(document.location.search);

const loadAPI = () => {
        fetch(urlAPI)
        .then( (res) => {
                if(res.ok) return res.json();
        })
        .then( (data) => {
                data = data.category;
                new Mymemento(data).Set();
        })
        .catch( (err) => {
                console.log('Error loadAPI :');
                console.error(err);
        })
}

loadAPI();