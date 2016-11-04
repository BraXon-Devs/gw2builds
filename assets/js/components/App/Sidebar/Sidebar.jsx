import React, { Component } from 'react';

import LanguageSelector from '../../../containers/languageSelector';

import style from './sidebar.css';

class Sidebar extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            currentIndex: props.currentIndex
        };
    }

    onClick(currentIndex) {
        return () => {
            this.setState({ currentIndex });
            this.props.onSectionChange(currentIndex);
        };
    }

    componentWillReceiveProps(props) {
        const { currentIndex } = props;
        if (currentIndex !== this.state.currentIndex) {
            this.setState({ currentIndex });
        }
    }

    render() {
        const markerStyle = {
            transform: `translateY(${this.state.currentIndex * 64}px)`
        };
        return (
            <div className={style.sidebar}>
                <div className={style.sections}>
                    <div className={style.marker} style={markerStyle}/>
                    {this.renderSection(0, '/img/Character.svg')}
                    {this.renderSection(1, '/img/Skills.svg')}
                    {this.renderSection(2, '/img/Traits.svg')}
                    {this.renderSection(3, '/img/Gear.svg')}
                </div>
                <LanguageSelector/>
            </div>
        );
    }

    renderSection(section, icon) {
        return (
            <button key={section} type="button" className={style.button} onClick={this.onClick(section)}>
                <img src={icon}/>
            </button>
        );
    }
}

Sidebar.propTypes = {
    currentIndex: React.PropTypes.number.isRequired,
    onSectionChange: React.PropTypes.func.isRequired
};

export default Sidebar;
