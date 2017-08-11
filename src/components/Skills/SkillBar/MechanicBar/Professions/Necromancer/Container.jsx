import { connect } from 'react-redux';
import { getAttributeHealth } from '~/selectors/attributes';
import Necromancer from './Component';

const mapStateToProps = (state, ownProps) => ({
    skills: state.skills,
    professionSkills: state.professionSkills,
    health: getAttributeHealth(state)
});

export default connect(mapStateToProps)(Necromancer);
