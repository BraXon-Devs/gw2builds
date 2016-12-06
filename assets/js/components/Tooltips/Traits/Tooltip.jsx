import React, { Component } from 'react';
import Fact, { FactShape } from '../Facts/Fact';
import { Tooltip } from '../index';
import style from './tooltip.css';

class TraitTooltip extends Component {
    constructor(props, context) {
        super(props, context);

        this.renderTooltip = this.renderTooltip.bind(this);
    }

    isTraitActive(traitId) {
        const isActiveMajorTrait = this.props.activeMajorTraits.indexOf(traitId) !== -1;
        const isActiveMinorTrait = this.props.activeMinorTraits.indexOf(traitId) !== -1;

        return isActiveMajorTrait || isActiveMinorTrait;
    }

    render() {
        return (
            <Tooltip tooltip={this.renderTooltip}>
                {this.props.children}
            </Tooltip>
        );
    }

    renderTooltip() {
        if (!this.props.trait) {
            return null;
        }

        const { name, description, facts, traited_facts: traitedFacts } = this.props.trait;
        let activeFacts = [];

        // add all facts to the active ones
        (facts || []).forEach(fact => activeFacts.push(fact));

        // override active traits with traited facts if the required trait is active
        (traitedFacts || []).forEach(fact => {
            if (this.isTraitActive(fact.requires_trait)) {
                if (fact.overrides !== undefined) {
                    activeFacts[fact.overrides] = fact;
                } else {
                    activeFacts.push(fact);
                }
            }
        });

        return (
            <div className={style.tooltip}>
                <div className={style.title}>
                    {name}
                </div>
                <div className={style.description} dangerouslySetInnerHTML={this.renderDescription(description)}/>
                <div className={style.facts}>
                    {activeFacts.map(this.renderFact)}
                </div>
            </div>
        );
    }

    renderDescription(description) {
        // TODO: parse <c=@reminder>, ... tags
        return { __html: description };
    }

    renderFact(fact, i) {
        return (
            <Fact key={i} fact={fact}/>
        );
    }
}

TraitTooltip.propTypes = {
    children: React.PropTypes.node.isRequired,
    trait: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        facts: React.PropTypes.arrayOf(FactShape),
        traited_facts: React.PropTypes.arrayOf(FactShape)
    }),
    // bound from redux state
    activeMajorTraits: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    activeMinorTraits: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
};

export default TraitTooltip;
