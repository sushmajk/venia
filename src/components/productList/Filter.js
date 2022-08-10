import React from "react";
import './filter.scss'

export default function Filter(props) {
  const { 
    categories,
    onFilterChange,
  } = props

  return (
    <div className="aem-GridColumn  aem-GridColumn--default--3 aem-GridColumn--phone--hide">
        <div className="filter">
            <p className="tiltle">Filters</p>
            <div className="divider"></div>

            <p className="attribute-title">Attribute</p>
            
            
              {categories.map(category => (
                <div class="filter-wrapper" key={category}>
                  
                    <input 
                      onChange={onFilterChange}
                      type="checkbox"
                      value={category} />
                      <label>
                    {category}
                  </label>
                </div>
              ))}
              </div>
    </div>
  );
}
