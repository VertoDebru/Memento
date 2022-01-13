const urlAPI = "https://vervoot.alwaysdata.net/api/memento/memos";
const urlParams = new URLSearchParams(document.location.search);
const categoryID = urlParams.get("cat");
const memoID = urlParams.get("id");

const loadAPI = () => {
        let urlMemo;
        if(categoryID) urlMemo = `?cat=${categoryID}`;
        if(memoID) urlMemo = `?id=${memoID}`;
        const url = urlAPI+urlMemo;
        fetch(url)
        .then( (res) => {
                if(res.ok) return res.json();
        })
        .then( (data) => {
                if(categoryID) data = data.category;
                new Mymemento(data).Set();
        })
        .catch( (err) => {
                console.log('Error loadAPI :');
                console.error(err);
        })
}

loadAPI();