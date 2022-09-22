import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryInput.addEventListener(
  'input',
  debounce(onCountryInput, DEBOUNCE_DELAY)
);

function onCountryInput() {
  const countryName = countryInput.value.trim();
  if (countryName === '') {
    return (countryList.innerHTML = ''), (countryInfo.innerHTML = '');
  }

  fetchCountries(countryName)
    .then(countries => {
      if (countries.length === 1) {
        countryList.innerHTML = '';
        const markupInfo = renderCountryInfo(countries);
        countryInfo.innerHTML = markupInfo;
      } else if (countries.length <= 10) {
        countryInfo.innerHTML = '';
        const markupList = renderCountryList(countries);
        countryList.innerHTML = markupList;
      } else {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        return;
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
      return error;
    });
}

function renderCountryList(countries) {
  return countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
         <b>${country.name.official}</p>
                </li>`;
    })
    .join('');
}

function renderCountryInfo(countries) {
  return countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
         <b>${country.name.official}</b></p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
    })
    .join('');
}
