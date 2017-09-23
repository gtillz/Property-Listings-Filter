import React from 'react';
import jump from 'jump.js';
import data from './data/Data';
import Card from './Card';
import Header from './Header';
import GoogleMaps from './GoogleMaps';
import {easeInOutCubic} from './utils/Easing';
import image from '../images/location-map.svg'


class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      activeProperty: data.properties[0],
      filterBedrooms: 'any',
      filterBathrooms: 'any',
      filterCars: 'any',
      filterSort: 'any',
      filteredProperties: [],
      filterVisible: false,
      isFiltering: false,
      priceFrom: 500000,
      priceTo: 1000000,
      properties: data.properties,
    }

    this.setActiveProperty  = this.setActiveProperty.bind(this);
    this.toggleFilter       = this.toggleFilter.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.filterProperties   = this.filterProperties.bind(this); 
    this.clearFilter        = this.clearFilter.bind(this); 
  }

  filterProperties(){
    const {properties, filterBedrooms, filterBathrooms, filterCars, filterSort, priceFrom, priceTo} = this.state;
    const isFiltering = 
      filterBedrooms !== 'any' || 
      filterBathrooms !== 'any' || 
      filterCars !== 'any' ||
      filterSort !== 'any' ||
      priceFrom !== '0' ||
      priceTo !== '1000001';

    const getFilteredProperties = (properties) => {
      const filteredProperties = [];
      properties.map((property) => {
        const {bedrooms, bathrooms, carSpaces, price} = property;
        const match = (bedrooms === parseInt(filterBedrooms) ||  filterBedrooms === 'any') &&
                      (bathrooms === parseInt(filterBathrooms) ||  filterBathrooms === 'any') &&
                      (carSpaces === parseInt(filterCars) ||  filterCars === 'any') &&
                      (price >= priceFrom && price <= priceTo);

        //if match is true push property to filtered array
        match && filteredProperties.push(property);
      })

        // sorting propertiesList by price
        switch (filterSort) {
          case '0':
            filteredProperties.sort((a,b) => a.price - b.price)
            break;
          case '1':
            filteredProperties.sort((a,b) => b.price - a.price);
            break;
        }

      return filteredProperties;

    }

    this.setState({
      activeProperty: getFilteredProperties(properties)[0] || properties[0],
      filteredProperties: getFilteredProperties(properties),
      isFiltering
    })
  }

  handleFilterChange(e){
    const target = e.target;
    const {value, name} = target;
    // console.log(`${value} ${name}`)
    this.setState({
      [name]: value
    }, ()=>{
      this.filterProperties();   
    })
  }

  setActiveProperty(property, scroll){
    const {index} = property;

    this.setState({
      activeProperty: property
    })

    if (scroll){
      //scroll to correct property
      const target = `#card-${index}`;
      jump(target, {
        duration: 800,
        easing: easeInOutCubic,
      })
    }
  }

  toggleFilter(e){
    e.preventDefault();
    this.setState({
      filterVisible: !this.state.filterVisible
    });
  }

  clearFilter(e, form){
    e.preventDefault();

    this.setState({
      properties: this.state.properties.sort((a,b) => a.index - b.index),
      filterBedrooms: 'any',
      filterBedrooms: 'any',
      filterCars: 'any',
      filterSort: 'any',
      filteredProperties: [],
      isFiltering: false,
      priceFrom: 500000,
      priceTo: 1000000,
      activeProperty: this.state.properties[0]
    })

    form.reset();
  }

  render(){
    const {properties, activeProperty, filterVisible, filteredProperties, isFiltering, filterSort} = this.state;
    const propertiesList = isFiltering ? filteredProperties : properties;
    
    // sorting propertiesList by price
    
    return (
      <div>
        {/* listings - Start */}
        <div className="listings">

          <Header filterVisible={filterVisible}
                  toggleFilter={this.toggleFilter}
                  clearFilter={this.clearFilter}
                  handleFilterChange={this.handleFilterChange}
          />

          <div className="cards container">
            <div className={`cards-list row ${propertiesList.length === 0 ? 'is-empty':''}`}>
              {
                propertiesList.map((property)=>{
                  return <Card  key={property._id}
                                property={property}
                                activeProperty={activeProperty}
                                setActiveProperty={this.setActiveProperty}
                         />
                })
              }
              {
                (isFiltering && propertiesList.length === 0) && <p className='warning'><img src={image}/><br/>No properties were found.</p>
              }

            </div>
          </div>
        </div>

        <GoogleMaps properties={properties}
                    activeProperty={activeProperty}
                    setActiveProperty={this.setActiveProperty}
                    filteredProperties={filteredProperties}
                    isFiltering={isFiltering}
        />

      </div>
    )
  }
}

export default App;