import React, { Component } from 'react';
import SkillTooltip from '~/components/Tooltips/Skills/TooltipContainer';
import SkillIcon from '../../Icon';

class WeaponBar extends Component {
    constructor(props, context) {
        super(props, context);

        this.renderSkill = this.renderSkill.bind(this);
    }

    getSkillInSlot({ mainhand, offhand, isTwoHanded, weapons, skills, attunement }) {
        return index => {
            const getFromMainhand = index < 3 || isTwoHanded;

            // handle empty weapon
            if ((getFromMainhand && !mainhand) || (!getFromMainhand && !offhand)) {
                return null;
            }

            const weapon = getFromMainhand ? mainhand : offhand;
            const slotName = `Weapon_${index + 1}`;

            // find all matching skills for the requested slot
            const skillsForSlot = weapons[weapon].skills
                // filter slot
                .filter(skill => skill.slot === slotName)
                // filter offhand (thief)
                .filter(skill => !skill.offhand || skill.offhand === offhand || (skill.offhand === 'Nothing' && !offhand))
                // filter attunement (elementalist)
                .filter(skill => !skill.attunement || skill.attunement === attunement);

            // return the skill object
            return skillsForSlot[0] && skills[skillsForSlot[0].id];
        };
    }

    render() {
        const getSkillInSlot = this.getSkillInSlot(this.props);

        const slots = [0, 1, 2, 3, 4].map(getSkillInSlot);

        return (
            <div>
                {slots.map(this.renderSkill)}
            </div>
        );
    }

    renderSkill(skill, index) {
        if (skill === null) {
            return (
                <SkillIcon.Empty key={index}/>
            );
        }

        return (
            <SkillTooltip key={index} skill={skill}>
                <SkillIcon skill={skill}/>
            </SkillTooltip>
        );
    }
}

WeaponBar.propTypes = {
    mainhand: React.PropTypes.string,
    offhand: React.PropTypes.string,
    isTwoHanded: React.PropTypes.bool,
    attunement: React.PropTypes.string,
    weapons: React.PropTypes.objectOf(React.PropTypes.shape({
        skills: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.number.isRequired,
            slot: React.PropTypes.string.isRequired,
            attunement: React.PropTypes.string,
            offhand: React.PropTypes.string
        })).isRequired,
        specialization: React.PropTypes.number
    })).isRequired,
    skills: React.PropTypes.object.isRequired
};

export default WeaponBar;
