import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector("#search-box")
const countryList = document.querySelector(".country-list")
const countryInfo = document.querySelector(".country-info")

countryInput.addEventListener("input", debounce(onCountryInput, DEBOUNCE_DELAY))

function onCountryInput() {
    const countryName = countryInput.value.trim()
    if (countryName === '') {
        return (countryList.innerHTML = ''),(countryInfo.innerHTML = '')
    }

    fetchCountries(countryName).then(country => {
        if (country.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            countryList.innerHTML = '';
            countryInfo.innerHTML = '';
            return;
        }
        if (country.length <= 10) {
            renderCountryList

            
        }


    }
}
