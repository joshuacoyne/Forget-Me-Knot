import React, { Component, Fragment } from 'react';
import axios from 'axios';
import config from '../../config';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './FlagPicker.css';

class FlagPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }

        this.colorPicker = React.createRef();
        this.greyRadio = React.createRef();
        this.greenRadio = React.createRef();
        this.blueRadio = React.createRef();
        this.orangeRadio = React.createRef();
        this.greyOutline = React.createRef();
        this.greenOutline = React.createRef();
        this.blueOutline = React.createRef();
        this.orangeOutline = React.createRef();

        this.chosenColor = this.props.flagColor || 'grey';

    }

    displayPicker = () => {
        if (this.state.isOpen) {
            this.setState({ isOpen: false });
        } else {
            this.setState({ isOpen: true }, () => {
                if (this.chosenColor === 'grey') {
                    this.greyOutline.current.style.border = '2px solid grey';
                } else if (this.chosenColor === 'green') {
                    this.greenOutline.current.style.border = '2px solid green';
                } else if (this.chosenColor === 'blue') {
                    this.blueOutline.current.style.border = '2px solid blue';
                } else if (this.chosenColor === 'orange') {
                    this.orangeOutline.current.style.border = '2px solid orange';
                };
            });
        }
    }

    colorRadioMouseDown = (event) => {

        const greyRadio = this.greyRadio.current;
        const greenRadio = this.greenRadio.current;
        const blueRadio = this.blueRadio.current;
        const orangeRadio = this.orangeRadio.current;        
        
        let radioOutlines = this.colorPicker.current.getElementsByClassName('outer-circle');
        for (let radioOutline of radioOutlines) {
            radioOutline.style.border = '2px solid white'
        }
        
        if (event.target === greyRadio) {          
            this.greyOutline.current.style.border = '2px solid grey';
        } else if (event.target === greenRadio) {
            this.greenOutline.current.style.border = '2px solid green';
        } else if (event.target === blueRadio) {
            this.blueOutline.current.style.border = '2px solid blue';
        } else if (event.target === orangeRadio) {
            this.orangeOutline.current.style.border = '2px solid orange';
        }

    };

    colorRadioMouseUp = (event) => {

        this.mouseIsDown--;

        const greyRadio = this.greyRadio.current;
        const greenRadio = this.greenRadio.current;
        const blueRadio = this.blueRadio.current;
        const orangeRadio = this.orangeRadio.current;        
        
        const note = document.getElementById(this.props.noteId);
        
        if (event.target === greyRadio) {
            note.style.border = '3px solid grey';
            this.chosenColor = 'grey';
        } else if (event.target === greenRadio) {
            note.style.border = '3px solid green';
            this.chosenColor = 'green';
        } else if (event.target === blueRadio) {
            note.style.border = '3px solid blue';
            this.chosenColor = 'blue';
        } else if (event.target === orangeRadio) {
            note.style.border = '3px solid orange';
            this.chosenColor = 'orange';
        }

        note.getElementsByClassName('color-choice')[0].style.display = 'none';
        axios
            .put(`${config.apiUrl}/user/notes/${this.props.noteId}`, { flagColor: this.chosenColor })
            .catch(error => {
                console.log(error);
            });
    };

    colorRadioMouseOut = (event) => {
        if (this.mouseIsDown) {
            if (event.target === this.greyRadio.current)
                this.greyOutline.current.style.border = '2px solid white';
            else if (event.target === this.greenRadio.current)
                this.greenOutline.current.style.border = '2px solid white';
            else if (event.target === this.blueRadio.current)
                this.blueOutline.current.style.border = '2px solid white';
            else if (event.target === this.orangeRadio.current)
                this.orangeOutline.current.style.border = '2px solid white';
        }
    };

    componentDidMount() {
        if (this.state.isOpen) {
            if (this.props.flagColor === 'grey') {
                this.greyOutline.current.style.border = '2px solid grey';
            } else if (this.props.flagColor === 'green') {
                this.greenOutline.current.style.border = '2px solid green';
            } else if (this.props.flagColor === 'blue') {
                this.blueOutline.current.style.border = '2px solid blue';
            } else if (this.props.flagColor) {
                this.orangeOutline.current.style.border = '2px solid orange';
            };
        };
    };


    render() {
        if (this.state.isOpen)
            return (
                <Fragment>
                    <div className='flag-picker-overlay' onClick={this.displayPicker}></div>
                    <div className='color-choice' ref={this.colorPicker} >
                        <div className='outer-circle outer-circle-grey' ref={this.greyOutline} onMouseDown={this.colorRadioMouseDown}>
                            <div ref={this.greyRadio} onMouseDown={this.colorRadioMouseDown}  onClick={this.colorRadioMouseUp} onMouseOut={this.colorRadioMouseOut} className='circle'></div>
                        </div>
                        <div className='outer-circle outer-circle-green' ref={this.greenOutline}>
                            <div ref={this.greenRadio} onMouseDown={this.colorRadioMouseDown}  onClick={this.colorRadioMouseUp} onMouseOut={this.colorRadioMouseOut} className='circle circle-green'></div>
                        </div>
                        <div className='outer-circle outer-circle-blue' ref={this.blueOutline}>
                            <div ref={this.blueRadio} onMouseDown={this.colorRadioMouseDown}  onClick={this.colorRadioMouseUp} onMouseOut={this.colorRadioMouseOut} className='circle circle-blue' ></div>
                        </div>
                        <div className='outer-circle outer-circle-orange' ref={this.orangeOutline}>
                            <div ref={this.orangeRadio} onMouseDown={this.colorRadioMouseDown}  onClick={this.colorRadioMouseUp} onMouseOut={this.colorRadioMouseOut} className='circle circle-orange'></div>
                        </div>
                    </div>
                    <FontAwesomeIcon icon={faFlag} className='card-icon' onClick={this.displayPicker}/>
                </Fragment>
            )
        else 
            return (
                <FontAwesomeIcon icon={faFlag} className='card-icon' onClick={this.displayPicker}/>
            )
    }
}

export default FlagPicker;
