import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import style from './Overlay.css';

const overlayRoot = document.getElementById('overlay');

class Overlay extends Component {
    constructor(props) {
        super(props);

        // create overlay element
        this.element = document.createElement('div');
        this.element.className = style.overlay;
    }

    componentDidMount() {
        overlayRoot.appendChild(this.element);
    }

    componentWillUnmount() {
        overlayRoot.removeChild(this.element);
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.element);
    }
}

Overlay.propTypes = {
    children: PropTypes.node.isRequired
};

export default Overlay;
