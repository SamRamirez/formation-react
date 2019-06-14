import React, {Component} from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, Button } from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faPen} from '@fortawesome/free-solid-svg-icons'

class RecipeDetail extends Component{

    state = {
        recipe: this.props.recipe,
        editMode: !this.props.recipe || false
    };



    toggleEditMode = () => {
        this.setState({editMode : !this.state.editMode} );       
        // !this.state.recipe.id && this.setState({recipe: {...this.state.recipe, id: this.props.set()}}) && console.log("postSetid" + this.state.recipe.id); 
        // console.log(this.state.recipe.id)
        // this.props.addMode && this.props.maj(this.state.recipe)
        if(this.props.addMode){
            this.props.add(this.state.recipe)
        }
        this.state.recipe.id && console.log("j'ai un id" , this.state.recipe.id);

    }


    onPictureChange = event => {
        this.setState({
            recipe: {...this.state.recipe, picture: event.target.value}
        })
    }

    onNameChange = event => {
        this.setState({
            recipe: {...this.state.recipe, name: event.target.value}
        })
    }

    onDescChange = event => {
        this.setState({
            recipe: {...this.state.recipe, description: event.target.value}
        })
    }


    render(){
        let {recipe} = this.state;
        return (
        <Card>
          <CardImg top width = "100%" src = {recipe && recipe.picture} alt="pas d'image"/>
          { this.state.editMode && <input value = {recipe && recipe.picture} onChange={this.onPictureChange} />} 
          <CardBody>
              {
                  this.state.editMode ? 
                <input value={ recipe && recipe.name} onChange={this.onNameChange}/>: 
                <CardTitle>{recipe.name}</CardTitle>
              }

              {
                  this.state.editMode ? 
                    <textarea value={recipe && recipe.description} onChange={this.onDescChange}/> :
                    <CardText>{recipe.description}</CardText>
              }

            {/* <CardTitle>{this.props.recipe.name}</CardTitle>
            <CardText>{this.props.recipe.description}</CardText> */}
            {
                this.props.recipe &&
                // <Button onClick={recipe && this.props.delete(this.props.recipe.id)}><FontAwesomeIcon icon={faTrash}/></Button>
                <Button onClick={recipe && this.props.delete(this.props.recipe)}><FontAwesomeIcon icon={faTrash}/></Button>
            }
            {/*c'est chiant car il faudrait un formulaire*/}
            {/* <Button onClick={this.props.modify(this.props.recipe.id, newTxt)}><FontAwesomeIcon icon={faTrash}/></Button> */}
            <Button onClick={this.toggleEditMode}><FontAwesomeIcon icon={faPen}/></Button>
          </CardBody>  
        </Card>);
    }    
}

export default RecipeDetail;