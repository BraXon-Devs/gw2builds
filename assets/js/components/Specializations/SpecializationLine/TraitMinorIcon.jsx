'use strict';

import React from 'react';
import style from './traitMinorIcon.css';

const TraitMinorIcon = props => (
    <svg className={props.classes ? props.classes : style.minorIcon}>
        <defs>
            <mask id="minorTraitMask">
                <image xlinkHref="../img/trait-minor-mask.png" width="64" height="64"/>
            </mask>
        </defs>
        <image xlinkHref={props.imageUrl} mask="url(#minorTraitMask)" width="64" height="64" transform="scale(0.65)"/>
    </svg>
);

TraitMinorIcon.propTypes = {
    classes: React.PropTypes.string,
    imageUrl: React.PropTypes.string
};

export default TraitMinorIcon;
