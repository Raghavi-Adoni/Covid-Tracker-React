import React from 'react';

import {Cards, Chart,CountryPicker} from './components';
import styles from './App.module.css';
import {fetchData} from './api';

class App extends React.Component {

    state = {
        data: {},
        country: '',
    }
    async componentDidMount() {
        const fetchedData = await fetchData();
        
        this.setState({ data: fetchedData });
        //console.log(data);
    }

    handleCountryChange = async(country) => {
        
        const fetchedData = await fetchData(country);
        this.setState({ data: fetchedData, country: country });
        //fetch data
        //set state

    }
    
    render() {
        
       return(
       <div className={styles.container}>

        <Cards data = { this.state.data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data = { this.state.data} country = {this.state.country} />
        
        </div>
       )
    }
}

export default App;