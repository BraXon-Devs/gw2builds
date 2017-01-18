import { handleAction } from 'redux-actions';
import * as actions from '../../actions';
import { handleSimpleAction } from '../utils';
import forEach  from 'lodash/forEach'

/** Reducer for the available skill ids for the current profession. */
export const skillIds = handleAction(actions.FETCH_PROFESSION, (state, action) => {
    const skills = [];

    forEach(action.payload.weapons, weapon => {
        forEach(weapon.skills, skill => skills.push(skill.id));
    });

    forEach(action.payload.training, training => {
        forEach(training.track, skill => skill.type === 'Skill' && skills.push(skill.skill_id));
    });

    forEach(action.payload.attunements, attunement => skills.push(attunement.swap));

    skills.push(action.payload.healing_skill_id);

    return skills;
}, []);

export const skills = handleSimpleAction(actions.FETCH_SKILLS, {});

export default {
    skillIds,
    skills
};
