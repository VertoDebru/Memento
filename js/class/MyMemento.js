class Mymemento {
    constructor(data) {
        this.data = data;
        this.h1 = document.querySelector("h1");
        this.mainBox = document.querySelector("main");
        this.cat = urlParams.get("cat");
        this.memoId = urlParams.get("id");
        
        if(this.memoId) {
            this.data = this.data.memo;
            this.cat = this.data.catId;
            this.memo = this.data.memo;
            this.memoTmp = this.memo;
        }

        //RegExp
        this.reg = RegExp("(\{(.*?)\})","g");
        this.regPre = RegExp(/[A-Z]/g);
        this.regText = RegExp(/(?:})(.*?)(?:{)/g);
    }

    // Setting up Pages.
    Set() {
        if(!this.cat || this.cat == null) {
            if(this.memoId) return this.setMemo();
            this.setMain();
        }
        else this.setMemo();
    }

    // Setting up main page.
    setMain() {
        // Add categories menu
        let navBox = document.createElement("nav");
        let ul = document.createElement("ul");
        this.data.forEach(value => {
            ul.innerHTML += `<a href="memos.html?cat=${value.nameId}"><li title="${value.name}"><i class="fab ${value.icon} tc-white ts-big-icon"></i></li></a>`;
        });
        ul.appendChild(this.addButton("LINKC"));
        navBox.appendChild(ul);
        this.mainBox.appendChild(navBox);
    }

    // Setting up articles page.
    setMemo() {
        let titlePage = `Memento ${this.cat}`;
        this.h1.textContent = titlePage;

        let sectionBox = document.createElement("section");
        // Add navigation menu
        this.addNavigation();
        // Add List Memo if urlParams.id no exist.
        if(!this.memoId) {
            let ul = document.createElement("ul");
            if(this.data.length > 0) {
                this.data.forEach( value => {
                    ul.innerHTML += `<a href="memos.html?id=${value._id}"><li><h3>${value.title}</h3></li></a>`;
                })
            }
            else ul.innerHTML += `<li><p>Aucun mémo dans cette catégorie.</p></li>`;
            ul.appendChild(this.addButton("LINKM"));
            sectionBox.appendChild(ul);
        }
        // Else add Memo
        else {
            titlePage = `${this.data.title} | ${titlePage}`;
            let articleBox = document.createElement("article");
            articleBox.innerHTML = `<h2>${this.data.title}</h2>${this.decodeMemo()}`;
            sectionBox.appendChild(articleBox);
        }
        this.mainBox.appendChild(sectionBox);
        document.title = titlePage;
    }

    // Add Button
    addButton(type) {
        switch (type) {
            case 'CODE':
                var btn = document.createElement("button");
                btn.id = "CODE";
                btn.textContent = 'CODE';
                this.addEventBtn(btn);
                return btn;
        
            case 'RESULT':
                var btn = document.createElement("button");
                btn.id = "RESULT";
                btn.textContent = 'RESULT';
                this.addEventBtn(btn);
                return btn;
        
            case 'INFO':
                var btn = document.createElement("button");
                btn.id = "INFO";
                btn.textContent = 'INFO';
                this.addEventBtn(btn);
                return btn;

            case 'ADDC':
                var btn = document.createElement("button");
                btn.id = "ADDC";
                btn.textContent = 'Ajouter';
                this.addEventBtn(btn);
                return btn;

            case 'ADDM':
                var btn = document.createElement("button");
                btn.id = "ADDM";
                btn.textContent = "Ajouter";
                this.addEventBtn(btn);
                return btn;

            case 'LINKM':
                var btn = document.createElement("a");
                btn.id = "LINKM";
                btn.innerHTML = "<li><h3> + Add memo</h3></li>";
                this.addEventBtn(btn);
                return btn;

            case 'LINKC':
                var btn = document.createElement("a");
                btn.id = "LINKC";
                btn.innerHTML = `<li><i class="fa fa-plus tc-white ts-big-icon" aria-hidden="true"></i></li>`;
                this.addEventBtn(btn);
                return btn;

            default:
                break;
        }
    }

    // Add Event on button
    addEventBtn(button) {
        switch (button.id) {
            // CODE CODE
            case 'CODE':
                button.addEventListener('click', () => {
                    var inputMemo = document.getElementById("memo");
                    var varCode = "{CODE}{/CODE}";
                    inputMemo.value += `${varCode}`;
                });
                break;
            // CODE RESULT
            case 'RESULT':
                button.addEventListener('click', () => {
                    var inputMemo = document.getElementById("memo");
                    var varCode = "{RESULT}{/RESULT}";
                    inputMemo.value += `${varCode}`;
                });
                break;
            // CODE INFO
            case 'INFO':
                button.addEventListener('click', () => {
                    var inputMemo = document.getElementById("memo");
                    var varCode = "{INFO}{/INFO}";
                    inputMemo.value += `${varCode}`;
                });
                break;
            // ADD CATEGORY
            case 'ADDC':
                button.addEventListener('click', () => {
                    let nId = document.getElementById("nameId").value;
                    let n = document.getElementById("name").value;
                    let icon = document.getElementById("icon").value;
                    // Creation des informations pour l'envoi.
                    let body = { nameId: nId, name: n, icon: icon };
                    let initBody = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify( body )
                    };
                    
                    fetch('https://vervoot.alwaysdata.net/api/memento/categories/add', initBody)
                    .then( (res) => {
                        if(res.ok) return res.json();
                    })
                    .then( () => {
                            window.location.reload();
                    })
                    .catch( (error) => { return console.error(error); });
                });
                break;
            // ADD MEMO
            case 'ADDM':
                button.addEventListener('click', () => {
                    let inputTitle = document.getElementById("title");
                    let inputMemo = document.getElementById("memo");
                    // Creation des informations pour l'envoi.
                    let body = { catId: this.cat, title: inputTitle.value, memo: inputMemo.value };
                    let initBody = {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify( body )
                    };
                    
                    fetch('https://vervoot.alwaysdata.net/api/memento/memos/add', initBody)
                    .then( (res) => {
                        if(res.ok) return res.json();
                    })
                    .then( () => {
                            window.location.reload();
                    })
                    .catch( (error) => { return console.error(error); });
                });
                break;

            case 'LINKM':
                button.addEventListener('click', () => {
                    let divBtn = document.createElement("div");
                    let textMemo = document.createElement("textarea");
                    textMemo.id = "memo";
                    textMemo.name = "memo";
                    let btnCode = this.addButton('CODE');
                    let btnResult = this.addButton('RESULT');
                    let btnInfo = this.addButton('INFO');
                    let btnAdd = this.addButton('ADDM');
                    divBtn.append(btnCode, btnResult, btnInfo);
    
                    let divTag = document.createElement("div");
                    divTag.classList.add("post");
                    divTag.innerHTML = "<p>Memo title :</p><input type='text' id='title' name='title'><p>Memo :</p>";
                    divTag.append(divBtn, textMemo, btnAdd);
    
                    this.mainBox.appendChild(divTag);
                });
                break;

            case 'LINKC':
                button.addEventListener('click', () => {
                    // Create forms.
                    let divTag = document.createElement("div");
                    divTag.classList.add("post");
                    divTag.innerHTML = `<p>nameId :</p><input type='text' name='nameId' id='nameId'><p>name :</p><input type='text' name='name' id='name'><p>icon :</p><input type='text' name='icon' id='icon'>`;
                    // Add button
                    divTag.appendChild(this.addButton("ADDC"));
        
                    this.mainBox.appendChild(divTag);
                });
                break;
            default:
                break;
        }
    }

    // Add navigation menu
    addNavigation() {
        if(!this.memoId) {
            this.mainBox.innerHTML = `<nav><a href="index.html"><span><i class="fas fa-caret-left tc-white ts-med"></i></span></a>
            <h2>${this.cat}</h2>
            <span title="${this.cat}"><i class="fab fa-${this.cat} tc-blue ts-med"></i></span></nav>`;
        }
        else {
            this.mainBox.innerHTML = `<nav><a href="memos.html?cat=${this.data.catId}"><span><i class="fas fa-caret-left tc-white ts-med"></i></span></a>
            <h2>${this.data.title}</h2>
            <span title="${this.data.title}"><i class="fab fa-${this.data.catId} tc-blue ts-med"></i></span></nav>`;
        }
    }

    // Decode memo
    decodeMemo() {
        let count = this.countTags()-1;
        if(count) {
            for(let i = 0; i <= count; i++) {
                // si 'i' est un nombre pair. 
                if(i%2 == 0) this.encodeText(this.getTag(i));
                this.decodeTag(this.getTag(i));
            }
        }
        return this.memoTmp;
    }

    // Encode text between {TAG}
    encodeText(tag) {
        console.log(`Get text between ${tag}`);
        let prefix = this.getPrefix(tag);
        // Linebreak
        let regBr = RegExp(/(\n)+/g);
        let arrayBr = this.memo.match(regBr);
        if(arrayBr) {
            arrayBr.forEach( value => {
                this.memoTmp = this.memoTmp.replace(value, '<br />');
            });
        }
        // Code
        let regTagText = RegExp('({'+prefix+'})(.*?)({/'+prefix+'})', 'g');
        let arrayTag = this.memo.match(regTagText);
        if(arrayTag) {
            arrayTag.forEach( value => {
                let curTag = value.match(this.reg);
                if(curTag[0] == '{CODE}' ) this.memoTmp = this.memoTmp.replace(value, this.encodeHtml(value));
            });
        }
    }

    // Decode {TAG}
    decodeTag(tag) {
        let template = '';
        switch (tag) {
            case '{CODE}':
                template = `<p class="code-desc">Code</p><code>`;
                this.memoTmp = this.memoTmp.replace(tag,template);
                break;
            case '{RESULT}':
                template = `<p class="code-desc">Résultat</p><code>`;
                this.memoTmp = this.memoTmp.replace(tag,template);
                break;
            case '{INFO}':
                template = `<p class="informations">`;
                this.memoTmp = this.memoTmp.replace(tag,template);
                break;

            case '{/CODE}':
            case '{/RESULT}':
                template = `</code>`;
                this.memoTmp = this.memoTmp.replace(tag,template);
                break;
            case '{/INFO}':
                template = `</p>`;
                this.memoTmp = this.memoTmp.replace(tag,template);
                break;
        }
    }

    // Encode in HTML format.
    encodeHtml(text) {
        return text
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;"
         .replace(/}/g, "")
         .replace(/{/g, ""));
    }

    // Return {TAG} at 'position' in 'memo' text.
    getTag(position) {
        if(isNaN(position)) return console.error(`getTag Error : Missing parameter!`);
        return this.memo.match(this.reg)[position];
    }

    // Return PREFIX in {TAG}.
    // EX : {TAG} => TAG
    getPrefix(tag) {
        let arrayTag = tag.match(this.regPre);
        let myTag = '';
        arrayTag.forEach(value => {
            myTag += value;
        })
        return myTag;
    }

    // Return 'numbers' of {TAG} in 'memo' text.
    countTags() {
        let myMemo = this.memo;
        try {
            console.log(myMemo.match(this.reg).length);
            return myMemo.match(this.reg).length;
        }
        catch (error) {
            return 0;
        }
    }
}
