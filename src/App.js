import React from 'react';
import axios from 'axios';
import "./style.css";
import Footer from './Footer';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.getCountryData = this.getCountryData.bind(this);
        this.getData = this.getData.bind(this);
    }

    state = {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        countries: []
    }




    componentDidMount = () => {
        this.getData();
    }

    async getData() {
        const resApi = await axios.get("https://covid19.mathdro.id/api");
        const resCountries = await axios.get("https://covid19.mathdro.id/api/countries");
        const countries = [];
        for (var i = 0; i < resCountries.data.countries.length; i++) {
            countries.push(resCountries.data.countries[i].name);
        }
        this.setState({
            confirmed: resApi.data.confirmed.value,
            recovered: resApi.data.recovered.value,
            deaths: resApi.data.deaths.value,
            countries
        });
    }

    async getCountryData(e) {
        if (e.target.value === "Search (default)") {
            return this.getData();
        }
        
        const res = await axios.get(`https://covid19.mathdro.id/api/countries/${e.target.value}`);
        this.setState({
            confirmed: res.data.confirmed.value,
            recovered: res.data.recovered.value,
            deaths: res.data.deaths.value
        })
    }

    renderCountryOptions() {
        return this.state.countries.map((country, i) => {
            return <option key={i}>{country}</option>
        });
    }

    render() {
        return (
            <div>
                <div className="head">
                    <h1>Covid-19 Tracker</h1>
                </div>

                <div className="container">

                    <select className="dropdown" onChange={this.getCountryData}>
                        <option>Search (default)</option>
                        {this.renderCountryOptions()}
                    </select>

                    <div className="flex">
                        <div className="box confirmed">
                            <h3>
                                Confirmed Cases
                                <i className="fas fa-virus virus"></i>
                            </h3>
                            <h4>{this.state.confirmed}</h4>
                        </div>

                        <div className="box recovered">
                            <h3>
                                Recovered Cases
                                <i className="fas fa-heartbeat heart"></i>
                            </h3>
                            <h4>{this.state.recovered}</h4>
                        </div>

                        <div className="box deaths">
                            <h3>
                                Total Deaths
                                <i className="fas fa-skull-crossbones death"></i>
                            </h3>
                            <h4>{this.state.deaths}</h4>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
