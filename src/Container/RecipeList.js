import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import {MOCK} from '../Mock' 
import { Card, CardImg, CardText, CardBody, CardTitle, Button } from 'reactstrap'
import RecipeDetail from '../Component/RecipeDetail'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faPlus} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

class RecipeList extends Component {
state = {
    recipes: [],
    addMode: false,
    }; 

    getById = (recipe) => {
        axios.get(`http://10.0.1.119:8080/api/v1/recipes/${recipe.id}`)
          .then(res => {
            console.log(recipe);
            console.log(res.data)
          },
        error => console.log(error))
    }

    getAll = () => {
        axios.get(`http://10.0.1.119:8080/api/v1/recipes`)
          .then(res => {
            const recipes = res.data;
            console.log(recipes);
            this.setState({recipes:  recipes });
          },
        error => console.log(error))
    }

    componentDidMount() {
        this.getAll()
    }


    patch = (recipe) => {
        axios.patch(`http://10.0.1.119:8080/api/v1/recipes/`, recipe)
            .then(res => {
                console.log("NOUS PATCHONS" + res);
            }, error => console.log(error))
        this.getAll()    
    }



    add = (recipe) => {
        let newRecipe = {
            ...recipe, 
            id : (this.state.recipes[this.state.recipes.length-1].id + 1),
            instructions : "instinst",
            ingredients : [    {
                "recipeId": 226,
                "ingredientId": 1,
                "name": "Dark rum (Appleton Estate Reserve)",
                "quantity": 2,
                "unit": "oz"
              }]             
        };
        this.setState({
            recipes : this.state.recipes.concat(newRecipe),
            addMode : false
        })
        axios.post(`http://10.0.1.119:8080/api/v1/recipes/`, { ...newRecipe })
      .then(res => {
        console.log(res);
        this.getAll();
        console.log(res.data);
      }, error => console.log(error))
    }

    // add = (recipe) => {
    //     this.setState({
    //         recipes : this.state.recipes.concat({
    //             ...recipe, 
    //             id : (this.state.recipes[this.state.recipes.length-1].id + 1),
    //             instructions : "instinst",
    //             ingredients : []
    //         })
    //     })
    //     this.setState({
    //         addMode : false
    //     })     
    // }
    

    // setId = () => {
    //     console.log("setid : " + this.state.recipes.length)
    // return this.state.recipes.length + 1
    // };

    // delete = (id) => () => {
    // this.setState({
    //     recipes : this.state.recipes.filter(item => item.id !== id)
    // })
    // };


    delete = (recipe) => () => {
        console.log("RECIPE TO DELETE : ", recipe, {...recipe})
        let id = recipe.id
        axios.delete(`http://10.0.1.119:8080/api/v1/recipes/${recipe.id}`, {...recipe})
        .then(res => {
            console.log('res', res);
            console.log('res2', res.data);
            this.setState({
                recipes : this.state.recipes.filter(item => item.id !== id)
            })
        }, error => console.log('test', error)) 
        //this.getAll()
        };
    

    // modify = (id, newTxt) => () => {
    //   this.setState(
    //     {recipes.name = newTxt}
    //   )
    // };

    toggleAddMode = () => {
    this.setState({
        addMode: !this.state.addMode,
        

        // var newArray = this.state.recipes.slice();    
        // newArray.push("new value");   
        // this.setState({arr:newArray})
    })
    }

    // maj = (recipe) => {
    // this.setState({
    //     recipes : this.state.recipes.concat(recipe),
    //     addMode: !this.state.addMode
    // })
    // }

    render(){
        console.log(this.state.recipes);
    return (
        
        <div className = "container">
        <div className = "row">
            {this.state.recipes.map(item => 
            <div key = {item.id} className = "col-sm-12 col-lg-2 col-md-3">
                <RecipeDetail key = {item.id} recipe = {item} getOne = {this.getById} delete={this.delete} patch={this.patch}/>         
            </div>
            ) }
            <div className="col-md-3">
            {/* <Button onClick = {this.create()}><FontAwesomeIcon icon={faPlus}/></Button> */}
            {
                this.state.addMode ? 
                // <RecipeDetail addMode = {this.state.addMode} maj = {this.maj} set = {this.setId}/> : 
                <RecipeDetail addMode = {this.state.addMode} add = {this.add}/> :
                <Button onClick = {this.toggleAddMode}><FontAwesomeIcon icon={faPlus}/></Button>
            }
            </div>
        </div>  
        </div>
    );
    }  
}

export default RecipeList;
