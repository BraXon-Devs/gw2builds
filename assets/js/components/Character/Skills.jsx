import React from 'react';
import { Tooltip } from '../Tooltips';
import TraitTooltip from '../Tooltips/Traits/Tooltip';

const TestTooltip = props => (<div>Tooltip!</div>);

export default () => (<div>
    Welcome to Skills!

    <Tooltip tooltip={<TestTooltip/>}>
        Testing Tooltips
        <Tooltip tooltip={<div>Inner</div>}>
            {' '}here
        </Tooltip>
    </Tooltip>
</div>);
