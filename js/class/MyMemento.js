class Mymemento {
    constructor(data) {
        this.data = data;
        this.h1 = document.querySelector("h1");
        this.mainBox = document.querySelector("main");
        this.cat = urlParams.get("cat");
        this.memoId = urlParams.get("id");
        if(this.memoId) {
            this.memo = this.data.memos[this.memoId].memo;
            this.memoTmp = this.memo;
        }

        //RegExp
        this.reg = RegExp("(\{(.*?)\})","g");
        this.regPre = RegExp(/[A-Z]/g);
        this.regText = RegExp(/(?:})(.*?)(?:{)/g);
    }

    // Setting up Pages.
    Set() {
        if(!this.cat || this.cat == null) this.setMain();
        else this.setMemo();
    }

    // Setting up main page.
    setMain() {
        let classFa;
        // Add categories menu
        let navBox = '<nav><ul>';
        this.data.forEach(value => {
            if(value.id == "css3") classFa = `${value.id}-alt`;
            else classFa = `${value.id}`;
            navBox += `<a href="memos.html?cat=${value.id}"><li title="${value.title}"><i class="fab fa-${classFa} tc-white ts-big-icon"></i></li></a>`;
        });
        navBox += `</ul></nav>`;
        this.mainBox.innerHTML = navBox;
    }

    // Setting up articles page.
    setMemo() {
        let titlePage = `Memento ${this.data.title}`;
        this.h1.textContent = titlePage;

        let sectionBox = document.createElement("section");
        // Add navigation menu
        this.addNavigation();
        // Add List Memo if urlParams.id no exist.
        if(!this.memoId) {
            let memosLink = '';
            let i = 0;
            let ul = document.createElement("ul");
            this.data.memos.forEach( value => {
                memosLink += `<a href="memos.html?id=${i}&cat=${this.data.id}"><li><h3>${value.title}</h3></li></a>`;
                i++;
            })
            ul.innerHTML = memosLink;

            sectionBox.appendChild(ul);
            this.mainBox.appendChild(sectionBox);
        }
        // Else add Memo
        else {
            titlePage = `${this.data.memos[this.memoId].title} | ${titlePage}`;

            let articleBox = document.createElement("article");
            let h2 = document.createElement("h2");
            h2.textContent = this.data.memos[this.memoId].title;
            articleBox.appendChild(h2);

            let memoText = document.createElement("p");
            memoText.innerHTML = this.decodeMemo();
            articleBox.appendChild(memoText);
            
            sectionBox.appendChild(articleBox);
            this.mainBox.appendChild(sectionBox);
        }
        document.title = titlePage;
    }

    // Add navigation menu
    addNavigation() {
        let classFa;
        if(this.data.id == "css3") classFa = `${this.data.id}-alt`;
        else classFa = `${this.data.id}`;

        if(!this.memoId) {
            this.mainBox.innerHTML = `<nav><a href="index.html"><span><i class="fas fa-caret-left tc-white ts-med"></i></span></a>
            <h2>${this.data.title}</h2>
            <span title="${this.data.title}"><i class="fab fa-${classFa} tc-blue ts-med"></i></span></nav>`;
        }
        else {
            this.mainBox.innerHTML = `<nav><a href="memos.html?cat=${this.cat}"><span><i class="fas fa-caret-left tc-white ts-med"></i></span></a>
            <h2>${this.data.title}</h2>
            <span title="${this.data.title}"><i class="fab fa-${classFa} tc-blue ts-med"></i></span></nav>`;
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
        let regTagText = RegExp('({'+prefix+'})(.*?)({/'+prefix+'})', 'g');
        let arrayTag = this.memo.match(regTagText);
        // For all {tag}
        arrayTag.forEach( value => {
            let curTag = value.match(this.reg);
            if(curTag[0] == '{CODE}' ) this.memoTmp = this.memoTmp.replace(value, this.encodeHtml(value));
        });
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
        let myMemo = this.data.memos[this.memoId].memo;
        try {
            console.log(myMemo.match(this.reg).length);
            return myMemo.match(this.reg).length;
        }
        catch (error) {
            return 0;
        }
    }

    // Post new db.json
    postDb() {
        
    }
}