class DataManager {
    constructor(localStorageItem,mode) {
        this.localStorageItem = localStorageItem || "questionario"; //-" + Date.now();
        this.xml = document.createElement("Questionario");
        this.json = {};

        if(mode != "xml" && mode != "json") mode = "xml";

        this.mode = mode || "xml"; //or json

    };

    create() {
        window.localStorage.setItem(this.localStorageItem,this[this.mode].outerHTML);
    }

    append(key,value,question,save) {

        //Ver primeiro se não existe

        if(this.xml.querySelector(`resposta[chave='${key}']`)) {
            let dataElement = this.xml.querySelector(`resposta[chave='${key}']`);
            dataElement.setAttribute("chave",key);
            dataElement.setAttribute("valor",encodeURIComponent(value));
            dataElement.setAttribute("questao",question);
            dataElement.innerText = value;
            this.json[key] = {
                value: value,
                question: question,
            };
        } else {
            let dataElement = document.createElement("resposta");
            dataElement.setAttribute("chave",key);
            dataElement.setAttribute("valor",encodeURIComponent(value));
            dataElement.setAttribute("questao",question);
            dataElement.innerText = value;
            this.xml.appendChild(dataElement);
            this.json[key] = {
                value: value,
                question: question,
            };
        }
        if(save == true) {
            this.write();
        }
    }

    remove(key,save) {
        this.xml.querySelector(`resposta[chave='${key}']`).remove(key);
        delete this.json[key];

        if(save == true) {
            this.write();
        }
    }

    write() {
        window.localStorage.setItem(this.localStorageItem,this[this.mode].outerHTML);
    }

    show() {
        console.log(this.localStorageItem,this[this.mode].outerHTML);
    }


    read() {
        if(this.mode == "json") {
            return this.json
        } else {
            return this.xml;
        }
    }
}
