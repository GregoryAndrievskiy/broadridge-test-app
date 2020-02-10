import React from 'react';
import {Button, withStyles } from '@material-ui/core';

type CustomButtonType = {
    text: string,
    onClick: () => void,
    disabled?: boolean,
};

const StyledButton = withStyles({
    root: {
        maxWidth: 'fit-content',
        borderRadius: '2px',
    },

    label: {
        fontWeight: 'bold',
    },
})(Button);

const CustomButton = ({ text, onClick, disabled = false }: CustomButtonType) => {
    return (
        <StyledButton
            color="primary"
            size="medium"
            variant="contained"
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </StyledButton>
    );
};

export { CustomButton };
