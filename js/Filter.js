class Filter {
    constructor(apiService) {
        this.apiService = apiService;

        this.filterContainer = null;
        this.input = null;
        this.checkbox = null;
        this.lengthFilterBtn = null;
        this.substringFilterBtn = null;
        this.dataContainer = null;

        this.filteredDataByNumber = [];
        this.filteredDataBySubstring = [];
    }

    render() {
        this.filterContainer = document.querySelector('.filter-container');
        this.filterContainer.innerHTML = `
            <div class="field-text">
                <label class="field-text__label" for="surname">Введите числовое или строковое значение</label>
                <input class="field-text__input" type="text" name="surname" id="surname">
            </div>
            <div class="field-checkbox">
                <input class="field-checkbox__input" type="checkbox" name="check" id="check">
                <label class="field-checkbox__label" for="check">регистр чувствителен</label>
            </div>
            <div class="form__button-wrapper">
                <button class="btn btn-lengthFilter">Фильтр по длине слова</button>
                <button class="btn btn-substringFilter">Фильтр по подстроке</button>
            </div>
        <ul class="data-container"></ul>`;

        this.init();
    }

    init() {
        this.input = this.filterContainer.querySelector('.field-text__input');
        this.checkbox = this.filterContainer.querySelector('.field-checkbox__input');
        this.lengthFilterBtn = this.filterContainer.querySelector('.btn-lengthFilter');
        this.substringFilterBtn = this.filterContainer.querySelector('.btn-substringFilter');
        this.dataContainer = this.filterContainer.querySelector('.data-container');

        this.lengthFilterBtn.addEventListener('click', this.getFilteredDataByNumber.bind(this));
        this.substringFilterBtn.addEventListener('click', this.getFilteredDataBySubstring.bind(this));
    };

    getFilteredDataByNumber() {
        this.filteredDataByNumber = [];

        this.apiService.getData()
            .then(data => {
                data.forEach(item => {
                    if (parseInt(this.input.value) < item.length) {
                        this.filteredDataByNumber.push(item);
                    }
                });

            })
            .then(() => this.renderFilteredData(this.filteredDataByNumber))
    }

    getFilteredDataBySubstring() {
        this.filteredDataBySubstring = [];

        this.apiService.getData()
            .then(data => {
                data.forEach(item => {

                    // проверка на чувствительность регистра
                    if (this.checkbox.checked) {
                        if (item.indexOf(this.input.value) !== -1) {
                            this.filteredDataBySubstring.push(item);
                        }
                    } else {
                        if (item.toLowerCase().indexOf(this.input.value.toLowerCase()) !== -1) {
                            this.filteredDataBySubstring.push(item);
                        }
                    }
                });
            })
            .then(() => this.renderFilteredData(this.filteredDataBySubstring))
    }


    renderFilteredData(filteredData) {
        this.dataContainer.innerHTML = '';

        if (!!filteredData.length) {
            filteredData.map(item => {
                this.dataContainer.innerHTML += `<li>${item}</li>`
            })
        } else {
            this.dataContainer.innerHTML += `<p class="error">По данному запросу ничего не найдено. Введите другое значение</p>`
        }
    }
}