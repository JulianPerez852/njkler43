import React, { Component } from 'react';
import posts from './posts'


// Modifica el componente App para implmentar la funcionalidad requerida

class App extends Component {
  constructor(){
    super();
    this.state={
      filteredData : [],
    }
    this.handlerChange=this.handlerChange.bind(this);
  }

  handlerChange(e){
   const { value } = e.target;
   const filteredData = 
        posts.filter(p => 
          this.normalizeFilterText(p.title.toLowerCase())
                                    .includes(this.normalizeFilterText(value.toLowerCase())));
    this.setState({ filteredData });
  }

  normalizeFilterText(filterText) {
    const from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
     to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
     mapping = {};
    
    from
     .split('')
     .forEach((letter, index) => {
        mapping[letter] = to.charAt(index);
     });
   
    return this.convertFilterTextToNormalizeText(filterText, mapping);
   
  };
  
  convertFilterTextToNormalizeText(filterText, normalizeMapping) {
    return filterText
     .split('')
     .map(letter => {
       return normalizeMapping[letter] ? normalizeMapping[letter] : letter;
     })
     .join('');
  }


  render() {
    const { filteredData } = this.state;
    const data = filteredData.length > 0 ? filteredData : posts;
    return (
      <div>
        <div className="filter">
          <input type="text" placeholder="Ingresa el término de búsqueda"  onChange={this.handlerChange}/>
        </div>
        <ul>
          {data.map((post,index)=>
          <li key={index}>
            <a href={post.url}><img src={post.image } /></a>
            <p>{ post.title }</p>
          </li>
          )}
        </ul>
      </div>
    )
  }
}


export default App


