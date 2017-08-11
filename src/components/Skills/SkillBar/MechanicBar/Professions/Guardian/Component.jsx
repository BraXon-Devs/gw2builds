import React from 'react';
import groupBy from 'lodash/groupBy';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/TooltipContainer';
import style from './style.css';

const renderSkills = (professionSkills, availableSkillObjects) => {
    const slots = groupBy(professionSkills.filter(skill => skill.type === 'Profession'), 'slot');

    return ['Profession_1', 'Profession_2', 'Profession_3'].map(slot => {
        if (slots[slot]) {
            return (
                <SkillTooltip skill={availableSkillObjects[slots[slot][0].id]} key={slot}>
                    <SkillIcon skill={availableSkillObjects[slots[slot][0].id]} size={32}/>
                </SkillTooltip>
            );
        } else {
            <SkillIcon/>;
        }
    });
};

const Guardian = ({ professionSkills, availableSkillObjects }) => (
    <div className={style.component}>
        {renderSkills(professionSkills, availableSkillObjects)}
    </div>
);

export default Guardian;
