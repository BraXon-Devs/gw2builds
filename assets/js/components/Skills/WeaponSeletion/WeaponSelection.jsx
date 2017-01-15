import React from 'react';
import { Select } from './../../Inputs';
import map from 'lodash/map';

// a weapon is available if it doesn't require a specialization
// or if the specialization is active.
const isWeaponAvailable = (weapon, activeSpecializations) =>
    !weapon.specialization || activeSpecializations.some(id => id === weapon.specialization);


const renderSelect = (weapons, value, onChange, activeSpecializations) => (
    <Select value={value} onChange={onChange} placeholder="None">
        {map(weapons, (weapon, name) => (
            <option key={name} value={name} disabled={!isWeaponAvailable(weapon, activeSpecializations)}>{name}</option>
        ))}
    </Select>
);

const WeaponSelection = ({
    mainhandWeapons, onMainhandChange, activeMainhand,
    offhandWeapons, onOffhandChange, activeOffhand,
    twoHanded, activeSpecializations
}) => (
    <div>
        {renderSelect(mainhandWeapons, activeMainhand, onMainhandChange, activeSpecializations)}
        {!twoHanded && renderSelect(offhandWeapons, activeOffhand, onOffhandChange)}
    </div>
);

WeaponSelection.propTypes = {
    mainhandWeapons: React.PropTypes.object,
    offhandWeapons: React.PropTypes.object,
    onMainhandChange: React.PropTypes.func.isRequired,
    onOffhandChange: React.PropTypes.func.isRequired,
    activeMainhand: React.PropTypes.string,
    activeOffhand: React.PropTypes.string,
    twoHanded: React.PropTypes.bool.isRequired
};

export default WeaponSelection;
